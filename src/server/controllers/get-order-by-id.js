const { GET_ORDER_BY_ID_CONTROLLER } = require('../lib/constants/logging-constants');
const OrderModal = require('../modals/OrderModal');
const errorConstants = require('../lib/constants/error-constants');

const getOrderById = async (req, res) => {
    console.log(GET_ORDER_BY_ID_CONTROLLER, `processing request to get order by id: ${req.params.id}.`);
    const orderModal = new OrderModal();
    orderModal.get(req.params.id);
    if (orderModal.getOrderId()) {
        return res.send({
            id: orderModal.getOrderId(),
            ...orderModal.getOrder()
        });
    } else {
        return res.status(404).send({
            error: errorConstants.ORDER_NOT_FOUND
        });
    }
};

module.exports = getOrderById;