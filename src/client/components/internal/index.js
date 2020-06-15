
import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import SecondaryHeader from '../header/SecondaryHeader';
import Footer from '../common/Footer';
import ProductDetailWrapper from '../product-detail/ProductDetailWrapper';
import ProductFactoryWrapper from './product-factory/ProductFactoryWrapper';

export default class Internal extends Component {
    render() {
        return (
            <Router>
                <SecondaryHeader />
                <Route exact path="/internal/warehouse/product/add" component={ProductFactoryWrapper} />
                <Route exact path="/internal/warehouse/product/edit/:productid" component={ProductFactoryWrapper} />
                <Route exact path="/internal/warehouse/product/view/:productid/" component={ProductDetailWrapper} />
            </Router >
        );
    }
}