const { PATCH_ORDER_BY_ID_CONTROLLER } = require('../lib/constants/logging-constants');
const InstantPurchaseModal = require('../modals/InstantPurchaseModal');
const errorConstants = require('../lib/constants/error-constants');
const apiMessages = require('../lib/constants/api-messages');

const patchOrderById = async (req, res) => {
    console.log(PATCH_ORDER_BY_ID_CONTROLLER, `processing request to patch order by id: ${req.params.id}.`);
    console.log(PATCH_ORDER_BY_ID_CONTROLLER, `patch request received: ${JSON.stringify(req.body)}.`);
    const instantPurchaseModal = new InstantPurchaseModal();
    instantPurchaseModal.get(req.params.id);
    if (!instantPurchaseModal.getOrderId()) {
        return res.status(404).send({
            error: errorConstants.ORDER_NOT_FOUND
        });
    }
    if (instantPurchaseModal.getOrder().payment_information &&
        instantPurchaseModal.getOrder().payment_information.status === 'COMPLETED') {
        return res.status(404).send({
            error: errorConstants.CANNOT_PATCH_COMPLETED_ORDER
        });
    }
    const orderId = await instantPurchaseModal.patch({
        id: req.params.id,
        ...req.body
    });
    if (orderId) {
        return res.status(200).send({
            ...apiMessages.ORDER_PATCHED,
            id: instantPurchaseModal.getOrderId(),
            instant_payment_url: `/instant-purchase/payment/${orderId}`
        });
    } else {
        return res.status(500).send({
            error: errorConstants.INTERNAL_SERVER_ERROR
        });
    }
};

module.exports = patchOrderById;