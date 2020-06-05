import config from '../configs/config.json';

const environment = config.environment;

const addProduct = async (product) => {
    console.log('[INFO]', 'action::addProduct');
    console.log('[INFO]', 'request', JSON.stringify(product, undefined, 4));

    var myHeaders = new Headers();
    myHeaders.append("X-TINNAT-SECURITY-CONTEXT", "{\"userId\": \"admin\", \"key\": \"tinnat\"}");
    myHeaders.append("Content-Type", "application/json");

    return fetch(config[environment].api.v1_post_add_product.uri, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(product),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => response)
        .catch(error => error)
};

export default addProduct;

