const { constructProductLink } = require('../lib/utils');

class ThemeAsProductModal {
    constructor(product) {
        this.product = product;
        this.themeproducts = [];
        this.mapThemesToProducts();
    }

    mapThemesToProducts() {
        if (!this.product ||
            !this.product.id ||
            !this.product.themes ||
            !Array.isArray(this.product.themes) ||
            this.product.themes.length === 0) {
            console.log('THEME_AS_PRODUCT_MODAL', 'failed to build theme as product');
            return;
        }
        const { themes } = this.product;
        let themeproducts = [];
        themes.forEach(theme => {
            let data = {};
            data.id = this.product.id;
            data.name = this.product.name;
            data.description = this.product.description;
            data.product_code = this.product.product_code;
            data.category_code = this.product.category_code;
            data.sub_category_code = this.product.sub_category_code;
            data.category_code = this.product.category_code;
            data.themeid = theme.id;
            data.size = theme.size;
            data.color = theme.color;
            data.picture_links = theme.picture_links;
            data.amount = theme.amount;
            data.stock_quantity = theme.stock_quantity;
            data.advanced_details = this.product.advanced_details;
            data.featured = this.product.featured;
            data.active = this.product.active && theme.active;
            data.fifteen_day_exchange = this.product.fifteen_day_exchange;
            data.thirty_day_exchange = this.product.thirty_day_exchange;
            data.payment_options = this.product.payment_options;
            data.url = constructProductLink(this.product.id);
            themeproducts.push(data);
        });

        this.themeproducts = themeproducts;
        return;
    }

    getProducts() {
        return this.themeproducts;
    }
}

module.exports = ThemeAsProductModal;