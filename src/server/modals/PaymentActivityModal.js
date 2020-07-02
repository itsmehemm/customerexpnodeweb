const uniqid = require('uniqid');
const postalpincodeApi = require('../postalpincode');
const cache = require('../cache');
const mongoClient = require('../mongo/mongodb');
const {
    ORDER_PAYMENT,
    status
} = require('../lib/constants');
const { PAYMENT_ACTIVITY_MODAL } = require('../lib/constants/logging-constants');
const { COLLECTION } = require('../lib/constants/mongo-constants');
const { constructDeliveryObj } = require('../lib/utils');

class PaymentActivityModal {
    constructor(accountId) {
        this.account_id = accountId;
        this.transaction_type = null;
        this.transaction_id = null;
        this.order_id = null;
        this.status = null;
        this.personal_information = null;
        this.purchase_items = null;
        this.amount = null;
        this.billing_address = null;
        this.shipping_address = null;
        this.delivery = null;
        this.payment_information = null;
        this.time_stamp = null;
        this.data = null;
    }

    _getPurchaseItems(purchaseItems) {
        let result = [];
        purchaseItems.forEach(item => {
            const pitem = this._getPurchaseItem(item);
            if (pitem) {
                result.push(pitem);
            }
        });
        return result;
    }

    _getPurchaseItem(purchaseItem) {
        if (purchaseItem && purchaseItem.id) {
            return {
                id: purchaseItem.id,
                url: purchaseItem.url,
                theme_id: purchaseItem.theme_id,
                size: purchaseItem.size,
                color: purchaseItem.color,
                quantity: purchaseItem.quantity,
                picture_links: purchaseItem.picture_links,
                amount: purchaseItem.amount
            };
        }
        return null;
    }

    async buildWithOrderId(orderId) {
        const orderdata = JSON.parse(cache.get(orderId));
        if (orderdata) {
            this.order_id = orderId;
            this.transaction_type = ORDER_PAYMENT;
            this.personal_information = orderdata.personal_information;
            this.purchase_items = this._getPurchaseItems(orderdata.purchase_items);
            this.amount = orderdata.amount;
            this.billing_address = orderdata.billing_address;
            this.shipping_address = orderdata.shipping_address;
            this.payment_information = orderdata.payment_information;
        }

        if (this.shipping_address && this.shipping_address.pincode) {
            const address = await postalpincodeApi.load(this.shipping_address.pincode);
            if (address && !address.error && address.getPincode()) {
                const delivery = await postalpincodeApi.getDeliveryStatus(address);
                this.delivery = constructDeliveryObj({
                    state: address.getState(),
                    district: address.getDistrict(),
                    region: address.getRegion(),
                    place: address.getPlace(),
                    pincode: address.getPincode(),
                    status: delivery.status,
                    deliveryTime: delivery.deliveryTime
                });
            }
        }

        this.transaction_id = uniqid().toUpperCase();
        this.time_stamp = new Date().getTime();

        if (this.payment_information && this.payment_information.status) {
            this.status = this.payment_information.status;
        }

        this.data = {
            account_id: this.account_id,
            transaction_id: this.transaction_id,
            order_id: this.order_id,
            status: this.status,
            transaction_type: this.transaction_type,
            personal_information: this.personal_information,
            purchase_items: this.purchase_items,
            amount: this.amount,
            billing_address: this.billing_address,
            shipping_address: this.shipping_address,
            payment_information: this.payment_information,
            delivery: this.delivery,
            time_stamp: this.time_stamp
        };
    }

    async persist() {
        if (this.data) {
            return new Promise(resolve => {
                mongoClient.connection((db) => {
                    db
                        .collection(COLLECTION.PAY)
                        .insertOne(this.data)
                        .then(() => {
                            console.log(PAYMENT_ACTIVITY_MODAL, `added payment details to database: ${JSON.stringify(this.data)}`);
                            resolve({
                                status: status.COMPLETED
                            });
                        })
                        .catch((error) => {
                            console.log(PAYMENT_ACTIVITY_MODAL, `error adding payment details to database: ${JSON.stringify(error)}`);
                            resolve({
                                status: status.FAILURE
                            });
                        });
                });
            });
        }
        return {
            status: status.FAILURE
        };
    }

    async getActivityByTransactionId(transactionId) {
        if (!transactionId) {
            return null;
        }
        console.log(PAYMENT_ACTIVITY_MODAL, `getting payment details for transactionId: ${transactionId}`);
        return new Promise(resolve => {
            mongoClient.connection((db) => {
                db
                    .collection(COLLECTION.PAY)
                    .find({
                        account_id: this.account_id,
                        transaction_id: transactionId
                    })
                    .toArray()
                    .then((result) => {
                        if (Array.isArray(result) && result.length === 1) {
                            return resolve(result[0]);
                        }
                        console.log(PAYMENT_ACTIVITY_MODAL, `no transactions found with id: ${transactionId}`);
                        return resolve(null);
                    })
                    .catch((error) => {
                        console.log(PAYMENT_ACTIVITY_MODAL, `error getting payment details: ${JSON.stringify(error)}`);
                        resolve(null);
                    });
            });
        });
    }

    async getActivityByOrderId(orderId) {
        if (!orderId) {
            return null;
        }
        console.log(PAYMENT_ACTIVITY_MODAL, `getting payment details for orderId: ${orderId}`);
        return new Promise(resolve => {
            mongoClient.connection((db) => {
                db
                    .collection(COLLECTION.PAY)
                    .find({
                        account_id: this.account_id,
                        order_id: orderId
                    })
                    .then((result) => {
                        if (Array.isArray(result) && result.length === 1) {
                            return resolve(result[0]);
                        }
                        console.log(PAYMENT_ACTIVITY_MODAL, `no transactions found with id: ${orderId}`);
                        return resolve(null);
                    })
                    .catch((error) => {
                        console.log(PAYMENT_ACTIVITY_MODAL, `error getting payment details: ${JSON.stringify(error)}`);
                        resolve(null);
                    });
            });
        });
    }

    getTransactionId() { return this.transaction_id; }
};

module.exports = PaymentActivityModal;