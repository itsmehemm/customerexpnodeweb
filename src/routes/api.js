const express = require('express');
const app = express();

const {
    addProduct,
    getProductById,
    editProductById,
    removeProductById,
    getFeaturedProducts,
    getProducts,
    addProductToCart,
    editProductInCart,
    removeProductFromCart,
    getCart
} = require('../controllers');

app.get('/products', getProducts);

app.get('/products/featured', getFeaturedProducts);

app.post('/product/add', addProduct);

app.get('/product/:id', getProductById);

app.post('/product/:id/update', editProductById);

app.post('/product/:id/remove', removeProductById);

app.post('/cart/add', addProductToCart);

app.post('/cart/edit', editProductInCart);

app.post('/cart/remove', removeProductFromCart);

app.get('/cart', getCart);

module.exports = app;