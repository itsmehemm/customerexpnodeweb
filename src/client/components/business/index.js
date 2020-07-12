import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import SecondaryHeader from '../header/SecondaryHeader';
import Footer from '../common/Footer';
import BusinessDashboard from './dashboard/Dashboard';
import ProductDetailWrapper from '../product-detail/ProductDetailWrapper';
import ProductFactoryWrapper from './product-factory/ProductFactoryWrapper';
import Products from './products/Products';
import SearchTransactions from './activity/SearchTransactions';
import PaymentActivity from './activity/PaymentActivity';
import Idsearch from '../cal/Idsearch';

export default class Business extends Component {
    render() {
        return (
            <Router>
                <SecondaryHeader />
                <Route exact path="/business" component={BusinessDashboard} />
                <Route exact path="/business/warehouse/products" component={Products} />
                <Route exact path="/business/warehouse/product/add" component={ProductFactoryWrapper} />
                <Route exact path="/business/warehouse/product/edit/:productid" component={ProductFactoryWrapper} />
                <Route exact path="/business/warehouse/product/view/:productid" component={ProductDetailWrapper} />
                <Route exact path="/business/activity/transactions" component={SearchTransactions} />
                <Route exact path="/business/activity/transaction/:transactionid" component={PaymentActivity} />
                <Route exact path="/business/logger/idsearch" component={Idsearch} />
                <Route exact path="/business/logger/idsearch/:debugid" component={Idsearch} />
                <Footer />
            </Router >
        );
    }
}