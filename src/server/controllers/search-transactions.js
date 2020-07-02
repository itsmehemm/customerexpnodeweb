const moment = require('moment-timezone');
const mongoClient = require('../mongo/mongodb');
const { SEARCH_TRANSACTIONS_CONTROLLER } = require('../lib/constants/logging-constants');
const { COLLECTION } = require('../lib/constants/mongo-constants');
const apiMessages = require('../lib/constants/api-messages');

const searchTransactions = async (req, res) => {
    console.log(SEARCH_TRANSACTIONS_CONTROLLER, `processing request to search transactions`);
    console.log(SEARCH_TRANSACTIONS_CONTROLLER, `filter request: ${JSON.stringify(req.body)}`);
    const filter = req.body;
    let searchObj = {};
    if (filter && filter.transaction && filter.transaction.id) {
        searchObj.transaction_id = filter.transaction.id;
    }
    if (filter && filter.transaction && filter.transaction.status) {
        searchObj.status = filter.transaction.status;
    }
    if (filter && filter.order && filter.order.id) {
        searchObj.order_id = filter.order.id;
    }
    const email = filter && filter.order && filter.order.email;
    const phoneNumber = filter && filter.order && filter.order.phone_number;
    const from = parseInt(filter && filter.range && filter.range.from || new Date(moment().tz("Asia/Kolkata").subtract(3, 'months').format()).getTime());
    const to = parseInt(filter && filter.range && filter.range.to || new Date(moment().tz('Asia/Kolkata').format()).getTime());
    console.log(SEARCH_TRANSACTIONS_CONTROLLER, `search object: ${JSON.stringify(searchObj)}`);
    console.log(SEARCH_TRANSACTIONS_CONTROLLER, `from: ${from}`);
    console.log(SEARCH_TRANSACTIONS_CONTROLLER, `to: ${to}`);
    console.log(SEARCH_TRANSACTIONS_CONTROLLER, `email: ${email}`);
    console.log(SEARCH_TRANSACTIONS_CONTROLLER, `phonenumber: ${phoneNumber}`);
    const transactions = await new Promise(resolve => {
        mongoClient.connection(db => {
            db
                .collection(COLLECTION.PAY)
                .find(searchObj)
                .toArray()
                .then(transactions => {
                    if (Array.isArray(transactions)) {
                        transactions = transactions.filter(transaction => parseInt(transaction.time_stamp) >= from && parseInt(transaction.time_stamp) <= to)
                        if (email) {
                            transactions = transactions.filter(transaction => transaction.personal_information && transaction.personal_information.email === email);
                        }
                        if (phoneNumber) {
                            transactions = transactions.filter(transaction => transaction.personal_information && transaction.personal_information.phone_number === phoneNumber);
                        }
                        return resolve(transactions);
                    }
                    return resolve([]);
                })
                .catch(err => resolve([]))
        });
    });
    if (transactions.length > 0) {
        return res.status(200).send({
            ...apiMessages.OPERATION_COMPLETED,
            transactions: transactions
        });
    }
    return res.status(200).send({
        ...apiMessages.TRANSACTIONS_NOT_FOUND
    });
};

module.exports = searchTransactions;