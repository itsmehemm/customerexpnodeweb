
const mongoClient = require('../mongo/mongodb');
const AddProductModal = require('../modals/AddProductModal');
const { COLLECTION } = require('../lib/constants/mongo-constants');
const { ADD_PRODUCT_CONTROLLER } = require('../lib/constants/logging-constants');

const addProduct = (req, res) => {
    console.log(ADD_PRODUCT_CONTROLLER, `Processing request`, JSON.stringify(req.body));
    const addProductModal = new AddProductModal();
    addProductModal.setData(req.body);
    if (!addProductModal.validate()) {
        console.log(ADD_PRODUCT_CONTROLLER, `Invalid request received`);
        return res.status(400).send({
            error: {
                message: 'INVALID_DATA',
                description: 'One or more required parameters has invalid data. Please check the API specification and try again.'
            }
        });
    }
    const product = addProductModal.getData();
    console.log(ADD_PRODUCT_CONTROLLER, `product object to insert: ${JSON.stringify(product)}`);
    return mongoClient.connection((db) => {
        db
            .collection(COLLECTION.PRODUCT)
            .insertOne(product)
            .then(result => {
                console.log(ADD_PRODUCT_CONTROLLER, `Added product to database: ${JSON.stringify(result)}`);
                res.status(200).send({
                    status: 'COMPLETED',
                    id: product.id,
                    description: 'A new product has been added successfully.'
                })
            })
            .catch((err) => {
                console.log(ADD_PRODUCT_CONTROLLER, `Error adding product to database: ${JSON.stringify(err)}`);
                res.status(500).send({
                    error: {
                        message: 'INTERNAL_SERVER_ERROR',
                        description: 'An internal server error occurred while trying to process your request. Please try again.'
                    }
                });
            });
    });
};

module.exports = addProduct;