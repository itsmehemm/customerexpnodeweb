const _ = require('lodash');
const mongoClient = require('../mongo/mongodb');
const apiMessages = require('../lib/constants/api-messages');
const { COLLECTION } = require('../lib/constants/mongo-constants');
const { GET_BUSINESS_KPIS_CONTROLLER } = require('../lib/constants/logging-constants');

const getBusinessKPIs = async (req, res) => {
    console.log(GET_BUSINESS_KPIS_CONTROLLER, `request to get business kpis received`);
    const transactions = await new Promise(resolve => {
        mongoClient.connection(db => {
            db
                .collection(COLLECTION.PAY)
                .find()
                .toArray()
                .then(transactions => {
                    if (Array.isArray(transactions)) {
                        return resolve(_.takeRight(transactions, 10));
                    }
                    return resolve([]);
                })
                .catch(err => resolve([]))
        });
    });
    return res.status(200).send({
        ...apiMessages.SUCCESS,
        recent_transactions: transactions
    });
};

module.exports = getBusinessKPIs;