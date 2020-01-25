const uniqid = require('uniqid');

const addProductObj = (data) => {
    return ({
        id: `${data.name.replace(new RegExp(' ', 'g'), '-')}-${uniqid().toUpperCase()}`,
        name: data.name,
        description: data.description,
        code: data.code || 'CODE_MISC',
        category_id: data.category_id || 'CATEGORY_MISC',
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
        featured: data.featured || false
    });
};

module.exports = addProductObj;