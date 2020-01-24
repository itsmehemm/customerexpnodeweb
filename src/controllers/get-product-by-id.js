const { GET_PRODUCT_BY_ID_CONTROLLER } = require('../lib/constants/logging-constants');
const { COLLECTION, KEY } = require('../lib/constants/mongo-constants');
const mongoClient = require('../mongo/mongodb');

const getProductById = (req, res) => {

    console.log(GET_PRODUCT_BY_ID_CONTROLLER, `Processing request to get product by id: ${req.params.id}`);

    return mongoClient.connection(db => {
        db.
            collection(COLLECTION.PRODUCT)
            .find({
                [KEY.PRODUCT_ID]: req.params.id
            })
            .toArray()
            .then(result => {
                if (Array.isArray(result)) {
                    if (result.length === 1) {
                        res.status(200).send({
                            ...result[0]
                        });
                    }
                    else if (result.length === 0) {
                        res.status(400).send({
                            error: {
                                message: 'PRODUCT_NOT_FOUND',
                                description: 'There are no products with the given id.'
                            }
                        });
                    }
                    else {
                        res.status(400).send({
                            error: {
                                message: 'NO_UNIQUE_PRODUCT_FOUND',
                                description: 'There were more than one product with the same id. Please try again.'
                            }
                        });
                    }
                }
            })
            .catch(err => {
                console.log(GET_PRODUCT_BY_ID_CONTROLLER, `Error performing operation in database: ${JSON.stringify(err)}`);
                res.status(500).send({
                    error: {
                        message: 'INTERNAL_SERVER_ERROR',
                        description: 'An internal server error occurred while trying to process your request. Please try again.'
                    }
                })
            });
    });
};
module.exports = getProductById;