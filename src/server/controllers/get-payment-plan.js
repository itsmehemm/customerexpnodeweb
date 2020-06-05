const args = require('yargs').argv;
const config = require('../lib/config.json');
const createClientToken = require('../paypal/api/create-client-token');
const createAccessToken = require('../paypal/api/create-access-token');
const createOrder = require('../paypal/api/create-order');
const OrderModal = require('../modals/OrderModal');
const { ENVIRONMENT_PRODUCTION } = require('../lib/constants')
const errorConstants = require('../lib/constants/error-constants');
const { GET_PAYMENT_PLAN_CONTROLLER } = require('../lib/constants/logging-constants');

const environment = args.env || ENVIRONMENT_PRODUCTION;

const getPaymentPlan = async (req, res) => {
    console.log(GET_PAYMENT_PLAN_CONTROLLER, `processing request to get payment plan for order id: ${req.params.id}.`);
    const orderModal = new OrderModal();
    orderModal.get(req.params.id);
    if (!orderModal.getOrderId()) {
        return res.status(404).send({
            error: errorConstants.ORDER_NOT_FOUND
        });
    }
    const accessTokenResponse = await createAccessToken();
    if (!accessTokenResponse || !accessTokenResponse.access_token) {
        return res.status(400).send({
            error: errorConstants.ERROR_CREATING_PAYMENT_PLAN
        });
    }
    console.log(GET_PAYMENT_PLAN_CONTROLLER, `PayPal Access Token: ${JSON.stringify(accessTokenResponse.access_token)} `);
    const clientTokenResponse = await createClientToken({
        accessToken: accessTokenResponse.access_token
    });
    if (!clientTokenResponse || !clientTokenResponse.client_token) {
        return res.status(400).send({
            error: errorConstants.ERROR_CREATING_PAYMENT_PLAN
        });
    }
    console.log(GET_PAYMENT_PLAN_CONTROLLER, `PayPal Client Token: ${JSON.stringify(clientTokenResponse.client_token)}`);
    const paypalOrderId = await createOrder(orderModal.buildPayPalRequest());
    if (!paypalOrderId) {
        return res.status(400).send({
            error: errorConstants.ERROR_CREATING_PAYMENT_PLAN
        });
    }
    console.log(GET_PAYMENT_PLAN_CONTROLLER, `PayPal Order ID: ${paypalOrderId}`);
    const { client_id, sdk } = config.paypal[environment];
    return res.status(200).send({
        payment_plan: {
            paypal: {
                sdk: {
                    url: sdk.url
                },
                client_id: client_id,
                client_token: clientTokenResponse.client_token,
                order_id: paypalOrderId
            },
            tinnat: {
                order_id: req.params.id,
                order_details: orderModal.getOrder()
            }
        }
    });
}

module.exports = getPaymentPlan;