const uniqid = require('uniqid');
const { getProductUrl } = require('../lib/utils');

class AddProductModal {
    constructor(d) {
        this.data = null;
        if (d) {
            this.setData(d);
        }
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
            id: uniqid('T-').toUpperCase(),
            size: d && d.size,
            color: d && d.color,
            picture_links: this.getPictureLinks(d && d.picture_links),
            amount: this.getAmount(d && d.amount),
            stock_quantity: d && d.stock_quantity,
            active: d && d.active,
        };
    }

    getThemes(d) {
        if (!d || !d.themes || !Array.isArray(d.themes)) return [];
        let themes = [];
        d.themes.forEach(theme => {
            themes.push(this.getTheme(theme));
        });
        return themes;
    }

    getDefaultTheme(themes, default_size, default_color) {
        if (themes.length === 0) return null;
        let defaultTheme = {};
        themes.forEach(theme => {
            if (theme.color === default_color && theme.size === default_size)
                defaultTheme = theme;
        });
        return defaultTheme.id || null;
    }

    setData(d) {
        const id = `${(d && d.name || "").replace(new RegExp(' ', 'g'), '-')}-${uniqid().toUpperCase()}`;
        let data = {
            id: id,
            url: getProductUrl(id),
            name: d && d.name,
            description: d && d.description,
            product_code: d && d.product_code,
            category_code: d && d.category_code,
            sub_category_code: d && d.sub_category_code,
            default_size: d && d.default_size,
            default_color: d && d.default_color,
            themes: this.getThemes(d),
            featured: d && d.featured,
            active: d && d.active,
            thirty_day_exchange: d && d.thirty_day_exchange,
            fifteen_day_exchange: d && d.fifteen_day_exchange,
            payment_options: this.getPaymentOptions(d && d.payment_options),
            advanced_details: this.getAdvancedDetails(d)
        };
        data.default_theme_id = this.getDefaultTheme(data.themes, data.default_size, data.default_color)
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

module.exports = AddProductModal;