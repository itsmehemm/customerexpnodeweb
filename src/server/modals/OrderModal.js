const uniqid = require('uniqid');
const cache = require('../cache');
const mongoClient = require('../mongo/mongodb');
const ViewProductModal = require('../modals/ViewProductModal');
const { COLLECTION, KEY } = require('../lib/constants/mongo-constants');
const { ORDER_LIFE_TIME } = require('../lib/constants');

class OrderModal {
    constructor() {
        this.purchaseItems = [];
        this.orderDetails = null;
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
        let orderDetails = {};
        let amount = 0;
        this.purchaseItems.forEach(item => {
            amount += parseInt(item.product_details.cost.amount);
        });
        orderDetails.cost = {
            amount: amount,
            currency: 'INR'
        };
        orderDetails.id = uniqid('ORDER-').toUpperCase();
        orderDetails.purchase_items = this.purchaseItems;
        await cache.put(orderDetails.id, JSON.stringify(orderDetails), ORDER_LIFE_TIME);
        console.log('ORDER_MODAL', 'order detail persisted:', cache.get(orderDetails.id));
        this.orderDetails = orderDetails;
    }

    getOrderDetails(id) {
        console.log('ORDER_MODAL', 'retrive order details from cache for id: ', id);
        const orderDetails = JSON.parse(cache.get(id) || '{}');
        return orderDetails;
    }

    getOrderId() { return this.orderDetails && this.orderDetails.id }
};

module.exports = OrderModal;