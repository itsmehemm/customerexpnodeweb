const { GET_FEATURED_PRODUCTS_CONTROLLER } = require('../lib/constants/logging-constants');
const { COLLECTION, KEY } = require('../lib/constants/mongo-constants');
const mongoClient = require('../mongo/mongodb');

const getFeaturedProducts = (req, res) => {

    console.log(GET_FEATURED_PRODUCTS_CONTROLLER, `Processing request to retrieve all featured products.`);

    return mongoClient.connection(db => {
        db
            .collection(COLLECTION.PRODUCT)
            .find({
                [KEY.FEATURED_PRODUCT]: true
            })
            .toArray()
            .then(result => {
                res.status(200).send({
                    featured: result
                });
            }).catch(err => {
                console.log(GET_FEATURED_PRODUCTS_CONTROLLER, `There was an error performing the operation in the database. ${JSON.stringify(err)}`);
                res.send({
                    error: {
                        message: 'INTERNAL_SERVER_ERROR',
                        description: 'An internal server error occurred while trying to process your request. Please try again.'
                    }
                });
            });
    });
}

module.exports = getFeaturedProducts;