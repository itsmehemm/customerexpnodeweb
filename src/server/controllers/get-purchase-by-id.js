const mongoClient = require('../mongo/mongodb');
const {
    COLLECTION,
    KEY
} = require('../lib/constants/mongo-constants');
const { GET_PURCHASE_BY_ID_CONTROLLER } = require('../lib/constants/logging-constants');
const apiMessages = require('../lib/constants/api-messages');
const errorConstants = require('../lib/constants/error-constants');

const getPurchaseById = async (req, res) => {
    console.log(GET_PURCHASE_BY_ID_CONTROLLER, `request received to get purchase details for id: ${req.params.orderId}`);
    if (!req.params.orderId) {
        return res.status(400).send({
            error: {
                ...errorConstants.INVALID_DATA
            }
        });
    }
    const { accountId } = req && req.user;
    console.log(GET_PURCHASE_BY_ID_CONTROLLER, `account_id`, accountId);
    const order = await new Promise(resolve => {
        mongoClient.connection(db => {
            db.collection(COLLECTION.ORDER)
                .find({
                    [KEY.ACCOUNT_ID]: accountId,
                    [KEY.ID]: req.params.orderId
                })
                .toArray()
                .then(result => resolve(Array.isArray(result) && result[0] || null))
                .catch(() => resolve(null));
        });
    });
    if (order) {
        console.log(GET_PURCHASE_BY_ID_CONTROLLER, `order detail fetched from db`);
        return res.status(200).send({
            ...apiMessages.OPERATION_COMPLETED,
            ...order
        });
    }
    return res.status(404).send({
        error: {
            ...errorConstants.ORDER_NOT_FOUND
        }
    });
};

module.exports = getPurchaseById;