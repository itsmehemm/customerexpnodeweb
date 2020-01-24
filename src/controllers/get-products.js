const { GET_PRODUCT_CONTROLLER } = require('../lib/constants/logging-constants');
const { COLLECTION } = require('../lib/constants/mongo-constants');
const mongoClient = require('../mongo/mongodb');

const getProducts = (req, res) => {
    
    console.log(GET_PRODUCT_CONTROLLER, `Processing request to get products.`)

    return mongoClient.connection(db => {
        db.
            collection(COLLECTION.PRODUCT)
            .find()
            .toArray()
            .then(result => {
                res.status(200).send({
                    products: result
                });
            })
            .catch(err => {
                console.log(GET_PRODUCT_CONTROLLER, `Error performing operation in database: ${JSON.stringify(err)}`);
                res.status(500).send({
                    error: {
                        message: 'INTERNAL_SERVER_ERROR',
                        description: 'An internal server error occurred while trying to process your request. Please try again.'
                    }
                })
            });
    });
};
module.exports = getProducts;