const PaymentActivityModal = require('../modals/PaymentActivityModal');
const apiMessages = require('../lib/constants/api-messages');
const errorConstants = require('../lib/constants/error-constants');
const { PAYMENT_ACTIVITY_CONTROLLER } = require('../lib/constants/logging-constants');

const getPaymentActivity = async (req, res) => {
    console.log(PAYMENT_ACTIVITY_CONTROLLER, `get payment activity for transaction id: ${req.params.transactionId}`);
    if (!req.params.transactionId) {
        res.status(404).send({
            ...errorConstants.INVALID_DATA
        });
    }
    const { accountId } = req && req.user;
    const paymentActivityModal = new PaymentActivityModal(accountId);
    const activityResponse = await paymentActivityModal.getActivityByTransactionId(req.params.transactionId);
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

module.exports = getPaymentActivity;
