import config from '../configs/config.json';

const environment = config.environment;

export const getPaymentActivityInternal = (id) => {
    console.log('[INFO]', 'action::getPaymentActivityInternal');
    console.log('[INFO]', 'request', `transaction_id=${id}`);
    var myHeaders = new Headers();
    myHeaders.append("X-TINNAT-SECURITY-CONTEXT", "{\"userId\": \"admin\", \"key\": \"tinnat\"}");
    return fetch(config[environment].api.v1_get_payment_activity_internal.uri + id, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => response)
        .catch(error => error);
};

export default getPaymentActivityInternal;