const uniqid = require('uniqid');
const cache = require('../cache');
const mongoClient = require('../mongo/mongodb');
const ViewProductModal = require('../modals/ViewProductModal');
const { COLLECTION, KEY } = require('../lib/constants/mongo-constants');
const { ORDER_LIFE_TIME } = require('../lib/constants');

class OrderModal {
    constructor() {
        this.id = null;
        this.purchaseItems = [];
        this.cost = null;
        this.personalInformation = null;
        this.billingAddress = null;
        this.shippingAddress = null;
        this.data = null;
    }

    async addPurchaseItem(item) {
        const product = await (new Promise((resolve) => {
            mongoClient.connection(db => {
                db.
                    collection(COLLECTION.PRODUCT)
                    .find({
                        [KEY.PRODUCT_ID]: item.id
                    })
                    .toArray()
                    .then(result => {
                        if (Array.isArray(result) && result.length === 1) {
                            const viewProductModal = new ViewProductModal();
                            viewProductModal.setData(result[0]);
                            return resolve(viewProductModal.getData());
                        }
                        return resolve(new ViewProductModal().getData());
                    }).catch(error => {
                        return resolve(new ViewProductModal().getData());
                    });
            })
        }));
        if (!product) {
            return false;
        }
        this.purchaseItems.push({
            id: item.id,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            product_details: {
                ...product
            }
        });
        return true;
    }

    async createOrder() {
        let data = {};
        let amount = 0;
        this.purchaseItems.forEach(item => {
            amount += parseInt(item.product_details.cost.amount);
        });
        data.cost = {
            amount: amount,
            currency: 'INR'
        };
        data.id = uniqid('ORDER-').toUpperCase();
        data.purchase_items = this.purchaseItems;
        await cache.put(data.id, JSON.stringify(data), ORDER_LIFE_TIME);
        console.log('ORDER_MODAL', 'order detail persisted:', cache.get(data.id));
        this.data = data;
    }

    async updateOrder(d) {
        const { personal_information, billing_address, shipping_address } = d;
        this.personalInformation = {
            email: (personal_information && personal_information.email) || (this.personalInformation && this.personalInformation.email),
            phone_number: (personal_information && personal_information.phone_number) || (this.personalInformation && this.personalInformation.phone_number)
        };
        this.billingAddress = {
            name: (billing_address && billing_address.name) || (this.billingAddress && this.billingAddress.name),
            address_line_1: (billing_address && billing_address.address_line_1) || (this.billingAddress && this.billingAddress.address_line_1),
            address_line_2: (billing_address && billing_address.address_line_2) || (this.billingAddress && this.billingAddress.address_line_2),
            city: (billing_address && billing_address.city) || (this.billingAddress && this.billingAddress.city),
            pincode: (billing_address && billing_address.pincode) || (this.billingAddress && this.billingAddress.pincode),
            state: (billing_address && billing_address.state) || (this.billingAddress && this.billingAddress.state),
            landmark: (billing_address && billing_address.landmark) || (this.billingAddress && this.billingAddress.landmark),
        };
        if (shipping_address && shipping_address.shipping_same_as_billing) {
            this.shippingAddress = {
                shipping_same_as_billing: true,
                name: (billing_address && billing_address.name) || (this.billingAddress && this.billingAddress.name),
                address_line_1: (billing_address && billing_address.address_line_1) || (this.billingAddress && this.billingAddress.address_line_1),
                address_line_2: (billing_address && billing_address.address_line_2) || (this.billingAddress && this.billingAddress.address_line_2),
                city: (billing_address && billing_address.city) || (this.billingAddress && this.billingAddress.city),
                pincode: (billing_address && billing_address.pincode) || (this.billingAddress && this.billingAddress.pincode),
                state: (billing_address && billing_address.state) || (this.billingAddress && this.billingAddress.state),
                landmark: (billing_address && billing_address.landmark) || (this.billingAddress && this.billingAddress.landmark),
            };
        } else {
            this.shippingAddress = {
                shipping_same_as_billing: false,
                name: (shipping_address && shipping_address.name) || (this.shippingAddress && this.shippingAddress.name),
                address_line_1: (shipping_address && shipping_address.address_line_1) || (this.shippingAddress && this.shippingAddress.address_line_1),
                address_line_2: (shipping_address && shipping_address.address_line_2) || (this.shippingAddress && this.shippingAddress.address_line_2),
                city: (shipping_address && shipping_address.city) || (this.shippingAddress && this.shippingAddress.city),
                pincode: (shipping_address && shipping_address.pincode) || (this.shippingAddress && this.shippingAddress.pincode),
                state: (shipping_address && shipping_address.state) || (this.shippingAddress && this.shippingAddress.state),
                landmark: (shipping_address && shipping_address.landmark) || (this.shippingAddress && this.shippingAddress.landmark),
            };
        }
        this.data = {
            ...this.data,
            personal_information: this.personalInformation,
            billing_address: this.billingAddress,
            shipping_address: this.shippingAddress
        }
        await cache.put(this.data.id, JSON.stringify(this.data), ORDER_LIFE_TIME);
        console.log('ORDER_MODAL', 'order detail patched:', cache.get(this.data.id));
    }

    getOrderDetails(id) {
        console.log('ORDER_MODAL', 'retrive order details from cache for id: ', id);
        const data = JSON.parse(cache.get(id) || '{}');
        this.id = data.id;
        this.purchaseItems = data.purchase_tems;
        this.cost = data.cost;
        this.personalInformation = data.personal_information;
        this.billingAddress = data.billing_address;
        this.shippingAddress = data.shipping_address;
        this.data = data;
        return data;
    }

    getOrderId() { return this.data && this.data.id }
};

module.exports = OrderModal;