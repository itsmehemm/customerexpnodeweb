
const request = require('request');
const createAccessToken = require('./create-access-token');
const args = require('yargs').argv;
const { ENVIRONMENT_PRODUCTION } = require('../../lib/constants')
const environment = args.env || ENVIRONMENT_PRODUCTION;
const config = require('../../lib/config.json');

const createOrder = async (order) => {
    console.info('PAYPAL_API_CREATE_ORDER', `request: ${JSON.stringify(order)}`);
    const { create_order } = config.paypal[environment];
    try {
        const response = await createAccessToken();
        if (!response || !response.access_token) {
            console.error('PAYPAL_API_ERROR', 'Access token retrieval failed.');
            return null;
        }
        const orderResponse = await new Promise((resolve) => {
            request.post({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + response.access_token,
                },
                url: create_order.url,
                body: order,
                json: true
            }, (error, response, body) => {
                if (error) {
                    console.error('PAYPAL_API_ERROR', JSON.stringify(error));
                }
                console.info('PAYPAL_API_RESPONSE', JSON.stringify(body));
                resolve(body);
            });
        });
        if (orderResponse && orderResponse.id) {
            return orderResponse.id;
        }
        console.error('PAYPAL_API_ERROR', 'Order creation failed.');
        return null;
    } catch (error) {
        console.error('PAYPAL_API_ERROR', JSON.stringify(error));
        return null;
    }
};

module.exports = createOrder;