const _ = require('lodash');
const mongoClient = require('../mongo/mongodb');
const ViewProductModal = require('../modals/ViewProductModal');
const { GET_FEATURED_PRODUCTS_CONTROLLER } = require('../lib/constants/logging-constants');
const { COLLECTION, KEY } = require('../lib/constants/mongo-constants');

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
                if (Array.isArray(result) && result.length > 0) {
                    let limit = parseInt(req.query.limit);
                    console.log(GET_FEATURED_PRODUCTS_CONTROLLER, `limit requested: ${limit}`);
                    limit = isNaN(limit) ? result.length : Math.max(1, limit);
                    console.log(GET_FEATURED_PRODUCTS_CONTROLLER, `limit updated: ${limit}`);
                    console.log(GET_FEATURED_PRODUCTS_CONTROLLER, `total featured products: ${result.length}`);
                    limit = Math.min(limit, result.length);
                    console.log(GET_FEATURED_PRODUCTS_CONTROLLER, `limit processed: ${limit}`);
                    const featured = _.shuffle(result).slice(0, limit);
                    let response = [];
                    featured.forEach(product => {
                        const viewProductModal = new ViewProductModal();
                        viewProductModal.setData(product);
                        response.push(viewProductModal.getData());
                    });
                    return res.status(200).send({
                        featured: response
                    });
                } else {
                    return res.status(200).send({
                        featured: []
                    });
                }
            }).catch(err => {
                console.log(GET_FEATURED_PRODUCTS_CONTROLLER, `There was an error performing the operation in the database. ${JSON.stringify(err)}`);
                return res.send({
                    error: {
                        message: 'INTERNAL_SERVER_ERROR',
                        description: 'An internal server error occurred while trying to process your request. Please try again.'
                    }
                });
            });
    });
}

module.exports = getFeaturedProducts;