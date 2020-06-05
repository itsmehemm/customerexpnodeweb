export default class AddressModal {
    constructor() {
        this.data = null;
    }

    getDefaultData() {
        return {
            shipping_same_as_billing: false,
            name: null,
            address_line_1: null,
            address_line_2: null,
            city: null,
            pincode: null,
            state: null,
            landmark: null,
        };
    }
    setData(d) {
        let data = {};
        data.name = d && d.name;
        data.address_line_1 = d && d.address_line_1;
        data.address_line_2 = d && d.address_line_2;
        data.city = d && d.city;
        data.pincode = d && d.pincode;
        data.state = d && d.state;
        data.landmark = d && d.landmark;
        data.shipping_same_as_billing = d && d.shipping_same_as_billing;
        this.data = data;
    }

    getData() { return this.data }
}