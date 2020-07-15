import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/home/Home';
import About from './components/about/About';
import Products from './components/products/Products';
import Help from './components/common/Help';
import ContactUs from './components/common/ContactUs';
import Cart from './components/cart/Cart';
import InstantPurchase from './components/instant-purchase/InstantPurchase';
import InstantPurchasePayment from './components/payment/InstantPurchasePayment';
import InstantPurchaseConfirmation from './components/payment/InstantPurchaseConfirmation';
import Orders from './components/orders/Orders';
import Order from './components/orders/Order';
import Checkout from './components/checkout/Checkout';
import ProductDetailWrapper from './components/product-detail/ProductDetailWrapper';
import PaymentActivity from './components/activity/Payment';
import Business from './components/business';
import NotFound from './components/common/errors/NotFound';
import Error from './components/common/errors/Error';
import Login from './components/login/Login';
import './styles/index.css';

export default class Tinnat extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/help" component={Help} />
                <Route exact path="/contactus" component={ContactUs} />
                <Route exact path="/product/:productid" component={ProductDetailWrapper} />
                <Route exact path="/viewcart" component={Cart} />
                <Route exact path="/checkout" component={Checkout} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/instant-purchase/payment/:orderid" component={InstantPurchasePayment} />
                <Route exact path="/instant-purchase/complete/:orderid" component={InstantPurchaseConfirmation} />
                <Route exact path="/instant-purchase/:orderid" component={InstantPurchase} />
                <Route exact path="/account/activity/orders" component={Orders} />
                <Route exact path="/account/activity/order/:orderid" component={Order} />
                <Route exact path="/account/activity/payment/:transactionid" component={PaymentActivity} />
                <Route path="/business" component={Business} />
                <Route exact path="/notfound" component={NotFound} />
                <Route exact path="/error" component={Error} />
            </Router >
        );
    }
}