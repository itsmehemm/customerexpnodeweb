const uniqid = require('uniqid');
const cache = require('../cache');
const mongoClient = require('../mongo/mongodb');
const { getProductUrl } = require('../lib/utils');
const {
    ORDER_LIFE_TIME,
    ORDER_INIT,
    ORDER_PAYMENT_PENDING,
    RECEIPT_PREFIX,
    ORDER_PREFIX,
    CURRENCY,
    INTENT,
    COUNTRY_CODE,
    SOFT_DESCRIPTOR
} = require('../lib/constants');
const {
    COLLECTION,
    KEY
} = require('../lib/constants/mongo-constants');
const { INSTANT_PURCHASE_MODAL } = require('../lib/constants/logging-constants');

class InstantPurchaseModal {
    constructor() {
        this.id = null;
        this.status = null;
        this.personal_information = null;
        this.purchase_items = [];
        this.amount = null;
        this.billing_address = null;
        this.shipping_address = null;
        this.payment_information = null;
        this.time_stamp = null;
        this.data = null;
    }

    async create(d) {
        this.id = uniqid(ORDER_PREFIX).toUpperCase();
        this.personal_information = this._getPersonalInformation(d);
        this.purchase_items = await this._getPurchaseItems(d);
        if (this.purchase_items.length == 0) {
            console.log(INSTANT_PURCHASE_MODAL, `invalid purchase items. order creation failed`);
            return null;
        }
        this.amount = this._getAmount(this.purchase_items);
        this.billing_address = this._getBillingAddress(d);
        this.shipping_address = this._getShippingAddress(d);
        this.time_stamp = new Date().getTime();
        if (this.billing_address && this.shipping_address) {
            this.status = ORDER_PAYMENT_PENDING;
        } else {
            this.status = ORDER_INIT;
        }
        this.data = {
            status: this.status,
            personal_information: this.personal_information,
            purchase_items: this.purchase_items,
            amount: this.amount,
            billing_address: this.billing_address,
            shipping_address: this.shipping_address,
            payment_information: this.payment_information,
            time_stamp: this.time_stamp
        };
        await cache.put(this.id, JSON.stringify(this.data), ORDER_LIFE_TIME);
        console.log(INSTANT_PURCHASE_MODAL, 'order created & persisted:', cache.get(this.id));
        return this.id;
    }

    async patch(d) {
        if (!d || !d.id) return null;
        const data = JSON.parse(cache.get(d.id));
        console.log(INSTANT_PURCHASE_MODAL, 'order fetched from cache:', JSON.stringify(data));
        if (!data) return null;
        this.id = d.id;
        this.data = data;
        this.status = data.status;
        this.personal_information = data.personal_information;
        this.purchase_items = data.purchase_items;
        this.amount = data.amount;
        this.billing_address = data.billing_address;
        this.shipping_address = data.shipping_address;
        this.payment_information = data.payment_information;
        this.time_stamp = data.time_stamp;
        // only these details can be patched.
        const {
            personal_information,
            billing_address,
            shipping_address
        } = d;
        this.personal_information = {
            email: (personal_information && personal_information.email) || (this.personal_information && this.personal_information.email),
            phone_number: (personal_information && personal_information.phone_number) || (this.personal_information && this.personal_information.phone_number)
        };
        this.billing_address = {
            name: (billing_address && billing_address.name) || (this.billing_address && this.billing_address.name),
            address_line_1: (billing_address && billing_address.address_line_1) || (this.billing_address && this.billing_address.address_line_1),
            address_line_2: (billing_address && billing_address.address_line_2) || (this.billing_address && this.billing_address.address_line_2),
            city: (billing_address && billing_address.city) || (this.billing_address && this.billing_address.city),
            pincode: (billing_address && billing_address.pincode) || (this.billing_address && this.billing_address.pincode),
            state: (billing_address && billing_address.state) || (this.billing_address && this.billing_address.state),
            landmark: (billing_address && billing_address.landmark) || (this.billing_address && this.billing_address.landmark),
        };
        if (shipping_address) {
            if (shipping_address.shipping_same_as_billing) {
                this.shipping_address = {
                    shipping_same_as_billing: true,
                    name: (billing_address && billing_address.name) || (this.billing_address && this.billing_address.name),
                    address_line_1: (billing_address && billing_address.address_line_1) || (this.billing_address && this.billing_address.address_line_1),
                    address_line_2: (billing_address && billing_address.address_line_2) || (this.billing_address && this.billing_address.address_line_2),
                    city: (billing_address && billing_address.city) || (this.billing_address && this.billing_address.city),
                    pincode: (billing_address && billing_address.pincode) || (this.billing_address && this.billing_address.pincode),
                    state: (billing_address && billing_address.state) || (this.billing_address && this.billing_address.state),
                    landmark: (billing_address && billing_address.landmark) || (this.billing_address && this.billing_address.landmark),
                };
            } else {
                this.shipping_address = {
                    shipping_same_as_billing: false,
                    name: (shipping_address && shipping_address.name) || (this.shipping_address && this.shipping_address.name),
                    address_line_1: (shipping_address && shipping_address.address_line_1) || (this.shipping_address && this.shipping_address.address_line_1),
                    address_line_2: (shipping_address && shipping_address.address_line_2) || (this.shipping_address && this.shipping_address.address_line_2),
                    city: (shipping_address && shipping_address.city) || (this.shipping_address && this.shipping_address.city),
                    pincode: (shipping_address && shipping_address.pincode) || (this.shipping_address && this.shipping_address.pincode),
                    state: (shipping_address && shipping_address.state) || (this.shipping_address && this.shipping_address.state),
                    landmark: (shipping_address && shipping_address.landmark) || (this.shipping_address && this.shipping_address.landmark),
                };
            }
        }
        if (this.billing_address && this.shipping_address) {
            this.status = ORDER_PAYMENT_PENDING;
        } else {
            this.status = ORDER_INIT;
        }
        this.data = {
            ...this.data,
            status: this.status,
            personal_information: this.personal_information,
            billing_address: this.billing_address,
            shipping_address: this.shipping_address,
            payment_information: this.payment_information,
            time_stamp: this.time_stamp
        };
        await cache.put(this.id, JSON.stringify(this.data), ORDER_LIFE_TIME);
        console.log(INSTANT_PURCHASE_MODAL, 'order detail patched & persisted:', cache.get(this.id));
        return this.id;
    }

