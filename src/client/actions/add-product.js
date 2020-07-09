import {
    commonResponseHandler,
    commonErrorHandler
} from '../lib/handlers/common';
import getAPIHeaders from '../lib/request/get-api-headers';
import config from '../configs/config.json';

const environment = config.environment;

const addProduct = async (product) => {
    console.log('[INFO]', 'action::addProduct');
    console.log('[INFO]', 'request', JSON.stringify(product, undefined, 4));
    return fetch(config[environment].api.v1_post_add_product.uri, {
        method: 'POST',
        headers: getAPIHeaders(),
        body: JSON.stringify(product),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => commonResponseHandler(response))
        .catch(error => commonErrorHandler(error));
};

export default addProduct;

