const mongoClient = require('../mongo/mongodb');
const { COLLECTION, KEY } = require('../lib/constants/mongo-constants');
const {
    constructProductLink,
    getDefaultThemeObj,
    getFormattedProductInfo
} = require('../lib/utils');

class ViewProductModal {
    constructor() {
        this.data = null;
    }

    buildWithProduct(product) {
        if (product) {
            let data = {};
            data.id = product.id;
            data.name = product.name;
            data.description = product.description;
            data.product_code = product.product_code;
            data.category_code = product.category_code;
            data.sub_category_code = product.sub_category_code;
            data.default_theme = getDefaultThemeObj(product);
            data.themes = product.themes;
            data.advanced_details = product.advanced_details;
            data.featured = product.featured;
            data.active = product.active;
            data.fifteen_day_exchange = product.fifteen_day_exchange;
            data.thirty_day_exchange = product.thirty_day_exchange;
            data.payment_options = product.payment_options;
            data.url = constructProductLink(product.id);
            data.formatted = getFormattedProductInfo(product);
            this.setData(data);
        } else {
            console.error('ViewProductModal::buildWithProduct', `product not found`);
            this.setData(null);
        }
    }

    async build(id) {
        if (!id) {
            console.error('ViewProductModal::build', `no id received`);
            return;
        };
        const product = await new Promise((resolve) => {
            mongoClient.connection(db => {
                db.
                    collection(COLLECTION.PRODUCT)
                    .find({
                        [KEY.PRODUCT_ID]: id
                    })
                    .toArray()
                    .then(result => {
                        if (Array.isArray(result) && result.length === 1) {
                            return resolve(result[0]);
                        }
                        return resolve(null);
                    })
                    .catch(() => resolve(null))
            })
        });
        if (product) {
            this.buildWithProduct(product);
        } else {
            console.error('ViewProductModal::build', `product not found with id=${id}`);
            this.setData(null);
        }
        return;
    }

    setData(d) { this.data = d }

    getData() { return this.data }
};

module.exports = ViewProductModal;