const postalpincodeApi = require('../postalpincode');
const InstantPurchaseModal = require('../modals/InstantPurchaseModal');
const {
    COMPLETED,
    DELIVERABLE
} = require('../lib/constants');
const apiMessages = require('../lib/constants/api-messages');
const errorConstants = require('../lib/constants/error-constants');
const { PATCH_ORDER_BY_ID_CONTROLLER } = require('../lib/constants/logging-constants');

const patchOrderById = async (req, res) => {
    console.log(PATCH_ORDER_BY_ID_CONTROLLER, `processing request to patch order by id: ${req.params.id}`);
    console.log(PATCH_ORDER_BY_ID_CONTROLLER, `patch request received: ${JSON.stringify(req.body)}`);
    const instantPurchaseModal = new InstantPurchaseModal();
    instantPurchaseModal.load(req.params.id);
    if (!instantPurchaseModal.getOrderId()) {
        return res.status(404).send({
            error: errorConstants.ORDER_NOT_FOUND
        });
    }
    if (instantPurchaseModal.getPaymentInformation() &&
        instantPurchaseModal.getPaymentInformation().status === COMPLETED) {
        return res.status(404).send({
            error: errorConstants.CANNOT_PATCH_COMPLETED_ORDER
        });
    }
    const orderId = await instantPurchaseModal.patch({
        id: req.params.id,
        ...req.body
    });
    if (orderId) {
        const pincode = instantPurchaseModal.getShippingAddress() && instantPurchaseModal.getShippingAddress().pincode;
        if (pincode) {
            const address = await postalpincodeApi.load(pincode);
            if (address && !address.error && address.getPincode()) {
                const deliveryData = await postalpincodeApi.getDeliveryStatus(address);
                if (deliveryData.status === DELIVERABLE) {
                    return res.status(200).send({
                        ...apiMessages.ORDER_PATCHED,
                        id: instantPurchaseModal.getOrderId(),
                        links: [{
                            name: 'PAYMENT',
                            method: 'GET',
                            href: `/instant-purchase/payment/${orderId}`
                        }]
                    });
                }
            }
        }
        return res.status(200).send({
            ...apiMessages.ORDER_PATCH_PENDING,
            id: instantPurchaseModal.getOrderId(),
            reason: 'Sorry, we don\'t deliver to this address'
        });
    } else {
        return res.status(500).send({
            error: errorConstants.INTERNAL_SERVER_ERROR
        });
    }
};

module.exports = patchOrderById;