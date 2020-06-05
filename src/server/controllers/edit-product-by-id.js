const mongoClient = require('../mongo/mongodb');
const { EDIT_PRODUCT_BY_ID_CONTROLLER } = require('../lib/constants/logging-constants');
const { COLLECTION, KEY } = require('../lib/constants/mongo-constants');
const EditProductModal = require('../modals/EditProductModal');

const editProductById = async (req, res) => {
    console.log(EDIT_PRODUCT_BY_ID_CONTROLLER, `Processing request to edit product with id: ${req.params.id}`);
    console.log(EDIT_PRODUCT_BY_ID_CONTROLLER, `New info to be edited: ${JSON.stringify(req.body)}`);
    const editProductModel = await new Promise((resolve, reject) => {
        mongoClient.connection(db => {
            db
                .collection(COLLECTION.PRODUCT)
                .find({
                    [KEY.PRODUCT_ID]: req.params.id
                })
                .toArray()
                .then(result => {
                    if (Array.isArray(result) && result.length === 1) {
                        return resolve(new EditProductModal(result[0]));
                    } else {
                        return resolve(new EditProductModal());
                    }
                })
                .catch(err => {
                    return resolve(new EditProductModal())
                });
        });
    });
    if (!editProductModel.getData()) {
        console.log(EDIT_PRODUCT_BY_ID_CONTROLLER, `Original product info cannot be retrieved.`);
        return res.send({
            error: {
                message: 'PRODUCT_NOT_FOUND',
                description: 'The product you\'re looking for to edit doesn\'t exist.'
            }
        });
    }
    console.log(EDIT_PRODUCT_BY_ID_CONTROLLER, `Retrieved original product info: ${JSON.stringify(editProductModel.getData())}`);
    console.log(EDIT_PRODUCT_BY_ID_CONTROLLER, `Product info to be edited: ${JSON.stringify(req.body)}`);
    editProductModel.updateData(req.body);
    console.log(EDIT_PRODUCT_BY_ID_CONTROLLER, `New product info to be persisted after update: ${JSON.stringify(editProductModel.getData())}`);
    return mongoClient.connection(db => {
        db
            .collection(COLLECTION.PRODUCT)
            .update({
                [KEY.PRODUCT_ID]: req.params.id
            }, {
                ...editProductModel.getData()
            })
            .then(result => res.send({
                status: 'COMPLETED',
                message: 'PRODUCT_UPDATE_COMPLETED',
                id: editProductModel.getData().id,
                description: 'The product information was updated successfully.'
            }))
            .catch(err => {
                console.log(EDIT_PRODUCT_BY_ID_CONTROLLER, `There was an error performing the operation in the database. ${JSON.stringify(err)}`);
                res.send({
                    error: {
                        message: 'INTERNAL_SERVER_ERROR',
                        description: 'An internal server error occurred while trying to process your request. Please try again.'
                    }
                });
            });
    });
};

module.exports = editProductById;