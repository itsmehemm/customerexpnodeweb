import {
    commonResponseHandler,
    commonErrorHandler
} from '../lib/handlers/common';
import config from '../configs/config.json';

const environment = config.environment;

const getLogsById = async (id) => {
    console.log('[INFO]', 'action::getLogsById');
    return fetch(config[environment].api.v1_get_logs_by_id.uri + id, {
        method: 'GET',
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => commonResponseHandler(response))
        .catch(error => commonErrorHandler(error));
};

export default getLogsById;