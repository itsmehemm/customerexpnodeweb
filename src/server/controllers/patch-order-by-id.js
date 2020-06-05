const { PATCH_ORDER_BY_ID_CONTROLLER } = require('../lib/constants/logging-constants');
const OrderModal = require('../modals/OrderModal');

const patchOrderById = async (req, res) => {
    console.log(PATCH_ORDER_BY_ID_CONTROLLER, `Patch request received: ${req.body}.`);
    console.log(PATCH_ORDER_BY_ID_CONTROLLER, `Processing request to patch order by id: ${req.params.id}.`);
    console.log(PATCH_ORDER_BY_ID_CONTROLLER, `Patch request received: ${JSON.stringify(req.body)}.`);
    const orderModal = new OrderModal();
    const orderDetails = await orderModal.getOrderDetails(req.params.id);
    if (orderDetails && orderDetails.id) {
        await orderModal.updateOrder(req.body);
        return res.send({
            status: 'COMPLETED',
            id: orderModal.getOrderId(),
            payment_url: `/instant-purchase/${orderModal.getOrderId()}/payment`
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

module.exports = patchOrderById;