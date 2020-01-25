const express = require('express');
const app = express();

const { addProduct, getProductById, editProductById, removeProductById, getFeaturedProducts, getProducts } = require('../controllers');

app.get('/products', getProducts)

app.get('/products/featured', getFeaturedProducts)

app.post('/product/add', addProduct)

app.get('/product/:id', getProductById)

app.post('/product/:id/update', editProductById)

app.post('/product/:id/remove', removeProductById)



module.exports = app;