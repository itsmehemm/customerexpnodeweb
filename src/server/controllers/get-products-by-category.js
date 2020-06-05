const mongoClient = require('../mongo/mongodb');
const ViewProductModal = require('../modals/ViewProductModal');
const { GET_PRODUCTS_BY_CATEGORY_CONTROLLER } = require('../lib/constants/logging-constants');
const { COLLECTION } = require('../lib/constants/mongo-constants');
const errorConstants = require('../lib/constants/error-constants');

const getProductsByCategory = (req, res) => {
    console.log(GET_PRODUCTS_BY_CATEGORY_CONTROLLER, `Processing request to get products by category: ${JSON.stringify(req.params.category_code)}.`)
    return mongoClient.connection(db => {
        db.
            collection(COLLECTION.PRODUCT)
            .find({
                'category_code': req.params.category_code
            })
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
                console.log(GET_PRODUCTS_BY_CATEGORY_CONTROLLER, `Error performing operation in database: ${JSON.stringify(err)}`);
                res.status(500).send({
                    error: errorConstants.DATABASE_ERROR
                });
            });
    });
};

module.exports = getProductsByCategory;