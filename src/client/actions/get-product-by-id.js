import {
    commonResponseHandler,
    commonErrorHandler
} from '../lib/handlers/common';
import { getAPIHeaders } from '../lib/request/get-headers';
import config from '../configs/config.json';
import addProductToRecentView from './add-product-to-recent-view';

const environment = config.environment;

export const getProductById = (id) => {
    console.log('[INFO]', 'action::getProductById');
    console.log('[INFO]', 'request', `product_id=${id}`);
    addProductToRecentView(id);
    return fetch(config[environment].api.v1_get_product_by_id.uri + id, {
        method: 'GET',
        headers: getAPIHeaders(),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => commonResponseHandler(response))
        .catch(error => commonErrorHandler(error));
};

export default getProductById;