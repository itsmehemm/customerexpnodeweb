import {
    commonResponseHandler,
    commonErrorHandler
} from '../lib/handlers/common';
import { getAPIHeaders } from '../lib/request/get-headers';
import config from '../configs/config.json';

const environment = config.environment;

export const getOrderDetails = (id) => {
    console.log('[INFO]', 'action::getOrderDetails');
    console.log('[INFO]', 'request', `order_id=${id}`);
    let uri = config[environment].api.v1_get_order_details.uri;
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

export default getOrderDetails;