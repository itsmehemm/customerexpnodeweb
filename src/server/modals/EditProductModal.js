const mongoClient = require('../mongo/mongodb');
const { COLLECTION, KEY } = require('../lib/constants/mongo-constants');

class EditProductModal {
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
            sub_category_code: d && d.sub_category_code,
            default_size: d.default_size,
            default_color: d.default_color,
            themes: d.themes,
            featured: d.featured,
            thirty_day_exchange: d.thirty_day_exchange,
            fifteen_day_exchange: d.fifteen_day_exchange,
            payment_options: d.payment_options,
            advanced_details: d.advanced_details
        }
    }

    getPictureLinks(d) {
        let picture_links = [];
        if (Array.isArray(d) && d.length > 0) {
            picture_links = d;
        }
        return picture_links;
    }

    getDiscount(d) {
        return {
            type: d && d.discount && d.discount.type,
            value: d && d.discount && d.discount.value
        };
    }

    getAmount(d) {
        return {
            maximum_retail_price: d && d.maximum_retail_price,
            discount: this.getDiscount(d),
            subtotal: d && d.subtotal,
            correction: d && d.correction,
            currency: d && d.currency
        };
    }

    getTheme(d) {
        return {
            size: d && d.size,
            color: d && d.color,
            picture_links: this.getPictureLinks(d && d.picture_links),
            amount: this.getAmount(d && d.amount),
            stock_quantity: d && d.stock_quantity
        };
    }

    getThemes(d) {
        if (!d || !d.themes || !Array.isArray(d.themes)) return null;
        let themes = [];
        d.themes.forEach(theme => {
            themes.push(this.getTheme(theme));
        });
        return themes;
    }

    updateThemes(o, d) {
        if (!d.themes) return o.themes;
        return this.getThemes(d);
    }

    updateData(d) {
        let o = this.data;
        let data = {
            id: o.id,
            url: o.url,
            name: d.name || o.name,
            description: d.description || o.description,
            product_code: d.product_code || o.product_code,
            category_code: d.category_code || o.category_code,
            sub_category_code: d.sub_category_code || o.sub_category_code,
            default_size: d.default_size || o.default_size,
            default_color: d.default_color || o.default_color,
            themes: this.updateThemes(o, d),
            featured: d.featured || o.featured,
            thirty_day_exchange: d.thirty_day_exchange || o.thirty_day_exchange,
            fifteen_day_exchange: d.fifteen_day_exchange || o.fifteen_day_exchange,
            payment_options: d.payment_options || o.payment_options,
            advanced_details: {
                type: (d.advanced_details && d.advanced_details.type) || (o.advanced_details && o.advanced_details.type),
                sleeve: (d.advanced_details && d.advanced_details.sleeve) || (o.advanced_details && o.advanced_details.sleeve),
                fit: (d.advanced_details && d.advanced_details.fit) || (o.advanced_details && o.advanced_details.fit),
                fabric: (d.advanced_details && d.advanced_details.fabric) || (o.advanced_details && o.advanced_details.fabric),
                pack_size: (d.advanced_details && d.advanced_details.pack_size) || (o.advanced_details && o.advanced_details.pack_size),
                neck_type: (d.advanced_details && d.advanced_details.neck_type) || (o.advanced_details && o.advanced_details.neck_type),
                ideal_gender: (d.advanced_details && d.advanced_details.ideal_gender) || (o.advanced_details && o.advanced_details.ideal_gender),
                occasion: (d.advanced_details && d.advanced_details.occasion) || (o.advanced_details && o.advanced_details.occasion),
                brand_color: (d.advanced_details && d.advanced_details.brand_color) || (o.advanced_details && o.advanced_details.brand_color),
                fabric_care: (d.advanced_details && d.advanced_details.fabric_care) || (o.advanced_details && o.advanced_details.fabric_care),
                brand_fit: (d.advanced_details && d.advanced_details.brand_fit) || (o.advanced_details && o.advanced_details.brand_fit),
            }
        };
        this.data = data;
    }

    validate() {
        if (!this.data.id ||
            !this.data.name ||
            !this.data.product_code ||
            !this.data.category_code ||
            !this.data.sub_category_code) {
            return false;
        }
        return true;
    }

    getData() { return this.data }
};

module.exports = EditProductModal;