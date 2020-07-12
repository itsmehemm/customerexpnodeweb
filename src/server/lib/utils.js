const args = require('yargs').argv;
const config = require('../lib/config.json');
const {
    ENVIRONMENT_PRODUCTION,
    API_NAME,
    WEB_NAME,
    GUEST
} = require('../lib/constants')
const environment = args.env || ENVIRONMENT_PRODUCTION;
const webPermissions = require('./permissions/web.json');

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

const constructDeliveryString = (time) => {
    if (time) {
        time = parseInt(time);
        time = Math.ceil(time / (3600 * 24));
        return `Confirmed delivery in ${time} days`
    }
    return null;
}

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
            delivery_time: delivery.deliveryTime,
            formatted: {
                delivery_string: constructDeliveryString(delivery.deliveryTime)
            }
        };
    }
    return null;
}

const isAPIRequest = (req) => {
    if (req && req.url) {
        const url = req.url;
        return /^\/api\/.*$/.test(url);
    }
    return false;
};

const isGuestRequestAllowed = (req) => {
    const webName = getWebName(req);
    console.log('checkUserWebPermission', `web: ${webName}`);
    const web = webPermissions[webName];
    if (web && Array.isArray(web.permissions)) {
        console.log('checkUserWebPermission', `available permissions: ${web.permissions}`);
        if (web.permissions.includes(GUEST)) {
            return true;
        }
        return false;
    }
    return false;
};

const checkUserWebPermission = (req) => {
    const webName = getWebName(req);
    console.log('checkUserWebPermission', `web resource: ${webName}`);
    const web = webPermissions[webName];
    if (web && Array.isArray(web.permissions)) {
        console.log('checkUserWebPermission', `available permissions: ${web.permissions}`);
        const accountType = req && req.user && req.user.accountType;
        console.log('checkUserWebPermission', `accountType: ${accountType}`);
        if (web.permissions.includes(accountType)) {
            return true;
        }
        return false;
    }
    return false;
};

const getWebName = (req) => {
    const url = req.url;
    if (!url) return null;
    if (/^\/$/.test(url)) {
        return WEB_NAME.HOME;
    }
    if (/^\/product\/.*$/.test(url)) {
        return WEB_NAME.GET_PRODUCT;
    }
    if (/^\/whoami$/.test(url)) {
        return WEB_NAME.WHOAMI;
    }
    if (/^\/home$/.test(url)) {
        return WEB_NAME.HOME;
    }
    if (/^\/about$/.test(url)) {
        return WEB_NAME.ABOUT;
    }
    if (/^\/products$/.test(url)) {
        return WEB_NAME.GET_PRODUCTS;
    }
    if (/^\/help$/.test(url)) {
        return WEB_NAME.HELP;
    }
    if (/^\/contactus$/.test(url)) {
        return WEB_NAME.CONTACTUS;
    }
    if (/^\/instant-purchase\/payment\/.*$/.test(url)) {
        return WEB_NAME.INSTANT_PURCHASE_PAYMENT;
    }
    if (/^\/instant-purchase\/complete\/.*$/.test(url)) {
        return WEB_NAME.INSTANT_PURCHASE_CONFIRMATION;
    }
    if (/^\/instant-purchase\/.*$/.test(url)) {
        return WEB_NAME.INSTANT_PURCHASE_ORDER;
    }
    if (/^\/activity\/payment\/.*$/.test(url)) {
        return WEB_NAME.GET_PAYMENT_ACTIVITY;
    }
    if (/^\/business\/logger\/idsearch.*$/.test(url)) {
        return WEB_NAME.IDSEARCH;
    }
    if (/^\/business$/.test(url)) {
        return WEB_NAME.BUSINESS_DASHBOARD;
    }
    if (/^\/notfound$/.test(url)) {
        return WEB_NAME.NOT_FOUND;
    }
    if (/^\/login.*$/.test(url)) {
        return WEB_NAME.LOGIN;
    }
    if (/^\/business\/activity\/transactions$/.test(url)) {
        return WEB_NAME.BUSINESS_ACTIVITY;
    }
    if (/^\/business\/activity\/transaction\/.*$/.test(url)) {
        return WEB_NAME.BUSINESS_ACTIVITY;
    }
    if (/^\/business\/warehouse\/products$/.test(url)) {
        return WEB_NAME.BUSINESS_VIEW_PRODUCTS;
    }
    if (/^\/business\/warehouse\/product\/add$/.test(url)) {
        return WEB_NAME.BUSINESS_ADD_PRODUCT;
    }
    if (/^\/business\/warehouse\/product\/edit\/.*$/.test(url)) {
        return WEB_NAME.BUSINESS_UPDATE_PRODUCT;
    }
    if (/^\/business\/warehouse\/product\/view\/.*$/.test(url)) {
        return WEB_NAME.BUSINESS_VIEW_PRODUCT;
    }
    return null;
};

