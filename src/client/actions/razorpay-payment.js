import {
    commonResponseHandler,
    commonErrorHandler
} from '../lib/handlers/common';
import getAPIHeaders from '../lib/request/get-api-headers';
import config from '../configs/config.json';

const environment = config.environment;

const razorpayPayment = async (payment) => {
    console.log('[INFO]', 'action::razorpayPayment');
    console.log('[INFO]', 'request', JSON.stringify(payment, undefined, 4));
    let uri = config[environment].api.v1_post_razorpay_payment.uri;
    uri = uri.replace("${orderid}", payment.id);
    return fetch(uri, {
        method: 'POST',
        headers: getAPIHeaders(),
        body: JSON.stringify(payment),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => commonResponseHandler(response))
        .catch(error => commonErrorHandler(error));
};

export default razorpayPayment;

