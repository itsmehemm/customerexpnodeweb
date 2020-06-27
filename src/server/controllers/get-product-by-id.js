const ViewProductModal = require('../modals/ViewProductModal');
const { GET_PRODUCT_BY_ID_CONTROLLER } = require('../lib/constants/logging-constants');
const errorConstants = require('../lib/constants/error-constants');

const getProductById = async (req, res) => {
    console.log(GET_PRODUCT_BY_ID_CONTROLLER, `processing request to get product by id: ${req.params.id}`);
    const viewProductModal = new ViewProductModal();
    await viewProductModal.build(req.params.id);
    if (viewProductModal.getData()) {
        return res.status(200).send({
            ...viewProductModal.getData()
        });
    }
    return res.status(400).send({
        error: errorConstants.PRODUCT_NOT_FOUND
    });
};

module.exports = getProductById;