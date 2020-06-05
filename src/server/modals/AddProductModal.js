const uniqid = require('uniqid');
const args = require('yargs').argv;
const config = require('../lib/config.json');
const { ENVIRONMENT_PRODUCTION } = require('../lib/constants')
const environment = args.env || ENVIRONMENT_PRODUCTION;

class AddProductModal {
    constructor(d) {
        this.data = null;
        if (d) {
            this.setData(d);
        }
    }

    getAvailableSizes(d) {
        let available_sizes = [];
        if (Array.isArray(d) && d.length > 0) {
            available_sizes = d;
        }
        return available_sizes;
    }

    getPictureLinks(d) {
        let picture_links = [];
        if (Array.isArray(d) && d.length > 0) {
            picture_links = d;
        }
        return picture_links;
    }

    getAvailableColors(d) {
        let available_colors = [];
        if (Array.isArray(d) && d.length > 0) {
            d.forEach(c => available_colors.push({
                color: c.color,
                picture_links: this.getPictureLinks(c.picture_links)
            }));
        }
        return available_colors;
    }

    getDiscount(d) {
        return {
            type: d && d.discount && d.discount.type,
            value: d && d.discount && d.discount.value
        };
    }

    getCost(d) {
        return {
            amount: d && d.cost && d.cost.amount,
            currency: d && d.cost && d.cost.currency
        };
    }

    getPaymentOptions(d) {
        let payment_options = [];
        if (Array.isArray(d) && d.length > 0) {
            payment_options = d;
        }
        return payment_options;
    }

    getAdvancedDetails(d) {
        return {
            type: d && d.advanced_details && d.advanced_details.type,
            sleeve: d.advanced_details && d.advanced_details.sleeve,
            fit: d.advanced_details && d.advanced_details.fit,
            fabric: d.advanced_details && d.advanced_details.fabric,
            pack_size: d.advanced_details && d.advanced_details.pack_size,
            neck_type: d.advanced_details && d.advanced_details.neck_type,
            ideal_gender: d.advanced_details && d.advanced_details.ideal_gender,
            occasion: d.advanced_details && d.advanced_details.occasion,
            brand_color: d.advanced_details && d.advanced_details.brand_color,
            fabric_care: d.advanced_details && d.advanced_details.fabric_care,
            brand_fit: d.advanced_details && d.advanced_details.brand_fit,
        };
    }

    getProductUrl(id) {
        let url = config.tinnat[environment].url.v1_get_product_by_id;
        url = url.replace('${productid}', id);
        return url;
    }

    setData(d) {
        const id = `${(d && d.name || "").replace(new RegExp(' ', 'g'), '-')}-${uniqid().toUpperCase()}`;
        this.data = {
            id: id,
            url: this.getProductUrl(id),
            name: d && d.name,
            description: d && d.description,
            product_code: d && d.product_code,
            category_code: d && d.category_code,
            default_size: d && d.default_size,
            default_color: d && d.default_color,
            available_sizes: this.getAvailableSizes(d && d.available_sizes),
            available_colors: this.getAvailableColors(d && d.available_colors),
            discount: this.getDiscount(d),
            stock_quantity: d && d.stock_quantity,
            cost: this.getCost(d),
            picture_links: this.getPictureLinks(d && d.picture_links),
            featured: d && d.featured,
            thirty_day_exchange: d && d.thirty_day_exchange,
            fifteen_day_exchange: d && d.fifteen_day_exchange,
            payment_options: this.getPaymentOptions(d && d.payment_options),
            advanced_details: this.getAdvancedDetails(d)
        };
    }

    validate() {
        if (!this.data.id ||
            !this.data.name ||
            !this.data.product_code ||
            !this.data.category_code ||
            !this.data.default_color ||
            !this.data.default_size ||
            !this.data.cost.amount ||
            !this.data.cost.currency) {
            return false;
        }
        return true;
    }

    getData() { return this.data }
};

module.exports = AddProductModal;