import config from '../configs/config.json';
const environment = config.environment;

export const getPaymentPlan = (id) => {
    console.log('[INFO]', 'action::getPaymentPlan');
    console.log('[INFO]', 'request', `order_id=${id}`);
    var myHeaders = new Headers();
    myHeaders.append("X-TINNAT-SECURITY-CONTEXT", "{\"userId\": \"admin\", \"key\": \"tinnat\"}");
    let uri = config[environment].api.v1_get_payment_plan.uri;
    uri = uri.replace("${orderid}", id);
    return fetch(uri, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => response)
        .catch(error => error);
};

export default getPaymentPlan;