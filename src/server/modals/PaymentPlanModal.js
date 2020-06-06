class PaymentPlanModel {
    constructor() {
        this.paypal = null;
        this.tinnat = null;
    }

    setClientToken(t) {
        this.paypal = this.paypal || {};
        this.paypal.client_token = t;
    }

    setClientId(id) {
        this.paypal = this.paypal || {};
        this.paypal.client_id = id;
    }

    setPayPalOrderId(id) {
        this.paypal = this.paypal || {};
        this.paypal.order_id = id;
    }

    setSdkUrl(url) {
        this.paypal = this.paypal || {};
        this.paypal.sdk = this.paypal.sdk || {};
        this.paypal.sdk.url = url;
    }

    setOrderId(id) {
        this.tinnat = this.tinnat || {};
        this.tinnat.order_id = id;
    }

    setOrderDetails(d) {
        this.tinnat = this.tinnat || {};
        this.tinnat.order_details = d;
    }

    setRazorPayOrderId(id) {
        this.razorpay = this.razorpay || {};
        this.razorpay.order_id = id;
    }

    setRazorPayApiKey(k) {
        this.razorpay = this.razorpay || {};
        this.razorpay.api_key = k;
    }

    getData() {
        return {
            tinnat: this.tinnat,
            paypal: this.paypal,
            razorpay: this.razorpay
        };
    }
};

module.exports = PaymentPlanModel;