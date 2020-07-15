import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import BusinessApp from './BusinessApp';
import BusinessDashboard from './dashboard/Dashboard';
import Products from './products/Products';
import ProductFactoryWrapper from './product-factory/ProductFactoryWrapper';
import ProductDetailWrapper from '../product-detail/ProductDetailWrapper';
import SearchTransactions from './activity/SearchTransactions';
import PaymentActivity from './activity/PaymentActivity';
import Idsearch from '../logger/Idsearch';

export default class Business extends Component {
    render() {
        return (
            <Router>
                <BusinessApp>
                    <Route exact path='/business' component={BusinessDashboard} />
                    <Route exact path='/business/warehouse/products' component={Products} />
                    <Route exact path='/business/warehouse/product/add' component={ProductFactoryWrapper} />
                    <Route exact path='/business/warehouse/product/edit/:productid' component={ProductFactoryWrapper} />
                    <Route exact path='/business/warehouse/product/view/:productid' component={ProductDetailWrapper} />
                    <Route exact path='/business/activity/transactions' component={SearchTransactions} />
                    <Route exact path='/business/activity/transaction/:transactionid' component={PaymentActivity} />
                    <Route exact path='/business/logger/idsearch' component={Idsearch} />
                    <Route exact path='/business/logger/idsearch/:debugid' component={Idsearch} />
                </BusinessApp>
            </Router>
        );
    }
};