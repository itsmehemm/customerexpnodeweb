const request = require('async-request');
const config = require('../lib/config.json');
const deliveryData = require('./delivery-data.json');
const errorConstants = require('../lib/constants/error-constants');

const load = async (pincode) => {
    if (!pincode) {
        console.log('POSTALPINCODE API', 'no pincode received');
        return null;
    }
    let response = await request(`${config.postalpincode.api.url}/${pincode}`);
    console.log('POSTALPINCODE API', `raw response`, JSON.stringify(response));
    response = JSON.parse(response && response.body || '{}');
    response = Array.isArray(response) ? response[0] : null;
    if (response && response['Status'] === 'Success') {
        const postoffices = response['PostOffice'];
        if (Array.isArray(postoffices) && postoffices.length > 0) {
            console.log('POSTALPINCODE API', `${postoffices.length} post offices found for pincode`);
            const postoffice = postoffices[0];
            return {
                get: () => postoffice,
                getState: () => postoffice['State'],
                getDistrict: () => postoffice['District'],
                getRegion: () => postoffice['Region'],
                getPlace: () => postoffice['Name'],
                getPincode: () => pincode
            };
        } else {
            console.log('POSTALPINCODE API', 'no post offices found for pincode');
            return {
                error: {
                    ...errorConstants.NOT_DELIVERABLE
                }
            };
        }
    }
    console.log('POSTALPINCODE API', 'either an invalid pincode received or an error occurred while fetching the postalpincode api');
    return {
        error: {
            ...errorConstants.INVALID_PINCODE
        }
    };
};

const getDeliveryStatus = async (address) => {
    if (!address || (address && address.error)) {
        return {
            status: 'NOT_DELIVERABLE',
        };
    }
    let rule1 = 0, rule2 = 0, rule3 = 0;
    let deliveryTime = 0;
    let addressitems = ['India', address.getState(), address.getDistrict(), address.getRegion(), address.getPlace()];
    addressitems.forEach(item => {
        item = item.toLowerCase();
        const data = deliveryData[item];
        if (data) {
            if (data.status === true) {
                console.log('POSTALPINCODE API', 'getDeliveryStatus', `deliverable to ${item} in ${data.delivery_time} seconds`);
                rule1 += 1;
                deliveryTime = Math.max(deliveryTime, data.delivery_time);
            } else if (data.status === false) {
                console.log('POSTALPINCODE API', 'getDeliveryStatus', `not deliverable to ${item}`);
                rule2 += 1;
            } else {
                console.log('POSTALPINCODE API', 'getDeliveryStatus', `data not found for ${item}`);
                rule3 += 1;
            }
        } else {
            console.log('POSTALPINCODE API', 'getDeliveryStatus', `data not found for ${item}`);
            rule3 += 1;
        }
    });
    console.log('POSTALPINCODE API', 'getDeliveryStatus', `rules: rule1=${rule1}; rule2=${rule2}; rule3=${rule3}`);
    // if the place is deliverable, the rule is: zero in rule 2 and >= 1 in rule 1
    // if rule1 = 0, rule 2 = 0 and rule 3 = 5, then the place is not discoverable. choose deliver by default.
    if (rule1 >= 1 && rule2 === 0) {
        return {
            status: 'DELIVERABLE',
            deliveryTime
        };
    }
    if (rule3 === 5) {
        return {
            status: 'DELIVERABLE',
            deliveryTime: 2678400 // max time in seconds = 31 days 
        };
    }
    return {
        status: 'NOT_DELIVERABLE'
    };
};

module.exports = {
    load,
    getDeliveryStatus
};