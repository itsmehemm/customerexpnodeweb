import config from '../configs/config.json';

const environment = config.environment;

const createInstantOrder = async (order) => {
    console.log('[INFO]', 'action::createInstantOrder');
    console.log('[INFO]', 'request', JSON.stringify(order, undefined, 4));
    var myHeaders = new Headers();
    myHeaders.append("X-TINNAT-SECURITY-CONTEXT", "{\"userId\": \"admin\", \"key\": \"tinnat\"}");
    myHeaders.append("Content-Type", "application/json");
    return fetch(config[environment].api.v1_create_instant_order.uri, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(order),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => response)
        .catch(error => error)
};

export default createInstantOrder;

