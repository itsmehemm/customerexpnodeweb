import {
    commonResponseHandler,
    commonErrorHandler
} from '../lib/handlers/common';
import getAPIHeaders from '../lib/request/get-api-headers';
import config from '../configs/config.json';

const environment = config.environment;

const getFilteredProducts = async (filters) => {
    console.log('[INFO]', 'action::getFilteredProducts');
    console.log('[INFO]', 'request', JSON.stringify(filters, undefined, 4));
    let uri = config[environment].api.v1_post_filtered_products.uri;
    return fetch(uri, {
        method: 'POST',
        headers: getAPIHeaders(),
        body: JSON.stringify(filters),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => commonResponseHandler(response))
        .catch(error => commonErrorHandler(error));
};

export default getFilteredProducts;

