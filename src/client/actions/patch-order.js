import {
    commonResponseHandler,
    commonErrorHandler
} from '../lib/handlers/common';
import { getAPIHeaders } from '../lib/request/get-headers';
import config from '../configs/config.json';

const environment = config.environment;

export const patchOrder = (order) => {
    console.log('[INFO]', 'action::patchOrder');
    console.log('[INFO]', 'request', `order=${JSON.stringify(order, undefined, 2)}`);
    let uri = config[environment].api.v1_patch_order_details.uri;
    uri = uri.replace("${orderid}", order.id);
    return fetch(uri, {
        method: 'PATCH',
        headers: getAPIHeaders(),
        body: JSON.stringify(order),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => commonResponseHandler(response))
        .catch(error => commonErrorHandler(error));
};

export default patchOrder;