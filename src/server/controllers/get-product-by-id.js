const ViewProductModal = require('../modals/ViewProductModal');
const errorConstants = require('../lib/constants/error-constants');
const { constructDeliveryObj } = require('../lib/utils');
const { GET_PRODUCT_BY_ID_CONTROLLER } = require('../lib/constants/logging-constants');

const getProductById = async (req, res) => {
    console.log(GET_PRODUCT_BY_ID_CONTROLLER, `processing request to get product by id: ${req.params.id}`);
    const viewProductModal = new ViewProductModal();
    await viewProductModal.build(req.params.id);
    if (viewProductModal.getData()) {
        const delivery = req.session && req.session.delivery;
        let productDelivery = null;
        if (delivery && delivery.pincode) {
            productDelivery = {
                status: delivery.status,
                address: {
                    place: delivery.place,
                    region: delivery.region,
                    district: delivery.district,
                    state: delivery.state,
                    pincode: delivery.pincode
                },
                delivery_time: delivery.deliveryTime
            };
        }
        return res.status(200).send({
            ...viewProductModal.getData(),
            delivery: constructDeliveryObj(req.session.delivery)
        });
    }
    return res.status(400).send({
        error: errorConstants.PRODUCT_NOT_FOUND
    });
};

module.exports = getProductById;