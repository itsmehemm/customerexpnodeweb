const express = require('express');
const {
    addProduct,
    getProductById,
    editProductById,
    removeProductById,
    getFeaturedProducts,
    getProductsByCategory,
    getProducts,
    addProductToCart,
    editProductInCart,
    removeProductFromCart,
    getCart,
    createInstantOrder,
    getOrderById,
    patchOrderById,
    getPaymentPlan
} = require('../controllers');

const app = express();

app.get('/products', getProducts);

app.get('/products/featured', getFeaturedProducts);

app.get('/products/category/:category_code', getProductsByCategory);

app.post('/product/add', addProduct);

app.get('/product/:id', getProductById);

app.post('/product/:id/update', editProductById);

app.post('/product/:id/remove', removeProductById);

app.post('/cart/add', addProductToCart);

app.post('/cart/edit', editProductInCart);

app.post('/cart/remove', removeProductFromCart);

app.get('/cart', getCart);

app.post('/create/order', createInstantOrder);

app.get('/order/:id', getOrderById);

app.patch('/order/:id', patchOrderById);

app.get('/instant-purchase/:id/payment/plan', getPaymentPlan);

module.exports = app;