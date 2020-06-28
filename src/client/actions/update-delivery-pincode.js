import config from '../configs/config.json';

const environment = config.environment;

const updateDeliveryPincode = async (pincode) => {
    console.log('[INFO]', 'action::updateDeliveryPincode');
    console.log('[INFO]', 'pincode', pincode);
    var myHeaders = new Headers();
    myHeaders.append("X-TINNAT-SECURITY-CONTEXT", "{\"userId\": \"admin\", \"key\": \"tinnat\"}");
    myHeaders.append("Content-Type", "application/json");
    let uri = config[environment].api.v1_post_update_pincode.uri;
    return fetch(uri, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ pincode: pincode }),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => response)
        .catch(error => error)
};

export default updateDeliveryPincode;

