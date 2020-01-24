
import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/home/Home';
import Product from './components/product/Product';
import './styles/index.css';
export default class Tinnat extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Route exact path="/" component={Home} />
                <Route path="/product/:productid" component={Product} />
            </Router>
        )
    }
}