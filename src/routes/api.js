const express = require('express');
const app = express();

const { addProduct, getProducts } = require('../controllers');

app.post('/product/add', addProduct)
app.get('/product', getProducts)

module.exports = app;