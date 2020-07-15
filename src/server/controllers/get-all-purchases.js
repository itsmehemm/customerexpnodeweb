const _ = require('lodash');
const mongoClient = require('../mongo/mongodb');
const {
    COLLECTION,
    KEY
} = require('../lib/constants/mongo-constants');
const { GET_ALL_PURCHASES_CONTROLLER } = require('../lib/constants/logging-constants');
const apiMessages = require('../lib/constants/api-messages');

const getAllPurchases = async (req, res) => {
    console.log(GET_ALL_PURCHASES_CONTROLLER, `request received to get all purchase details`);
    const { accountId } = req && req.user;
    console.log(GET_ALL_PURCHASES_CONTROLLER, `account_id`, accountId);
    const orders = await new Promise(resolve => {
        mongoClient.connection(db => {
            db.collection(COLLECTION.ORDER)
                .find({
                    [KEY.ACCOUNT_ID]: accountId
                })
                .toArray()
                .then(result => resolve(_.reverse(result)))
                .catch(() => resolve([]));
        });
    });
    console.log(GET_ALL_PURCHASES_CONTROLLER, `orders fetched from db`, `size: ${orders.length}`);
    return res.status(200).send({
        ...apiMessages.OPERATION_COMPLETED,
        orders: orders
    });
};

module.exports = getAllPurchases;