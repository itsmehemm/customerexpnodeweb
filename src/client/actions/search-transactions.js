import {
    commonResponseHandler,
    commonErrorHandler
} from '../lib/handlers/common';
import getAPIHeaders from '../lib/request/get-api-headers';
import config from '../configs/config.json';

const environment = config.environment;

const searchTransactions = async (filters) => {
    console.log('[INFO]', 'action::searchTransactions');
    console.log('[INFO]', 'request', JSON.stringify(filters, undefined, 4));
    let uri = config[environment].api.v1_post_search_transactions.uri;
    return fetch(uri, {
        method: 'POST',
        headers: getAPIHeaders(),
        body: JSON.stringify(filters),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => commonResponseHandler(response))
        .catch(error => commonErrorHandler(error));
};

export default searchTransactions;

