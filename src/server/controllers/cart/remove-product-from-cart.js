
const { REMOVE_FROM_CART_CONTROLLER } = require('../../lib/constants/logging-constants');

const removeProductFromCart = (req, res) => {
    console.log(REMOVE_FROM_CART_CONTROLLER, `Remove product from cart: ${JSON.stringify(req.body.id)}`);

    let cart = req.session.cart;
    
    console.log(REMOVE_FROM_CART_CONTROLLER, `Existing cart: ${JSON.stringify(cart)}`);

    if (cart.length === 0) {
        console.log(REMOVE_FROM_CART_CONTROLLER, `Cart is empty. Invalid request`);
        return res.status(200).send({
            status: 'COMPLETED',
            message: 'CART_ALREADY_EMPTY',
            description: 'The cart is already empty to remove any item. Invalid request, try again.'
        });
    }

    let updatedCart = cart.filter(item => item.id !== req.body.id);

    req.session.cart = updatedCart;

    console.log(REMOVE_FROM_CART_CONTROLLER, `updated cart: ${JSON.stringify(req.session.cart)}`);

    res.status(200).send({
        status: 'COMPLETED',
        message: 'ITEM_REMOVED_FROM_CART',
        description: 'The item was removed from the cart successfully.'
    })
};

module.exports = removeProductFromCart;