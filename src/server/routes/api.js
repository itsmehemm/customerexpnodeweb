const express = require('express');
const {
    addProduct,
    getProductById,
    editProductById,
    removeProductById,
    getFeaturedProducts,
    getProductsByCategory,
    getProducts,
    getFilteredProducts,
    addProductToCart,
    editProductInCart,
    removeProductFromCart,
    getCart,
    createInstantOrder,
    getOrderById,
    patchOrderById,
    getPaymentPlan,
    razorpayPaymentComplete,
    updateDeliveryPincode,
    getPaymentActivity,
    getPaymentActivityInternal,
    searchTransactions,
    getBusinessKPIs,
    getLogsById
} = require('../controllers');

const app = express();

app.get('/products', getProducts);

app.get('/products/featured', getFeaturedProducts);

app.post('/products/filter', getFilteredProducts);

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

app.post('/instant-purchase/:id/payment/razorpay', razorpayPaymentComplete);

app.post('/delivery/update/pincode', updateDeliveryPincode);

app.get('/activity/payment/:transactionId', getPaymentActivity);

app.post('/activity/search/transactions', searchTransactions);

app.get('/business/activity/payment/:transactionId', getPaymentActivityInternal);

app.post('/business/products/filter', getFilteredProducts);

app.get('/business/kpis', getBusinessKPIs);

app.get('/log/:debugid', getLogsById);

module.exports = app;