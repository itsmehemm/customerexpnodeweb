import React, { Component } from 'react';
import Header from '../header/Header';
import ComponentLoader from '../common/ComponentLoader';
import WebInternalServerError from '../common/WebInternalServerError';
import Component404 from '../common/Component404';
import ProductDetail from './ProductDetail';
import getProductById from '../../actions/get-product-by-id';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
    OPERATION_LOADING_ERROR,
    PAGE_LOADING_FAILED
} from '../../lib/constants';

export default class ProductDetailWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: OPERATION_LOADING,
            data: null,
            error: null
        }
    }

    async componentDidMount() {
        this.setState({ status: OPERATION_LOADING });
        const productid = this.props.match.params.productid;
        try {
            const response = await getProductById(productid);
            if (response && response.error) {
                this.setState({
                    status: OPERATION_LOADING_ERROR,
                    error: response.error
                });
            } else {
                this.setState({
                    status: OPERATION_LOADING_COMPLETED,
                    data: response
                });
            }
        } catch (error) {
            this.setState({ status: PAGE_LOADING_FAILED });
        }
    }

    render() {
        const { status, data, error } = this.state;
        return (
            <>
                <Header />
                {status === OPERATION_LOADING && <ComponentLoader />}
                {status === PAGE_LOADING_FAILED && <WebInternalServerError />}
                {status === OPERATION_LOADING_ERROR && <Component404 error={error} />}
                {status === OPERATION_LOADING_COMPLETED && <ProductDetail data={data} />}
                {status === OPERATION_LOADING && <ComponentLoader />}
            </>
        );
    }
}