const mongoClient = require('../mongo/mongodb');
const ViewProductModal = require('../modals/ViewProductModal');
const { GET_PRODUCT_CONTROLLER } = require('../lib/constants/logging-constants');
const { COLLECTION } = require('../lib/constants/mongo-constants');
const errorConstants = require('../lib/constants/error-constants');

const getProducts = (req, res) => {
    console.log(GET_PRODUCT_CONTROLLER, `processing request to get all products.`)
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
            .catch((error) => {
                console.log(GET_PRODUCT_CONTROLLER, `error performing operation in database: ${JSON.stringify(error)}`);
                return res.status(500).send({
                    error: errorConstants.DATABASE_ERROR
                });
            });
    });
};

module.exports = getProducts;