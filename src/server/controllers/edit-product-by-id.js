const mongoClient = require('../mongo/mongodb');
const EditProductModal = require('../modals/EditProductModal');
const { EDIT_PRODUCT_BY_ID_CONTROLLER } = require('../lib/constants/logging-constants');
const { COLLECTION, KEY } = require('../lib/constants/mongo-constants');
const errorConstants = require('../lib/constants/error-constants');
const apiMessages = require('../lib/constants/api-messages');

const editProductById = async (req, res) => {
    console.log(EDIT_PRODUCT_BY_ID_CONTROLLER, `processing request to edit product with id: ${req.params.id}`);
    console.log(EDIT_PRODUCT_BY_ID_CONTROLLER, `request received: ${JSON.stringify(req.body)}`);
    const editProductModel = new EditProductModal();
    await editProductModel.getProduct(req.params.id);
    if (!editProductModel.getData()) {
        console.error(EDIT_PRODUCT_BY_ID_CONTROLLER, `there are no products with the given id.`);
        return res.status(404).send({
            error: errorConstants.PRODUCT_NOT_FOUND
        });
    }
    console.log(EDIT_PRODUCT_BY_ID_CONTROLLER, `retrieved original product info: ${JSON.stringify(editProductModel.getData())}`);
    editProductModel.updateData(req.body);
    console.log(EDIT_PRODUCT_BY_ID_CONTROLLER, `new product info to be persisted: ${JSON.stringify(editProductModel.getData())}`);
    return mongoClient.connection(db => {
        db
            .collection(COLLECTION.PRODUCT)
            .update({
                [KEY.PRODUCT_ID]: req.params.id
            }, {
                ...editProductModel.getData()
            })
            .then(() => res.status(200).send({
                id: editProductModel.getData().id,
                ...apiMessages.PRODUCT_UPDATE_COMPLETED
            }))
            .catch((error) => {
                console.error(EDIT_PRODUCT_BY_ID_CONTROLLER, `there was an error performing operation in the database. ${JSON.stringify(error)}`);
                res.status(500).send({
                    error: errorConstants.DATABASE_ERROR
                });
            });
    });
};

module.exports = editProductById;