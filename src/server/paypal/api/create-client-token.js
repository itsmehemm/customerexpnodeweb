
const axios = require('axios');
const args = require('yargs').argv;
const { ENVIRONMENT_PRODUCTION } = require('../../lib/constants')
const environment = args.env || ENVIRONMENT_PRODUCTION;
const config = require('../../lib/config.json');

const createClientToken = async (options) => {
    const { client_token } = config.paypal[environment];
    const response = await axios({
        method: "POST",
        url: client_token.url,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${options.accessToken}`,
        },
        data: {
            customer_id: 'tinnat_paypal_0'
        }
    });
    return response && response.data;
};

module.exports = createClientToken;