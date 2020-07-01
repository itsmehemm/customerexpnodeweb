import config from '../configs/config.json';
const environment = config.environment;

export const whoami = () => {
    console.log('[INFO]', 'action::whoami');
    var myHeaders = new Headers();
    myHeaders.append("X-TINNAT-SECURITY-CONTEXT", "{\"userId\": \"admin\", \"key\": \"tinnat\"}");
    return fetch(config[environment].web.whoami.uri, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => response)
        .catch(error => error);
};

export default whoami;