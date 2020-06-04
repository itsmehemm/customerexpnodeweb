import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/common/Footer';
import Home from './components/home/Home';
import About from './components/about/About';
import Products from './components/products';
import Help from './components/common/Help';
import ContactUs from './components/common/ContactUs';
import Cart from './components/cart/Cart';
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
                <Route path="/product/:productid" component={ProductDetailWrapper} />
                <Route path="/viewcart" component={Cart} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/internal" component={Internal} />
                <Footer />
            </Router >
        );
    }
}