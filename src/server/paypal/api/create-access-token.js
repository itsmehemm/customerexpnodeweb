
const request = require('async-request');
const args = require('yargs').argv;
const { ENVIRONMENT_PRODUCTION } = require('../../lib/constants')
const environment = args.env || ENVIRONMENT_PRODUCTION;
const config = require('../../lib/config.json');

const createAccessToken = async () => {
    const { client_id, secret, access_token } = config.paypal[environment];
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
            'Authorization': 'Basic ' + new Buffer(client_id + ':' + secret).toString('base64')
        },
        data: {
            "grant_type": "client_credentials",
            "response_type": "token"
        }
    }
    return JSON.parse((await request(access_token.url, options)).body || '{}');
};

module.exports = createAccessToken;