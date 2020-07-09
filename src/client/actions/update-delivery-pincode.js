import {
    commonResponseHandler,
    commonErrorHandler
} from '../lib/handlers/common';
import getAPIHeaders from '../lib/request/get-api-headers';
import config from '../configs/config.json';

const environment = config.environment;

const updateDeliveryPincode = async (pincode) => {
    console.log('[INFO]', 'action::updateDeliveryPincode');
    console.log('[INFO]', 'pincode', pincode);
    let uri = config[environment].api.v1_post_update_pincode.uri;
    return fetch(uri, {
        method: 'POST',
        headers: getAPIHeaders(),
        body: JSON.stringify({ pincode: pincode }),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => commonResponseHandler(response))
        .catch(error => commonErrorHandler(error));
};

export default updateDeliveryPincode;

