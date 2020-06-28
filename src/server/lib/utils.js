const args = require('yargs').argv;
const config = require('../lib/config.json');
const { ENVIRONMENT_PRODUCTION } = require('../lib/constants')
const environment = args.env || ENVIRONMENT_PRODUCTION;

const getProductUrl = (id) => {
    let url = config.tinnat[environment].url.v1_get_product_by_id;
    url = url.replace('${productid}', id);
    return url;
};

const constructProductLink = (id) => {
    let url = config.tinnat[environment].url.v1_get_product_by_id;
    url = url.replace('${productid}', id);
    return url;
};

const getDefaultThemeObj = (product) => {
    if (!product || !Array.isArray(product.themes) || product.themes.length === 0) {
        return null;
    }
    let theme = product.themes[0];
    product.themes.forEach(t => {
        if (t.size === product.default_size && t.color === product.default_color) {
            theme = t;
        }
    });
    return theme;
};

const getFormattedProductInfo = (product) => {
    let availableSizes = new Set();
    let availableColors = new Set();
    if (product && Array.isArray(product.themes)) {
        product.themes.forEach(theme => {
            availableSizes.add(theme.size);
            availableColors.add(theme.color);
        });
    }
    return {
        available_sizes: Array.from(availableSizes),
        available_colors: Array.from(availableColors),
        available_sizes_string: Array.from(availableSizes).join(', ')
    }
};

const constructDeliveryObj = (delivery) => {
    if (delivery && delivery.pincode) {
        return {
            status: delivery.status,
            address: {
                place: delivery.place,
                region: delivery.region,
                district: delivery.district,
                state: delivery.state,
                pincode: delivery.pincode
            },
            delivery_time: delivery.deliveryTime
        };
    }
    return null;
}

module.exports = {
    getProductUrl: getProductUrl,
    constructProductLink: constructProductLink,
    getDefaultThemeObj: getDefaultThemeObj,
    getFormattedProductInfo: getFormattedProductInfo,
    constructDeliveryObj: constructDeliveryObj
};