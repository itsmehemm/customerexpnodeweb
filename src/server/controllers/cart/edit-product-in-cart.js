
const { EDIT_IN_CART_CONTROLLER } = require('../../lib/constants/logging-constants');

const editProductInCart = (req, res) => {
    console.log(EDIT_IN_CART_CONTROLLER, `Edit product in cart: ${JSON.stringify(req.body)}`);

    let cart = req.session.cart;
    let operation = req.body.operation;

    console.log(EDIT_IN_CART_CONTROLLER, `Cart before edit/update: ${JSON.stringify(cart)}`);

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === req.body.id) {
            console.log(EDIT_IN_CART_CONTROLLER, `Item to be updated is found in cart: ${JSON.stringify(cart[i].id)}`);
            if (operation === 'DECREASE_ITEM_COUNT') {
                cart[i].count -= 1;
            } else if (operation === 'CHANGE_SIZE') {
                cart[i].size = req.body.data;
            } else if (operation === 'CHANGE_COLOR') {
                cart[i].color = req.body.data;
            } else {
                console.log(EDIT_IN_CART_CONTROLLER, `Invalid operation requested: ${operation}`);
            }
        }
    }

    // remove items from cart which has count less than 1.
    cart = cart.filter(item => item.count > 0);

    req.session.cart = cart;

    console.log(EDIT_IN_CART_CONTROLLER, `updated cart: ${JSON.stringify(req.session.cart)}`);

    res.status(200).send({
        status: 'COMPLETED',
        message: 'CART_EDITED_SUCCESSFULLY',
        description: 'The cart was updated successfully.'
    })
};

module.exports = editProductInCart;