const { REMOVE_PRODUCT_BY_ID_CONTROLLER } = require('../lib/constants/logging-constants');
const { COLLECTION, KEY } = require('../lib/constants/mongo-constants');
const mongoClient = require('../mongo/mongodb');

const removeProductById = (req, res) => {

    console.log(REMOVE_PRODUCT_BY_ID_CONTROLLER, `Processing request to remove product by id: ${req.params.id}`);

    return mongoClient.connection(db => {
        db.
            collection(COLLECTION.PRODUCT)
            .remove({
                [KEY.PRODUCT_ID]: req.params.id
            })
            .then(({ result }) => {
                if (result.n === 0)
                    res.status(400).send({
                        error: {
                            message: 'PRODUCT_NOT_FOUND',
                            description: 'There are no products with the given id.'
                        }
                    });
                else {
                    res.status(200).send({
                        message: 'PRODUCT_REMOVED',
                        description: 'The product has been removed from our system.'
                    });
                }
            })
            .catch(err => {
                console.log(REMOVE_PRODUCT_BY_ID_CONTROLLER, `Error performing operation in database: ${JSON.stringify(err)}`);
                res.status(500).send({
                    error: {
                        message: 'INTERNAL_SERVER_ERROR',
                        description: 'An internal server error occurred while trying to process your request. Please try again.'
                    }
                })
            });
    });
};
module.exports = removeProductById;