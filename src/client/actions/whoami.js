import {
    commonResponseHandler,
    commonErrorHandler
} from '../lib/handlers/common';
import getAPIHeaders from '../lib/request/get-api-headers';
import config from '../configs/config.json';
const environment = config.environment;

export const whoami = () => {
    console.log('[INFO]', 'action::whoami');
    return fetch(config[environment].web.whoami.uri, {
        method: 'GET',
        headers: getAPIHeaders(),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => commonResponseHandler(response))
        .catch(error => commonErrorHandler(error));
};

export default whoami;