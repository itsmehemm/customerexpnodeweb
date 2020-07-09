import {
    commonResponseHandler,
    commonErrorHandler
} from '../lib/handlers/common';
import config from '../configs/config.json';

const environment = config.environment;

export const getKPIs = () => {
    console.log('[INFO]', 'action::getKPIs');
    var myHeaders = new Headers();
    myHeaders.append("X-TINNAT-SECURITY-CONTEXT", "{\"userId\": \"admin\", \"key\": \"tinnat\"}");
    let uri = config[environment].api.v1_get_kpis.uri;
    return fetch(uri, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => commonResponseHandler(response))
        .catch(error => commonErrorHandler(error));
};

export default getKPIs;