    load(id) {
        console.log(INSTANT_PURCHASE_MODAL, 'load order details from cache for id: ', id);
        const data = JSON.parse(cache.get(id));
        if (!data) return null;
        this.id = id;
        this.data = data;
        this.status = data.status;
        this.personal_information = data.personal_information;
        this.purchase_items = data.purchase_items;
        this.amount = data.amount;
        this.billing_address = data.billing_address;
        this.shipping_address = data.shipping_address;
        this.payment_information = data.payment_information;
        this.time_stamp = data.time_stamp;
        console.log(INSTANT_PURCHASE_MODAL, 'order details loaded from cache: ', JSON.stringify(this.data));
    }

    _getPersonalInformation(d) {
        return {
            email: d && d.personal_information && d.personal_information.email,
            phone_number: d && d.personal_information && d.personal_information.phone_number
        };
    }

    async _getPurchaseItems(d) {
        if (!d || !d.purchase_items) return null;
        if (!Array.isArray(d.purchase_items)) return null;
        if (d.purchase_items.length == 0) return null;
        let purchase_items = [];
        for (let i = 0; i < d.purchase_items.length; i++) {
            const item = d.purchase_items[0];
            const product = await new Promise((resolve) => {
                mongoClient.connection(db => {
                    db.
                        collection(COLLECTION.PRODUCT)
                        .find({
                            [KEY.PRODUCT_ID]: item.id
                        })
                        .toArray()
                        .then(result => {
                            if (Array.isArray(result) && result.length === 1) {
                                return resolve(result[0]);
                            }
                            return resolve(null);
                        }).catch(() => resolve(null));
                });
            });
            if (product) {
                const { themes } = product;
                let theme = null;
                themes.forEach(t => {
                    if (t.id === item.theme_id) {
                        theme = t;
                    }
                });
                purchase_items.push({
                    id: product.id,
                    url: getProductUrl(product.id),
                    theme_id: theme.id,
                    size: theme.size,
                    color: theme.color,
                    quantity: item.quantity,
                    picture_links: theme.picture_links,
                    amount: theme.amount,
                    stock_quantity: theme.stock_quantity,
                    data: {
                        name: product.name,
                        product_code: product.product_code,
                        description: product.description,
                        category_code: product.category_code,
                        thirty_day_exchange: product.thirty_day_exchange,
                        fifteen_day_exchange: product.fifteen_day_exchange,
                        payment_options: product.payment_options
                    }
                });
            }
        }
        return purchase_items;
    }

    _getAmount(d) {
        if (!d || !Array.isArray(d)) return null;
        let subtotal = 0;
        d.forEach(item => {
            subtotal += parseInt(item.amount.subtotal);
        });
        return {
            subtotal: subtotal,
            currency: CURRENCY.INR
        };
    }

