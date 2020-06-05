const addItemToCartObj = (item) => {
    return {
        id: item.id,
        count: 1,
        selection: {
            color: item.color,
            size: item.size
        }
    };
};

module.exports = addItemToCartObj;