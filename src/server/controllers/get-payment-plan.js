const args = require('yargs').argv;
const PayPalApi = require('../paypal/api');
const RazorPayApi = require('../razorpay/api');
const InstantPurchaseModal = require('../modals/InstantPurchaseModal');
const PaymentPlanModel = require('../modals/PaymentPlanModal');
const {
    ENVIRONMENT_PRODUCTION,
    COMPLETED
} = require('../lib/constants')
const errorConstants = require('../lib/constants/error-constants');
const { GET_PAYMENT_PLAN_CONTROLLER } = require('../lib/constants/logging-constants');
const config = require('../lib/config.json');
const environment = args.env || ENVIRONMENT_PRODUCTION;

const getPaymentPlan = async (req, res) => {
    console.log(GET_PAYMENT_PLAN_CONTROLLER, `processing request to get payment plan for order id: ${req.params.id}.`);
    const instantPurchaseModal = new InstantPurchaseModal();
    instantPurchaseModal.load(req.params.id);
    if (!instantPurchaseModal.getOrderId()) {
        return res.status(404).send({
            error: errorConstants.ORDER_NOT_FOUND
        });
    }
    if (instantPurchaseModal.getPaymentInformation() &&
        instantPurchaseModal.getPersonalInformation().status === COMPLETED) {
        return res.status(400).send({
            error: errorConstants.ORDER_ALREADY_PURCHASED
        });
    }
    if (!instantPurchaseModal.validate()) {
        return res.status(400).send({
            error: errorConstants.INSUFFICIENT_DETAILS_TO_GET_PAYMENT_PLAN
        });
    }
    const paymentPlanModel = new PaymentPlanModel();
    paymentPlanModel.setOrderId(req.params.id);
    paymentPlanModel.setOrderDetails(instantPurchaseModal.getOrder());
    const accessTokenResponse = await PayPalApi.createAccessToken();
    if (accessTokenResponse && accessTokenResponse.access_token) {
        console.log(GET_PAYMENT_PLAN_CONTROLLER, `PayPal Access Token: ${JSON.stringify(accessTokenResponse.access_token)} `);
        const clientTokenResponse = await PayPalApi.createClientToken({
            accessToken: accessTokenResponse.access_token
        });
        console.log(GET_PAYMENT_PLAN_CONTROLLER, `PayPal Client Token: ${JSON.stringify(clientTokenResponse.client_token)}`);
        paymentPlanModel.setClientToken(clientTokenResponse.client_token);
        const paypalOrderId = await PayPalApi.createOrder(instantPurchaseModal.buildPayPalRequest());
        if (paypalOrderId) {
            console.log(GET_PAYMENT_PLAN_CONTROLLER, `PayPal Order ID: ${paypalOrderId}`);
            paymentPlanModel.setPayPalOrderId(paypalOrderId);
            const {
                client_id,
                sdk
            } = config.paypal[environment];
            paymentPlanModel.setClientId(client_id);
            paymentPlanModel.setSdkUrl(sdk && sdk.url);
        }
    }
    const razorpayOrder = await RazorPayApi.createOrder(instantPurchaseModal.buildRazorPayRequest());
    if (razorpayOrder && razorpayOrder.id) {
        paymentPlanModel.setRazorPayOrderId(razorpayOrder.id);
        paymentPlanModel.setRazorPayOrderDetails(razorpayOrder);
        const {
            api_key,
        } = config.razorpay[environment];
        paymentPlanModel.setRazorPayApiKey(api_key);
    }
    if (!paymentPlanModel.getPayPalOrderId() && !paymentPlanModel.getRazorPayOrderId()) {
        return res.status(400).send({
            error: errorConstants.ERROR_CREATING_PAYMENT_PLAN
        });
    }
    return res.status(200).send({
        payment_plan: paymentPlanModel.getData()
    });
};

module.exports = getPaymentPlan;