    _getBillingAddress(d) {
        if (!d || !d.billing_address) return null;
        return {
            name: d && d.billing_address && d.billing_address.name,
            address_line_1: d && d.billing_address && d.billing_address.address_line_1,
            address_line_2: d && d.billing_address && d.billing_address.address_line_2,
            city: d && d.billing_address && d.billing_address.city,
            pincode: d && d.billing_address && d.billing_address.pincode,
            state: d && d.billing_address && d.billing_address.state,
            landmark: d && d.billing_address && d.billing_address.landmark,
        };
    }

    _getShippingAddress(d) {
        if (!d || !d.shipping_address) return null;
        if (d.shipping_address.shipping_same_as_billing) {
            return {
                shipping_same_as_billing: true,
                ...this._getBillingAddress(d)
            };
        }
        return {
            shipping_same_as_billing: false,
            name: d && d.shipping_address && d.shipping_address.name,
            address_line_1: d && d.shipping_address && d.shipping_address.address_line_1,
            address_line_2: d && d.shipping_address && d.shipping_address.address_line_2,
            city: d && d.shipping_address && d.shipping_address.city,
            pincode: d && d.shipping_address && d.shipping_address.pincode,
            state: d && d.shipping_address && d.shipping_address.state,
            landmark: d && d.shipping_address && d.shipping_address.landmark,
        };
    }

    buildRazorPayRequest() {
        const {
            amount,
            purchase_items
        } = this.data;
        return {
            amount: amount.subtotal * 100,
            currency: CURRENCY.INR,
            receipt: uniqid(RECEIPT_PREFIX).toUpperCase(),
            payment_capture: 1,
            notes: {
                notes_key_1: purchase_items[0].data.name,
                notes_key_2: purchase_items[0].id
            }
        };
    }

    buildPayPalRequest() {
        const {
            amount,
            purchase_items,
            billing_address,
            shipping_address
        } = this.data;
        return {
            intent: INTENT.CAPTURE,
            payer: {
                name: {
                    given_name: billing_address && billing_address.name,
                    surname: billing_address && billing_address.name,
                },
                address: {
                    address_line_1: billing_address && billing_address.address_line_1,
                    address_line_2: billing_address && billing_address.address_line_2,
                    admin_area_2: billing_address && billing_address.city,
                    admin_area_1: billing_address && billing_address.state,
                    postal_code: billing_address && billing_address.pincode,
                    country_code: COUNTRY_CODE.IN
                }
            },
            purchase_units: [{
                reference_id: this.id,
                description: purchase_items[0].data.description,
                custom_id: purchase_items[0].data.product_code,
                soft_descriptor: SOFT_DESCRIPTOR,
                amount: {
                    currency_code: CURRENCY.INR,
                    value: amount.subtotal,
                    breakdown: {
                        item_total: {
                            currency_code: CURRENCY.INR,
                            value: amount.subtotal,
                        },
                        tax_total: {
                            currency_code: CURRENCY.INR,
                            value: '0.00'
                        }
                    }
                },
                shipping: {
                    address: {
                        address_line_1: shipping_address && shipping_address.address_line_1,
                        address_line_2: shipping_address && shipping_address.address_line_2,
                        admin_area_2: shipping_address && shipping_address.city,
                        admin_area_1: shipping_address && shipping_address.state,
                        postal_code: shipping_address && shipping_address.pincode,
                        country_code: COUNTRY_CODE.IN
                    }
                }
            }]
        };
    }

    async updatePaymentDetails(payment) {
        if (payment) {
            this.payment_information = {
                status: payment.status,
                transaction_id: payment.transaction_id,
                processor: payment.processor,
                processor_order_id: payment.processor_order_id,
                others: payment.others,
                time_stamp: new Date().getTime()
            };
            this.data = {
                ...this.data,
                payment_information: this.payment_information
            };
        }
        await cache.put(this.id, JSON.stringify(this.data), ORDER_LIFE_TIME);
        console.log(INSTANT_PURCHASE_MODAL, 'order detail patched & persisted with payment details:', cache.get(this.id));
    }

    validate() {
        if (!this.personal_information ||
            !this.personal_information.email ||
            !this.personal_information.phone_number) {
            return false;
        }
        if (!this.billing_address || !this.billing_address.name) {
            return false;
        }
        if (!this.shipping_address ||
            !this.shipping_address.name ||
            !this.shipping_address.address_line_1 ||
            !this.shipping_address.city ||
            !this.shipping_address.state ||
            !this.shipping_address.pincode) {
            return false;
        }
        if (!this.amount) {
            return false;
        }
        return true;
    }

    getOrderId() { return this.id }

    getOrder() { return this.data }

    getPersonalInformation() { return this.personal_information; }

    getBillingAddress() { return this.billing_address; }

    getShippingAddress() { return this.shipping_address; }

    getStatus() { return this.status; }

    getPaymentInformation() { return this.payment_information; }
};

module.exports = InstantPurchaseModal;