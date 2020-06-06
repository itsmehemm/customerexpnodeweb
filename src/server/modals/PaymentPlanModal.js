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

    getData() {
        return {
            paypal: this.paypal,
            tinnat: this.tinnat
        };
    }
};

module.exports = PaymentPlanModel;