const getAPIName = (req) => {
    const url = req.url;
    const method = req.method;
    if (!url) return null;
    if (/^\/products$/.test(url)) {
        return API_NAME.GET_PRODUCTS;
    }
    if (/^\/products\/featured/.test(url)) {
        return API_NAME.GET_FEATURED_PRODUCTS;
    }
    if (/^\/products\/filter$/.test(url)) {
        return API_NAME.GET_FILTERED_PRODUCTS;
    }
    if (/^\/products\/category\/.*$/.test(url)) {
        return API_NAME.GET_PRODUCTS_BY_CATEGORY;
    }
    if (/^\/product\/add$/.test(url)) {
        return API_NAME.ADD_PRODUCT;
    }
    if (/^\/product\/.*\/update$/.test(url)) {
        return API_NAME.EDIT_PRODUCT_BY_ID;
    }
    if (/^\/product\/.*\/remove$/.test(url)) {
        return API_NAME.REMOVE_PRODUCT_BY_ID;
    }
    if (/^\/product\/.*$/.test(url)) {
        return API_NAME.GET_PRODUCT_BY_ID;
    }
    if (/^\/create\/order$/.test(url)) {
        return API_NAME.CREATE_INSTANT_ORDER;
    }
    if (/^\/order\/.*$/.test(url) && method === 'GET') {
        return API_NAME.GET_ORDER_BY_ID;
    }
    if (/^\/order\/.*$/.test(url) && method === 'PATCH') {
        return API_NAME.PATCH_ORDER_BY_ID;
    }
    if (/^\/instant-purchase\/.*\/payment\/plan$/.test(url)) {
        return API_NAME.GET_PAYMENT_PLAN;
    }
    if (/^\/instant-purchase\/.*\/payment\/razorpay$/.test(url)) {
        return API_NAME.RAZORPAY_PAYMENT_COMPLETE;
    }
    if (/^\/delivery\/update\/pincode$/.test(url)) {
        return API_NAME.UPDATE_DELIVERY_PINCODE;
    }
    if (/^\/activity\/payment\/.*$/.test(url)) {
        return API_NAME.GET_PAYMENT_ACTIVITY;
    }
    if (/^\/activity\/search\/transactions$/.test(url)) {
        return API_NAME.SEARCH_TRANSACTIONS;
    }
    if (/^\/business\/activity\/payment\/.*$/.test(url)) {
        return API_NAME.GET_PAYMENT_ACTIVITY_INTERNAL;
    }
    if (/^\/business\/products\/filter$/.test(url)) {
        return API_NAME.BUSINESS_PRODUCT_FILTER;
    }
    if (/^\/business\/kpis$/.test(url)) {
        return API_NAME.GET_KPIS;
    }
    if (/^\/log\/.*$/.test(url)) {
        return API_NAME.GET_LOGS;
    }
    return null;
};

const computeRedirectErrorUrl = () => {
    let redirectErrorUrl = config.tinnat[environment].url.redirect_error;
    return encodeURIComponent(redirectErrorUrl);
};

const computeRedirectSuccessUrl = (path) => {
    let redirectBaseUrl = config.tinnat[environment].url.redirect_base;
    redirectBaseUrl += path;
    return encodeURIComponent(redirectBaseUrl);
};

const getDefaultRedirectUrl = () => {
    return config.tinnat[environment].url.redirect_base;
};

module.exports = {
    getProductUrl: getProductUrl,
    constructProductLink: constructProductLink,
    getDefaultThemeObj: getDefaultThemeObj,
    getFormattedProductInfo: getFormattedProductInfo,
    constructDeliveryObj: constructDeliveryObj,
    isAPIRequest: isAPIRequest,
    isGuestRequestAllowed: isGuestRequestAllowed,
    getAPIName: getAPIName,
    checkUserWebPermission: checkUserWebPermission,
    computeRedirectSuccessUrl: computeRedirectSuccessUrl,
    computeRedirectErrorUrl: computeRedirectErrorUrl,
    getDefaultRedirectUrl: getDefaultRedirectUrl
};