import config from '../configs/config.json';
import addProductToRecentView from './add-product-to-recent-view';

const environment = config.environment;

export const getProductById = (id) => {
    console.log('[INFO]', 'action::getProductById');
    console.log('[INFO]', 'request', `product_id=${id}`);
    addProductToRecentView(id);
    var myHeaders = new Headers();
    myHeaders.append("X-TINNAT-SECURITY-CONTEXT", "{\"userId\": \"admin\", \"key\": \"tinnat\"}");
    return fetch(config[environment].api.v1_get_product_by_id.uri + id, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => response)
        .catch(error => error);
};

export default getProductById;