class EditProductModal {
    constructor(data) {
        this.data = null;
        this.setData(data);
    }

    setData(d) {
        if (!d) return;
        this.data = {
            id: d.id,
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

    updateData(d) {
        let o = this.data;
        let data = {
            id: o.id,
            name: d.name || o.name,
            description: d.description || o.description,
            product_code: d.product_code || o.product_code,
            category_code: d.category_code || o.category_code,
            default_size: d.default_size || o.default_size,
            default_color: d.default_color || o.default_color,
            available_sizes: d.available_sizes || o.available_sizes,
            available_colors: d.available_colors || o.available_colors,
            discount: {
                type: (d.discount && d.discount.type) || (o.discount && o.discount.type),
                value: (d.discount && d.discount.value) || (o.discount && o.discount.value)
            },
            stock_quantity: d.stock_quantity || o.stock_quantity,
            cost: {
                amount: (d.cost && d.cost.amount) || (o.cost && o.cost.amount),
                currency: (d.cost && d.cost.currency) || (o.cost && o.cost.currency)
            },
            picture_links: d.picture_links || o.picture_links,
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

module.exports = EditProductModal;