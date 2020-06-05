const { GET_PAYMENT_PLAN_CONTROLLER } = require('../lib/constants/logging-constants');
const OrderModal = require('../modals/OrderModal');
const createClientToken = require('../paypal/api/create-client-token');
const createAccessToken = require('../paypal/api/create-access-token');
const createOrder = require('../paypal/api/create-order');
const args = require('yargs').argv;
const { ENVIRONMENT_PRODUCTION } = require('../lib/constants')
const config = require('../lib/config.json');
const environment = args.env || ENVIRONMENT_PRODUCTION;

const getPaymentPlan = async (req, res) => {
    console.log(GET_PAYMENT_PLAN_CONTROLLER, `Processing request to get payment plan for order id: ${req.params.id}.`);
    const orderModal = new OrderModal();
    const orderDetails = orderModal.getOrderDetails(req.params.id);
    if (orderDetails && orderDetails.id) {
        const accessTokenResponse = await createAccessToken();
        if (!accessTokenResponse || !accessTokenResponse.access_token) {
            return res.status(400).send({
                error: {
                    message: 'ERROR_CREATING_PLAN',
                    description: 'There was an error creating payment plan for this order.'
                }
            });
        }
        console.log(GET_PAYMENT_PLAN_CONTROLLER, `PayPal Access Token: ${JSON.stringify(accessTokenResponse.access_token)} `);
        const clientTokenResponse = await createClientToken({
            accessToken: accessTokenResponse.access_token
        });
        if (!clientTokenResponse || !clientTokenResponse.client_token) {
            return res.status(400).send({
                error: {
                    message: 'ERROR_CREATING_PLAN',
                    description: 'There was an error creating payment plan for this order.'
                }
            });
        }
        console.log(GET_PAYMENT_PLAN_CONTROLLER, `PayPal Client Token: ${JSON.stringify(clientTokenResponse.client_token)}`);
        const paypalOrder = await createOrder(orderModal.buildPayPalRequest());
        if (!paypalOrder) {
            return res.status(400).send({
                error: {
                    message: 'ERROR_CREATING_PLAN',
                    description: 'There was an error creating payment plan for this order.'
                }
            });
        }
        console.log(GET_PAYMENT_PLAN_CONTROLLER, `PayPal Order ID: ${paypalOrder}`);
        const { client_id, sdk } = config.paypal[environment];
        return res.status(200).send({
            payment_plan: {
                paypal: {
                    sdk: {
                        url: sdk.url
                    },
                    client_id: client_id,
                    client_token: clientTokenResponse.client_token,
                    order_id: paypalOrder
                },
                tinnat: {
                    order_id: req.params.id,
                    order_details: orderModal.getOrderDetails(req.params.id)
                }
            }
        });
    } else {
        return res.status(400).send({
            error: {
                message: 'ORDER_NOT_FOUND',
                description: 'There are no orders with the given id.'
            }
        });
    }
};

module.exports = getPaymentPlan;