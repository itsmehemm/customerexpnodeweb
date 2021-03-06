import {
    commonResponseHandler,
    commonErrorHandler
} from '../lib/handlers/common';
import { getAPIHeaders } from '../lib/request/get-headers';
import config from '../configs/config.json';

const environment = config.environment;

export const getPurchaseById = (id) => {
    console.log('[INFO]', 'action::getPurchaseById');
    console.log('[INFO]', 'request', `order_id=${id}`);
    let uri = config[environment].api.v1_get_purchase_by_id.uri;
    uri = uri.replace("${orderid}", id);
    return fetch(uri, {
        method: 'GET',
        headers: getAPIHeaders(),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => commonResponseHandler(response))
        .catch(error => commonErrorHandler(error));
};

export default getPurchaseById;