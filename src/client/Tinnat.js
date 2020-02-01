
import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/home/Home';
import ProductDetailWrapper from './components/product-detail/ProductDetailWrapper';
import './styles/index.css';

export default class Tinnat extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route path="/product/:productid" component={ProductDetailWrapper} />
                {/* <Route path="/admin/product/add" component={ProductDetails} /> */}
            </Router>
        );
    }
}