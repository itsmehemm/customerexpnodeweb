const { GET_ORDER_BY_ID_CONTROLLER } = require('../lib/constants/logging-constants');
const instantPurchaseModal = require('../modals/InstantPurchaseModal');
const errorConstants = require('../lib/constants/error-constants');

const getOrderById = async (req, res) => {
    console.log(GET_ORDER_BY_ID_CONTROLLER, `processing request to get order by id: ${req.params.id}.`);
    const instantPurchaseModal = new InstantPurchaseModal();
    instantPurchaseModal.get(req.params.id);
    if (instantPurchaseModal.getOrderId()) {
        return res.send({
            id: instantPurchaseModal.getOrderId(),
            ...instantPurchaseModal.getOrder()
        });
    } else {
        return res.status(404).send({
            error: errorConstants.ORDER_NOT_FOUND
        });
    }
};

module.exports = getOrderById;