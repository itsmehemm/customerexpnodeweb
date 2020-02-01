import React, { Component } from 'react';

import ProductDetailLoading from './ProductDetailLoading';
import WebInternalServerError from '../common/WebInternalServerError';
import Component404 from '../common/Component404';
import ProductDetail from './ProductDetail';
import Header from '../common/Header';
import Footer from '../common/Footer';
import getProductById from '../../actions/get-product-by-id';

import {
    PAGE_LOADING,
    PAGE_LOADING_COMPLETED_SUCCESS,
    PAGE_LOADING_COMPLETED_FAILED,
    PAGE_LOADING_FAILED
} from '../../client-lib/constants';

export default class ProductDetailWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: PAGE_LOADING,
            data: null,
            error: null
        }
    }

    async componentDidMount() {
        this.setState({ status: PAGE_LOADING });

        const productid = this.props.match.params.productid;

        const response = await getProductById(productid);

        // Error fetching product details. Retry.
        if (!response) {
            this.setState({ status: PAGE_LOADING_FAILED });
        }
        // No such product found. Throw 404.
        if (response && response.error) {
            this.setState({
                status: PAGE_LOADING_COMPLETED_FAILED,
                error: response.error
            });
        } else {
            this.setState({
                status: PAGE_LOADING_COMPLETED_SUCCESS,
                data: response
            });
        }
    }

    render() {

        const { status, data, error } = this.state;

        switch (status) {
            case PAGE_LOADING:
                return <ProductDetailLoading />;
            case PAGE_LOADING_FAILED:
                return <WebInternalServerError />;
            case PAGE_LOADING_COMPLETED_FAILED:
                return <Component404 error={error} />
            case PAGE_LOADING_COMPLETED_SUCCESS:
                return (<div>
                    <Header />
                    <ProductDetail data={data} />
                    <Footer />
                </div>);
            default:
                return <WebInternalServerError />;
        };
    }
}