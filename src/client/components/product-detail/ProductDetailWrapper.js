import React, { Component } from 'react';
import Header from '../header/Header';
import ComponentLoader from '../common/loaders/ComponentLoader';
import WebInternalServerError from '../common/errors/WebInternalServerError';
import Component404 from '../common/errors/Component404';
import ProductDetail from './ProductDetail';
import TrendingProducts from '../trending/TrendingProducts';
import RecentProducts from '../recent-products/RecentProducts';
import getProductById from '../../actions/get-product-by-id';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
    OPERATION_LOADING_ERROR,
    PAGE_LOADING_FAILED,
    PRODUCT_NOT_FOUND
} from '../../lib/constants';

export default class ProductDetailWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: OPERATION_LOADING,
            data: null,
            error: null
        };
    }

    async componentDidMount() {
        const productid = this.props.match.params.productid;
        const response = await getProductById(productid);
        if (response && response.id) {
            await this.setState({
                status: OPERATION_LOADING_COMPLETED,
                data: response
            });
        }
        else if (response && response.error &&
            response.error.message === PRODUCT_NOT_FOUND) {
            await this.setState({
                status: OPERATION_LOADING_ERROR,
                error: response.error
            });
        } else {
            await this.setState({
                status: PAGE_LOADING_FAILED,
                data: null,
                error: 'Data not found'
            });
        }
    }

    render() {
        const { status, data, error } = this.state;
        return (
            <>
                <Header />
                {status === OPERATION_LOADING && <ComponentLoader />}
                {status === OPERATION_LOADING_ERROR && <Component404 error={error} />}
                {status === OPERATION_LOADING_COMPLETED &&
                    <>
                        <ProductDetail data={data} />
                        <RecentProducts />
                        <TrendingProducts />
                    </>}
                {status === PAGE_LOADING_FAILED && <WebInternalServerError />}
            </>
        );
    }
}