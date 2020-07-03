const PaymentActivityModal = require('../modals/PaymentActivityModal');
const apiMessages = require('../lib/constants/api-messages');
const errorConstants = require('../lib/constants/error-constants');
const { PAYMENT_ACTIVITY_INTERNAL_CONTROLLER } = require('../lib/constants/logging-constants');

const getPaymentActivityInternal = async (req, res) => {
    console.log(PAYMENT_ACTIVITY_INTERNAL_CONTROLLER, `get payment activity internal for transaction id: ${req.params.transactionId}`);
    if (!req.params.transactionId) {
        res.status(404).send({
            ...errorConstants.INVALID_DATA
        });
    }
    const paymentActivityModal = new PaymentActivityModal();
    const activityResponse = await paymentActivityModal.getActivityInternalByTransactionId(req.params.transactionId);
    if (activityResponse) {
        return res.status(200).send({
            ...apiMessages.PAYMENT_ACTIVITY_FOUND,
            data: activityResponse
        });
    }
    return res.status(404).send({
        ...errorConstants.PAYMENT_ACTIVITY_NOT_FOUND,
    });
};

module.exports = getPaymentActivityInternal;
