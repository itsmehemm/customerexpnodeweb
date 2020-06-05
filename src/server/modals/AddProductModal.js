const uniqid = require('uniqid');

class AddProductModal {
    constructor() {
        this.data = null;
    }

    setData(d) {
        this.data = {
            id: `${d.name.replace(new RegExp(' ', 'g'), '-')}-${uniqid().toUpperCase()}`,
            name: d.name,
            description: d.description,
            product_code: d.product_code,
            category_code: d.category_code,
            default_size: d.default_size,
            default_color: d.default_color,
            available_sizes: d.available_sizes,
            available_colors: d.available_colors,
            discount: {
                type: d.discount && d.discount.type,
                value: d.discount && d.discount.value
            },
            stock_quantity: d.stock_quantity,
            cost: {
                amount: d.cost && d.cost.amount,
                currency: d.cost && d.cost.currency
            },
            picture_links: d.picture_links,
            featured: d.featured,
            thirty_day_exchange: d.thirty_day_exchange,
            fifteen_day_exchange: d.fifteen_day_exchange,
            payment_options: d.payment_options,
            advanced_details: {
                type: d.advanced_details && d.advanced_details.type,
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
            }
        }
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