
const request = require('request');
const args = require('yargs').argv;
const { ENVIRONMENT_PRODUCTION } = require('../../lib/constants')
const environment = args.env || ENVIRONMENT_PRODUCTION;
const config = require('../../lib/config.json');

const createOrder = async (order) => {
    console.log('RAZOR_PAY_API', `creating order with request: ${JSON.stringify(order)}`);
    const { create_order, basic_auth_token } = config.razorpay[environment];
    const orderResponse = await new Promise((resolve) => {
        request.post({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + basic_auth_token,
            },
            url: create_order.url,
            body: order,
            json: true
        }, (error, response, body) => {
            if (error) {
                console.log('RAZOR_PAY_API_ERROR', JSON.stringify(error));
            }
            console.log('RAZOR_PAY_API_RESPONSE', JSON.stringify(body));
            resolve(body);
        });
    });
    if (orderResponse && orderResponse.id) {
        return orderResponse;
    }
    return null;
};

module.exports = createOrder;