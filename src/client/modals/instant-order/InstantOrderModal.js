export default class InstantOrderModal {

    constructor() {
        this.data = null;
    }

    updateData(d) {
        let data = {};
        data.id = d && d.id;
        data.personal_information = {
            email: d && d.personal_information && d.personal_information.email,
            phone_number: d && d.personal_information && d.personal_information.phone_number
        };
        data.purchase_items = d && d.purchase_items;
        data.purchase_item = d && d.purchase_items && d.purchase_items[0];
        data.amount = d && d.amount;
        data.billing_address = {
            name: d && d.billing_address && d.billing_address.name,
            address_line_1: d && d.billing_address && d.billing_address.address_line_1,
            address_line_2: d && d.billing_address && d.billing_address.address_line_2,
            city: d && d.billing_address && d.billing_address.city,
            pincode: d && d.billing_address && d.billing_address.pincode,
            state: d && d.billing_address && d.billing_address.state,
            landmark: d && d.billing_address && d.billing_address.landmark,
        };
        data.shipping_address = {
            shipping_same_as_billing: d && d.shipping_address && d.shipping_address.shipping_same_as_billing,
            name: d && d.shipping_address && d.shipping_address.name,
            address_line_1: d && d.shipping_address && d.shipping_address.address_line_1,
            address_line_2: d && d.shipping_address && d.shipping_address.address_line_2,
            city: d && d.shipping_address && d.shipping_address.city,
            pincode: d && d.shipping_address && d.shipping_address.pincode,
            state: d && d.shipping_address && d.shipping_address.state,
            landmark: d && d.shipping_address && d.shipping_address.landmark,
        };
        data.payment_information = d && d.payment_information;
        data.delivery = d && d.delivery;
        this.data = {
            id: data.id,
            personal_information: data.personal_information,
            purchase_item: data.purchase_item,
            purchase_items: data.purchase_items,
            amount: data.amount,
            billing_address: data.billing_address,
            shipping_address: data.shipping_address,
            payment_information: data.payment_information,
            delivery: data.delivery
        };
    }

    getDefaultData() {
        return {
            id: null,
            purchase_item: null,
            purchase_items: [],
            amount: {
                subtotal: null,
                currency: null
            },
            personal_information: {
                email: null,
                phone_number: null
            },
            billing_address: {
                name: null,
                address_line_1: null,
                address_line_2: null,
                city: null,
                pincode: null,
                state: null,
                landmark: null,
            },
            shipping_address: {
                shipping_same_as_billing: false,
                name: null,
                address_line_1: null,
                address_line_2: null,
                city: null,
                pincode: null,
                state: null,
                landmark: null,
            },
            payment_information: null,
            delivery: null
        };
    }

    updatePatchDataFromState(state) {
        let data = {
            id: state && state.id,
            personal_information: state && state.personal_information,
            billing_address: state && state.billing_address,
            shipping_address: state && state.shipping_address
        };
        this.data = data;
    }

    updateCreateDataFromState(state) {
        let purchase_item = {
            id: state && state.id,
            theme_id: state && state.selection && state.selection.themeId,
            quantity: state && state.selection && state.selection.quantity
        }
        this.data = {
            purchase_item: purchase_item,
            purchase_items: [purchase_item]
        };
    }

    buildPatchOrderRequest() {
        return {
            id: this.data && this.data.id,
            personal_information: this.data && this.data.personal_information,
            billing_address: this.data && this.data.billing_address,
            shipping_address: this.data && this.data.shipping_address
        };
    }

    buildCreateOrderRequest() {
        return {
            purchase_items: this.data && this.data.purchase_items
        };
    }

    getData() { return this.data; }
}