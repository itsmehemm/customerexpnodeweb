import {
    commonResponseHandler,
    commonErrorHandler
} from '../lib/handlers/common';
import { getAPIHeaders } from '../lib/request/get-headers';
import config from '../configs/config.json';

const environment = config.environment;

export const getKPIs = () => {
    console.log('[INFO]', 'action::getKPIs');
    let uri = config[environment].api.v1_get_kpis.uri;
    return fetch(uri, {
        method: 'GET',
        headers: getAPIHeaders(),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => commonResponseHandler(response))
        .catch(error => commonErrorHandler(error));
};

export default getKPIs;