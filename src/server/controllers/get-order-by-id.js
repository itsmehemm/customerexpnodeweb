const { GET_ORDER_BY_ID_CONTROLLER } = require('../lib/constants/logging-constants');
const OrderModal = require('../modals/OrderModal');

const getOrderById = async (req, res) => {
    console.log(GET_ORDER_BY_ID_CONTROLLER, `Processing request to get order by id: ${req.params.id}.`);
    const orderModal = new OrderModal();
    const orderDetails = orderModal.getOrderDetails(req.params.id);
    if (orderDetails && orderDetails.id) {
        return res.send({
            ...orderDetails
        });
    } else {
        return res.status(400).send({
            error: {
                message: 'ORDER_NOT_FOUND',
                description: 'There are no orders with the given id.'
            }
        });
    }
};

module.exports = getOrderById;