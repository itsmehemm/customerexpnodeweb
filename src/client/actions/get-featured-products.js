import {
    commonResponseHandler,
    commonErrorHandler
} from '../lib/handlers/common';
import getAPIHeaders from '../lib/request/get-api-headers';
import config from '../configs/config.json';

const environment = config.environment;

const getFeaturedProducts = async () => {
    console.log('[INFO]', 'action::getFeaturedProducts');
    return fetch(config[environment].api.v1_get_featured_products.uri, {
        method: 'GET',
        headers: getAPIHeaders(),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => {
            response = commonResponseHandler(response);
            return response && response.featured || [];
        })
        .catch(error => commonErrorHandler(error));
};

export default getFeaturedProducts;