const uniqid = require('uniqid');
const cache = require('../cache');
const mongoClient = require('../mongo/mongodb');
const { COLLECTION, KEY } = require('../lib/constants/mongo-constants');
const { ORDER_LIFE_TIME } = require('../lib/constants');
const { getProductUrl } = require('../lib/utils');

class InstantPurchaseModal {
    constructor() {
        this.id = null;
        this.personal_information = null;
        this.purchase_items = [];
        this.cost = null;
        this.billing_address = null;
        this.shipping_address = null;
        this.data = null;
    }

    async create(d) {
        this.id = uniqid('ORDER-').toUpperCase();
        this.personal_information = this.getPersonalInformation(d);
        this.purchase_items = await this.getPurchaseItems(d);
        if (this.purchase_items.length == 0) {
            return null;
        }
        this.cost = this.getCost(this.purchase_items);
        this.billing_address = this.getBillingAddress(d);
        this.shipping_address = this.getShippingAddress(d);
        this.data = {
            personal_information: this.personal_information,
            purchase_items: this.purchase_items,
            cost: this.cost,
            billing_address: this.billing_address,
            shipping_address: this.shipping_address
        };
        await cache.put(this.id, JSON.stringify(this.data), ORDER_LIFE_TIME);
        console.log('ORDER_MODAL', 'order detail persisted:', cache.get(this.id));
        return this.id;
    }

    async patch(d) {
        if (!d || !d.id) return null;
        const data = JSON.parse(cache.get(d.id));
        if (!data) return null;
        this.id = d.id;
        this.data = data;
        this.personal_information = data.personal_information;
        this.purchase_items = data.purchase_items;
        this.cost = data.cost;
        this.billing_address = data.billing_address;
        this.shipping_address = data.shipping_address;
        const { personal_information, billing_address, shipping_address } = d;
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
        this.data = {
            ...this.data,
            personal_information: this.personal_information,
            billing_address: this.billing_address,
            shipping_address: this.shipping_address
        };
        await cache.put(this.id, JSON.stringify(this.data), ORDER_LIFE_TIME);
        console.log('ORDER_MODAL', 'order detail patched:', cache.get(this.id));
        return this.id;
    }

    get(id) {
        console.log('ORDER_MODAL', 'retrive order details from cache for id: ', id);
        const data = JSON.parse(cache.get(id));
        if (!data) return null;
        this.id = id;
        this.data = data;
        this.personal_information = data.personal_information;
        this.purchase_items = data.purchase_items;
        this.cost = data.cost;
        this.billing_address = data.billing_address;
        this.shipping_address = data.shipping_address;
        console.log('ORDER_MODAL', 'order details fetched from cache: ', JSON.stringify(this.data));
        return this.data;
    }

    getPersonalInformation(d) {
        return {
            email: d && d.personal_information && d.personal_information.email,
            phone_number: d && d.personal_information && d.personal_information.phone_number
        };
    }

    getPictureLinks(data, key, value) {
        if (!data || !Array.isArray(data)) return [];
        let picture_links = [];
        data.forEach(d => {
            if (d[key] === value) {
                picture_links = d.picture_links
            }
        });
        return picture_links;
    }

    async getPurchaseItems(d) {
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
                purchase_items.push({
                    id: product.id,
                    url: getProductUrl(product.id),
                    size: item.size,
                    color: item.color,
                    quantity: item.quantity,
                    data: {
                        name: product.name,
                        description: product.description,
                        product_code: product.product_code,
                        category_code: product.category_code,
                        picture_links: this.getPictureLinks(product.available_colors, 'color', item.color),
                        cost: product.cost,
                        discount: product.discount,
                        thirty_day_exchange: product.thirty_day_exchange,
                        fifteen_day_exchange: product.fifteen_day_exchange,
                        payment_options: product.payment_options
                    }
                });
            }
        }
        return purchase_items;
    }

    getCost(d) {
        if (!d || !Array.isArray(d)) return null;
        let amount = 0;
        d.forEach(item => {
            let discountType = item.data.discount.type;
            let discountValue = item.data.discount.value;
            if (discountType === 'INSTANT_AMOUNT') {
                amount = amount + (parseInt(item.data.cost.amount) - parseInt(discountValue));
            } else if (discountType === 'INSTANT_PERCENTAGE') {
                amount = amount + (parseInt(item.data.cost.amount) - (parseInt(item.data.cost.amount) * parseInt(discountValue) / 100));
            } else {
                amount += parseInt(item.data.cost.amount);
            }
        });
        return {
            amount: amount,
            currency: 'INR'
        };
    }

    getBillingAddress(d) {
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

    getShippingAddress(d) {
        if (!d || !d.shipping_address) return null;
        if (d.shipping_address.shipping_same_as_billing) {
            return {
                shipping_same_as_billing: true,
                ...this.getBillingAddress(d)
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

    buildPayPalRequest() {
        const { personal_information, cost, purchase_items, billing_address, shipping_address } = this.data;
        return {
            intent: 'CAPTURE',
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
                    country_code: 'IN'
                }
            },
            purchase_units: [{
                reference_id: this.id,
                description: purchase_items[0].data.description,
                custom_id: purchase_items[0].data.product_code,
                soft_descriptor: 'TINNAT_INC',
                amount: {
                    currency_code: 'INR',
                    value: cost.amount,
                    breakdown: {
                        item_total: {
                            currency_code: 'INR',
                            value: cost.amount,
                        },
                        tax_total: {
                            currency_code: 'INR',
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
                        country_code: 'IN'
                    }
                }
            }]
        };
    }

    getOrderId() { return this.id }

    getOrder() { return this.data }
};

module.exports = InstantPurchaseModal;