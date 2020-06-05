import config from '../configs/config.json';

const environment = config.environment;

export const patchOrder = (order) => {
    console.log('[INFO]', 'action::patchOrder');
    console.log('[INFO]', 'request', `order=${JSON.stringify(order, undefined, 2)}`);
    var myHeaders = new Headers();
    myHeaders.append("X-TINNAT-SECURITY-CONTEXT", "{\"userId\": \"admin\", \"key\": \"tinnat\"}");
    myHeaders.append("Content-Type", "application/json");
    let uri = config[environment].api.v1_patch_order_details.uri;
    uri = uri.replace("${orderid}", order.id);
    return fetch(uri, {
        method: 'PATCH',
        headers: myHeaders,
        body: JSON.stringify(order),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => response)
        .catch(error => error);
};

export default patchOrder;