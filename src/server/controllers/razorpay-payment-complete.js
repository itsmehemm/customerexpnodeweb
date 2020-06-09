const { RAZORPAY_PAYMENT_COMPLETE_NOTIFICATION } = require('../lib/constants/logging-constants');
const InstantPurchaseModal = require('../modals/InstantPurchaseModal');
const errorConstants = require('../lib/constants/error-constants');
const apiMessages = require('../lib/constants/api-messages');

const razorpayPaymentComplete = async (req, res) => {
    console.log(RAZORPAY_PAYMENT_COMPLETE_NOTIFICATION, `processing request to complete payment for order id: ${req.params.id}.`);
    console.log(RAZORPAY_PAYMENT_COMPLETE_NOTIFICATION, `razorpay payment complete received: ${JSON.stringify(req.body)}.`);
    const instantPurchaseModal = new InstantPurchaseModal();
    const orderDetails = instantPurchaseModal.get(req.params.id);
    if (!orderDetails) {
        return res.status(404).send({
            error: errorConstants.ORDER_NOT_FOUND
        });
    }
    if (orderDetails.payment_information && orderDetails.payment_information.status === 'COMPLETED') {
        return res.status(400).send({
            error: errorConstants.PAYMENT_ALREADY_COMPLETED
        });
    }
    const { payment_id, order_id, signature } = req.body;
    if (!payment_id || !order_id || !signature) {
        return res.status(402).send({
            error: errorConstants.RAZORPAY_PAYMENT_FAILED
        });
    }
    await instantPurchaseModal.updatePaymentDetails({
        status: "COMPLETED",
        transaction_id: payment_id,
        processor: 'RAZORPAY',
        processor_order_id: order_id,
        others: {
            signature: signature
        }
    });
    return res.status(200).send({
        ...apiMessages.PAYMENT_COMPLETED,
        ...instantPurchaseModal.getOrder(),
    });
};

module.exports = razorpayPaymentComplete;