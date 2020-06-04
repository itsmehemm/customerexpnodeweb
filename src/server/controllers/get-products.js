const mongoClient = require('../mongo/mongodb');
const ViewProductModal = require('../modals/ViewProductModal');
const { GET_PRODUCT_CONTROLLER } = require('../lib/constants/logging-constants');
const { COLLECTION } = require('../lib/constants/mongo-constants');

const getProducts = (req, res) => {
    console.log(GET_PRODUCT_CONTROLLER, `Processing request to get products.`)
    return mongoClient.connection(db => {
        db.
            collection(COLLECTION.PRODUCT)
            .find()
            .toArray()
            .then(result => {
                let products = [];
                if (Array.isArray(result) && result.length > 0) {
                    result.forEach(product => {
                        const viewProductModal = new ViewProductModal();
                        viewProductModal.setData(product);
                        products.push(viewProductModal.getData());
                    });
                }
                return res.status(200).send({
                    products: products
                });
            })
            .catch(err => {
                console.log(GET_PRODUCT_CONTROLLER, `Error performing operation in database: ${JSON.stringify(err)}`);
                res.status(500).send({
                    error: {
                        message: 'INTERNAL_SERVER_ERROR',
                        description: 'An internal server error occurred while trying to process your request. Please try again.'
                    }
                });
            });
    });
};

module.exports = getProducts;