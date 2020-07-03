import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import SecondaryHeader from '../header/SecondaryHeader';
import ProductDetailWrapper from '../product-detail/ProductDetailWrapper';
import ProductFactoryWrapper from './product-factory/ProductFactoryWrapper';
import SearchTransactions from './activity/SearchTransactions';
import PaymentActivity from './activity/PaymentActivity';

export default class Business extends Component {
    render() {
        return (
            <Router>
                <SecondaryHeader />
                <Route exact path="/business/warehouse/product/add" component={ProductFactoryWrapper} />
                <Route exact path="/business/warehouse/product/edit/:productid" component={ProductFactoryWrapper} />
                <Route exact path="/business/warehouse/product/view/:productid/" component={ProductDetailWrapper} />
                <Route exact path="/business/activity/transactions" component={SearchTransactions} />
                <Route exact path="/business/activity/transaction/:transactionid" component={PaymentActivity} />
            </Router >
        );
    }
}