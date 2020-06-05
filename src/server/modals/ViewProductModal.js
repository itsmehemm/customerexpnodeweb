const mongoClient = require('../mongo/mongodb');
const { COLLECTION, KEY } = require('../lib/constants/mongo-constants');

class ViewProductModal {
    constructor() {
        this.data = null;
    }

    async getProduct(id) {
        if (!id) return;
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
        this.setData(product);
        return;
    }

    setData(d) {
        if (!d) return;
        this.data = {
            id: d.id,
            url: d.url,
            name: d.name,
            description: d.description,
            product_code: d.product_code,
            category_code: d.category_code,
            default_size: d.default_size,
            default_color: d.default_color,
            available_sizes: d.available_sizes,
            available_colors: d.available_colors,
            discount: d.discount,
            stock_quantity: d.stock_quantity,
            cost: d.cost,
            picture_links: d.picture_links,
            featured: d.featured,
            thirty_day_exchange: d.thirty_day_exchange,
            fifteen_day_exchange: d.fifteen_day_exchange,
            payment_options: d.payment_options,
            advanced_details: d.advanced_details
        }
    }

    getData() { return this.data }
};

module.exports = ViewProductModal;