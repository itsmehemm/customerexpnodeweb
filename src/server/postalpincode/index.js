const request = require('async-request');
const config = require('../lib/config.json');
const errorConstants = require('../lib/constants/error-constants');

const load = async (pincode) => {
    if (!pincode) {
        console.log('[POSTALPINCODE API]', 'no pincode received');
        return null;
    }
    let response = await request(`${config.postalpincode.api.url}/${pincode}`);
    console.log('[POSTALPINCODE API]', `raw response=${JSON.stringify(response)}`);
    response = JSON.parse(response && response.body || '{}');
    response = Array.isArray(response) ? response[0] : null;
    if (response && response['Status'] === 'Success') {
        const postoffices = response['PostOffice'];
        if (Array.isArray(postoffices) && postoffices.length > 0) {
            console.log('[POSTALPINCODE API]', `${postoffices.length} post offices found for pincode`);
            const postoffice = postoffices[0];
            return {
                get: () => postoffice,
                getState: () => postoffice['State'],
                getDistrict: () => postoffice['District'],
                getRegion: () => postoffice['Region'],
                getPlace: () => postoffice['Name']
            };
        } else {
            console.log('[POSTALPINCODE API]', 'no post offices found for pincode');
            return {
                error: {
                    ...errorConstants.NOT_DELIVERABLE
                }
            };
        }
    }
    console.log('[POSTALPINCODE API]', 'either an invalid pincode received or an error occurred while fetching the postalpincode api');
    return {
        error: {
            ...errorConstants.INVALID_PINCODE
        }
    };
};

module.exports = { load };