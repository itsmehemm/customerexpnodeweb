const editProductObj = (originaldata, newdata) => {
    return ({
        id: originaldata.id,
        name: newdata.name || originaldata.name,
        description: newdata.description || originaldata.description,
        code: newdata.code || originaldata.code,
        category_id: newdata.category_id || originaldata.category_id,
        default_size: newdata.default_size || originaldata.default_size,
        default_color: newdata.default_color || originaldata.default_color,
        available_sizes: newdata.available_sizes || originaldata.available_sizes,
        available_colors: newdata.available_colors || originaldata.available_colors,
        discount: {
            type: newdata.discount && newdata.discount.type || originaldata.discount.type,
            value: newdata.discount && newdata.discount.value || originaldata.discount.value
        },
        stock_quantity: newdata.stock_quantity || originaldata.stock_quantity,
        cost: {
            amount: newdata.cost && newdata.cost.amount || originaldata.cost.amount,
            currency: newdata.cost && newdata.cost.currency || originaldata.cost.currency
        },
        picture_links: newdata.picture_links || originaldata.picture_links,
        featured: newdata.featured || originaldata.featured,
        thirty_day_exchange: newdata.thirty_day_exchange || originaldata.thirty_day_exchange,
        fifteen_day_exchange: newdata.fifteen_day_exchange || originaldata.fifteen_day_exchange,
        payment_options: {
            cash_on_delivery: (newdata.payment_options && newdata.payment_options.cash_on_delivery) || originaldata.payment_options.cash_on_delivery,
            credit_card: (newdata.payment_options && newdata.payment_options.credit_card) || originaldata.payment_options.credit_card
        },
        details: {
            type: (newdata.details && newdata.details.type) || originaldata.details.type,
            sleeve: (newdata.details && newdata.details.sleeve) || originaldata.details.sleeve,
            fit: (newdata.details && newdata.details.fit) || originaldata.details.fit,
            fabric: (newdata.details && newdata.details.fabric) || originaldata.details.fabric,
            pack_size: (newdata.details && newdata.details.pack_size) || originaldata.details.pack_size,
            neck_type: (newdata.details && newdata.details.neck_type) || originaldata.details.neck_type,
            ideal_gender: (newdata.details && newdata.details.ideal_gender) || originaldata.details.ideal_gender,
            occasion: (newdata.details && newdata.details.occasion) || originaldata.details.occasion,
            brand_color: (newdata.details && newdata.details.brand_color) || originaldata.details.brand_color,
            fabric_care: (newdata.details && newdata.details.fabric_care) || originaldata.details.fabric_care,
            brand_fit: (newdata.details && newdata.details.brand_fit) || originaldata.details.brand_fit,
        }
    });
};

module.exports = editProductObj;