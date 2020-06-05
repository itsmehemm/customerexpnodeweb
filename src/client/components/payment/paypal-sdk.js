export const renderSmartPaymentButtons = (paypal, paymentPlan) => {
    console.log('PAYPAL_SDK_UTIL', `payment_plan:${JSON.stringify(paymentPlan)}`);
    try {
        paypal.Buttons({
            style: {
                shape: 'pill',
                color: 'blue',
                layout: 'vertical',
                label: 'pay',

            },
            createOrder: () => paymentPlan.paypal.order_id,
            onApprove: function (data, actions) {
                if (data && data.payerID) {
                    console.log('PAYPAL_SDK_UTIL', `buyer approved txn: ${JSON.stringify(data.payerID)}`);
                }
                if (data && data.orderID) {
                    console.log('PAYPAL_SDK_UTIL', "Capturing the payment..");
                    return actions.order.capture().then(function (details) {
                        alert('Transaction completed by ' + details.payer.name.given_name + '!');
                    });
                } else {
                    console.log('PAYPAL_SDK_UTIL_ERROR', `error completing paypal checkout`);
                }
            },
            onError: function (error) {
                console.log(`There was an error while buyer was approving the transaction: ${codify(JSON.stringify(error, undefined, 4))}`);
            }
        }).render("#paypal-button-container");
        console.log('PAYPAL_SDK_UTIL', `paypal sdk loaded successfully.`);
    } catch (err) {
        console.log('PAYPAL_SDK_UTIL_ERROR', `error loading paypal sdk: ${JSON.stringify(err)}`);
    }
};