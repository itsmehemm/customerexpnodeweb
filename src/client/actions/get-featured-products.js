import request from 'request';
import config from '../configs/config.json';

const environment = config.environment;

const getFeaturedProducts = async () => {
    console.log('[INFO]', 'action::getFeaturedProducts');
    
    var myHeaders = new Headers();
    myHeaders.append("X-TINNAT-SECURITY-CONTEXT", "{\"userId\": \"admin\", \"key\": \"tinnat\"}");

    return fetch(config[environment].api.v1_get_featured_products.uri, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => (response && response.featured) || [])
        .catch(error => error);
};

export default getFeaturedProducts;