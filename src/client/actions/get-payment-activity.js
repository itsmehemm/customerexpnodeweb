import {
    commonResponseHandler,
    commonErrorHandler
} from '../lib/handlers/common';
import { getAPIHeaders } from '../lib/request/get-headers';
import config from '../configs/config.json';

const environment = config.environment;

export const getPaymentActivity = (id) => {
    console.log('[INFO]', 'action::getPaymentActivity');
    console.log('[INFO]', 'request', `transaction_id=${id}`);
    return fetch(config[environment].api.v1_get_payment_activity.uri + id, {
        method: 'GET',
        headers: getAPIHeaders(),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => commonResponseHandler(response))
        .catch(error => commonErrorHandler(error));
};

export default getPaymentActivity;