const uniqid = require('uniqid');

const addProductObj = (data) => {
    return ({
        id: `${data.name.replace(new RegExp(' ', 'g'), '-')}-${uniqid().toUpperCase()}`,
        name: data.name,
        description: data.description,
        product_code: data.product_code || 'CODE_MISC',
        category_code: data.category_code || 'CATEGORY_MISC',
        default_size: data.default_size,
        default_color: data.default_color,
        available_sizes: data.available_sizes,
        available_colors: data.available_colors,
        discount: {
            type: data.discount && data.discount.type || 'NO_DISCOUNT',
            value: data.discount && data.discount.value || 0
        },
        stock_quantity: data.stock_quantity || 'UNLIMITED',
        cost: {
            amount: data.cost && data.cost.amount || 0,
            currency: data.cost && data.cost.currency || 'INR'
        },
        picture_links: data.picture_links || [],
        featured: data.featured || false,
        thirty_day_exchange: data.thirty_day_exchange || false,
        fifteen_day_exchange: data.fifteen_day_exchange || false,
        payment_options: {
            cash_on_delivery: data.payment_options && data.payment_options.cash_on_delivery,
            credit_card: data.payment_options && data.payment_options.credit_card
        },
        details: {
            type: data.details && data.details.type,
            sleeve: data.details && data.details.sleeve,
            fit: data.details && data.details.fit,
            fabric: data.details && data.details.fabric,
            pack_size: data.details && data.details.pack_size,
            neck_type: data.details && data.details.neck_type,
            ideal_gender: data.details && data.details.ideal_gender,
            occasion: data.details && data.details.occasion,
            brand_color: data.details && data.details.brand_color,
            fabric_care: data.details && data.details.fabric_care,
            brand_fit: data.details && data.details.brand_fit,
        }
    });
};

module.exports = addProductObj;