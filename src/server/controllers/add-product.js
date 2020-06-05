
const mongoClient = require('../mongo/mongodb');
const AddProductModal = require('../modals/AddProductModal');
const { COLLECTION } = require('../lib/constants/mongo-constants');
const { ADD_PRODUCT_CONTROLLER } = require('../lib/constants/logging-constants');
const errorConstants = require('../lib/constants/error-constants');
const apiMessages = require('../lib/constants/api-messages');

const addProduct = (req, res) => {
    console.log(ADD_PRODUCT_CONTROLLER, `processing request to add product: ${JSON.stringify(req.body)}`);
    const addProductModal = new AddProductModal(req.body);
    console.log(ADD_PRODUCT_CONTROLLER, `product object parsed: ${JSON.stringify(addProductModal.getData())}`);
    if (!addProductModal.validate()) {
        console.log(ADD_PRODUCT_CONTROLLER, `invalid request received.`);
        return res.status(400).send({
            error: errorConstants.MISSING_REQUIRED_PARAMETERS
        });
    }
    const product = addProductModal.getData();
    return mongoClient.connection((db) => {
        db
            .collection(COLLECTION.PRODUCT)
            .insertOne(product)
            .then(() => {
                console.log(ADD_PRODUCT_CONTROLLER, `added product to database`);
                res.status(200).send({
                    id: product.id,
                    ...apiMessages.PRODUCT_ADDED
                })
            })
            .catch((error) => {
                console.log(ADD_PRODUCT_CONTROLLER, `error adding product to database: ${JSON.stringify(error)}`);
                res.status(500).send({
                    error: errorConstants.DATABASE_ERROR
                });
            });
    });
};

module.exports = addProduct;