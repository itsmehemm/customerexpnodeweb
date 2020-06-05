
const { GET_CART_CONTROLLER } = require('../../lib/constants/logging-constants');

const getCart = (req, res) => {
    console.log(GET_CART_CONTROLLER, `Controller to retrive current cart in session`);

    let cart = req.session.cart;

    console.log(GET_CART_CONTROLLER, `Cart in session: ${JSON.stringify(cart)}`);

    res.send({
        status: 'COMPLETED',
        cart: cart
    });
};

module.exports = getCart;