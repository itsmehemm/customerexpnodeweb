const FilteredProductsModal = require('../modals/FilteredProductsModal');
const { GET_PRODUCTS_BY_FILTER_CONTROLLER } = require('../lib/constants/logging-constants');
const errorConstants = require('../lib/constants/error-constants');

const getFilteredProducts = async (req, res) => {
    console.log(GET_PRODUCTS_BY_FILTER_CONTROLLER, `processing request to get products by filters`);
    console.log(GET_PRODUCTS_BY_FILTER_CONTROLLER, `filter received: ${JSON.stringify(req.body)}`);
    const filterProductsModal = new FilteredProductsModal(req.body);
    await filterProductsModal.process();
    if (!filterProductsModal.isValidFilter()) {
        return res.status(400).send({
            error: errorConstants.INVALID_DATA
        });
    }
    return res.status(200).send({
        results: [
            ...filterProductsModal.getProducts()
        ]
    });
};

module.exports = getFilteredProducts;