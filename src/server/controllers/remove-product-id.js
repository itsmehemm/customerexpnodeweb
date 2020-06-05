const mongoClient = require('../mongo/mongodb');
const { REMOVE_PRODUCT_BY_ID_CONTROLLER } = require('../lib/constants/logging-constants');
const { COLLECTION, KEY } = require('../lib/constants/mongo-constants');
const errorConstants = require('../lib/constants/error-constants');
const apiMessages = require('../lib/constants/api-messages');

const removeProductById = (req, res) => {
    console.log(REMOVE_PRODUCT_BY_ID_CONTROLLER, `processing request to remove product by id: ${req.params.id}`);
    return mongoClient.connection(db => {
        db.
            collection(COLLECTION.PRODUCT)
            .remove({
                [KEY.PRODUCT_ID]: req.params.id
            })
            .then(({ result }) => {
                if (result.n === 0)
                    return res.status(404).send({
                        error: errorConstants.PRODUCT_NOT_FOUND
                    });
                else {
                    return res.status(200).send({
                        ...apiMessages.PRODUCT_REMOVED
                    });
                }
            })
            .catch((error) => {
                console.log(REMOVE_PRODUCT_BY_ID_CONTROLLER, `error performing operation in database: ${JSON.stringify(error)}`);
                res.status(500).send({
                    error: errorConstants.DATABASE_ERROR
                });
            });
    });
};

module.exports = removeProductById;