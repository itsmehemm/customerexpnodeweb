const addProductValidator = (data) => {
    if (!data) return false;

    if (!data.name) return false;

    return true;
};

module.exports = addProductValidator;