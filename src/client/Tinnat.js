
import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/common/Header.js'
import Footer from './components/common/Footer.js'
import Product from './components/product/Product';
import './styles/index.css';

export default class Tinnat extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Header />
                <Route exact path="/" component={Home} />
                <Route path="/product/:productid" component={Product} />
                <Footer />
            </Router>
        )
    }
}