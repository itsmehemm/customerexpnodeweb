const express = require('express');
const app = express();

const { addProduct, getProductById, removeProductById, getProducts } = require('../controllers');

app.post('/product/add', addProduct)

app.get('/product', getProducts)

app.get('/product/:id', getProductById)

app.post('/product/:id/remove', removeProductById)

module.exports = app;