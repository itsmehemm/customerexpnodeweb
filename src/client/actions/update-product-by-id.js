import config from '../configs/config.json';

const environment = config.environment;

const updateProductById = async (product) => {
    console.log('[INFO]', 'action::updateProduct');
    console.log('[INFO]', 'request', JSON.stringify(product, undefined, 4));

    var myHeaders = new Headers();
    myHeaders.append("X-TINNAT-SECURITY-CONTEXT", "{\"userId\": \"admin\", \"key\": \"tinnat\"}");
    myHeaders.append("Content-Type", "application/json");

    let uri = config[environment].api.v1_post_update_product.uri;
    uri = uri.replace("${productid}", product.id);
    return fetch(uri, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(product),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => response)
        .catch(error => error)
};

export default updateProductById;

