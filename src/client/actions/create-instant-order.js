import {
    commonResponseHandler,
    commonErrorHandler
} from '../lib/handlers/common';
import getAPIHeaders from '../lib/request/get-api-headers';
import config from '../configs/config.json';

const environment = config.environment;

const createInstantOrder = async (order) => {
    console.log('[INFO]', 'action::createInstantOrder');
    console.log('[INFO]', 'request', JSON.stringify(order, undefined, 4));
    return fetch(config[environment].api.v1_create_instant_order.uri, {
        method: 'POST',
        headers: getAPIHeaders(),
        body: JSON.stringify(order),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => commonResponseHandler(response))
        .catch(error => commonErrorHandler(error));
};

export default createInstantOrder;

