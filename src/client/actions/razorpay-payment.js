import config from '../configs/config.json';

const environment = config.environment;

const razorpayPayment = async (payment) => {
    console.log('[INFO]', 'action::razorpayPayment');
    console.log('[INFO]', 'request', JSON.stringify(payment, undefined, 4));
    var myHeaders = new Headers();
    myHeaders.append("X-TINNAT-SECURITY-CONTEXT", "{\"userId\": \"admin\", \"key\": \"tinnat\"}");
    myHeaders.append("Content-Type", "application/json");
    let uri = config[environment].api.v1_post_razorpay_payment.uri;
    uri = uri.replace("${orderid}", payment.id);
    return fetch(uri, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(payment),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => response)
        .catch(error => error)
};

export default razorpayPayment;

