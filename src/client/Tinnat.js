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
import Checkout from './components/checkout/Checkout';
import ProductDetailWrapper from './components/product-detail/ProductDetailWrapper';
import Internal from './components/internal';
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
                <Route exact path="/instant-purchase/payment/:orderid" component={InstantPurchasePayment} />
                <Route exact path="/instant-purchase/complete/:orderid" component={InstantPurchaseConfirmation} />
                <Route exact path="/instant-purchase/:orderid" component={InstantPurchase} />
                <Route path="/internal" component={Internal} />
            </Router >
        );
    }
}