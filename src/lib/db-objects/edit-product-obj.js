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
        featured: (newdata.featured !== undefined) ? newdata.featured : originaldata.featured
    });
};

module.exports = editProductObj;