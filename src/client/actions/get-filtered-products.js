import config from '../configs/config.json';

const environment = config.environment;

const getFilteredProducts = async (filters) => {
    console.log('[INFO]', 'action::getFilteredProducts');
    console.log('[INFO]', 'request', JSON.stringify(filters, undefined, 4));
    var myHeaders = new Headers();
    myHeaders.append("X-TINNAT-SECURITY-CONTEXT", "{\"userId\": \"admin\", \"key\": \"tinnat\"}");
    myHeaders.append("Content-Type", "application/json");
    let uri = config[environment].api.v1_post_filtered_products.uri;
    return fetch(uri, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(filters),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => response)
        .catch(error => error)
};

export default getFilteredProducts;

