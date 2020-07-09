import {
    commonResponseHandler,
    commonErrorHandler
} from '../lib/handlers/common';
import getAPIHeaders from '../lib/request/get-api-headers';
import config from '../configs/config.json';

const environment = config.environment;

const updateProductById = async (product) => {
    console.log('[INFO]', 'action::updateProduct');
    console.log('[INFO]', 'request', JSON.stringify(product, undefined, 4));
    let uri = config[environment].api.v1_post_update_product.uri;
    uri = uri.replace("${productid}", product.id);
    return fetch(uri, {
        method: 'POST',
        headers: getAPIHeaders(),
        body: JSON.stringify(product),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => commonResponseHandler(response))
        .catch(error => commonErrorHandler(error));
};

export default updateProductById;

