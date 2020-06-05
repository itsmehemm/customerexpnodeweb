
const request = require('request');
const createAccessToken = require('./create-access-token');
const args = require('yargs').argv;
const { ENVIRONMENT_PRODUCTION } = require('../../lib/constants')
const environment = args.env || ENVIRONMENT_PRODUCTION;
const config = require('../../lib/config.json');

const createOrder = async () => {
    let order = {
        "intent": "CAPTURE",
        "payer": {
            "name": {
                "given_name": "Default",
                "surname": "Default"
            },
            "address": {
                "address_line_1": "123 Townsend St",
                "address_line_2": "Floor 6",
                "admin_area_2": "San Francisco",
                "admin_area_1": "CA",
                "postal_code": "94107",
                "country_code": "US"
            }
        },
        "purchase_units": [{
            "reference_id": "#0000",
            "description": "Item bought at Hemm Store",
            "custom_id": "#1111",
            "soft_descriptor": "",
            "amount": {
                "currency_code": "GBP",
                "value": "81.04",
                "breakdown": {
                    "item_total": {
                        "currency_code": "GBP",
                        "value": "71.04"
                    },
                    "tax_total": {
                        "currency_code": "GBP",
                        "value": "10.00"
                    }
                }
            },
            "shipping": {
                "address": {
                    "address_line_1": "2211 N First Street",
                    "address_line_2": "Building 17",
                    "admin_area_2": "San Jose",
                    "admin_area_1": "CA",
                    "postal_code": "95131",
                    "country_code": "US"
                }
            }
        }]
    };
    console.log('PAYPAL_API_CREATE_ORDER', `request: ${JSON.stringify(order)}`);
    const { create_order } = config.paypal[environment];
    try {
        const response = await createAccessToken();
        if (!response || !response.access_token) {
            console.log('PAYPAL_API_ERROR', 'Access token retrieval failed.');
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
                    console.log('PAYPAL_API_ERROR', JSON.stringify(error));
                }
                console.log('PAYPAL_API_RESPONSE', JSON.stringify(body));
                resolve(body);
            });
        });
        if (orderResponse && orderResponse.id) {
            return orderResponse.id;
        }
        console.log('PAYPAL_API_ERROR', 'Order creation failed.');
        return null;
    } catch (error) {
        console.log('PAYPAL_API_ERROR', JSON.stringify(error));
        return null;
    }
};

module.exports = createOrder;