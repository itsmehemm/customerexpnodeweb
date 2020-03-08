
import React, { Component } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import Typography from '../common/elements/Typography';
import ProductImages from '../product-detail/ProductImages';
import ProductDetailLoading from '../product-detail/ProductDetailLoading';
import EmptyCart from './EmptyCart';
import ErrorCart from './ErrorCart';

import { getCart } from '../../actions/cart/get-cart';
import { getProductById } from '../../actions/get-product-by-id';

import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
    OPERATION_LOADING_ERROR
} from '../../client-lib/constants';

export default class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cart_status: OPERATION_LOADING,
            cart_details: OPERATION_LOADING,
            cart: [],
            cart_details: []
        }
    }

    componentDidMount() {
        /*
         * Update the cart and cart_details state variables
         */
        this.updateCart();
    }

    async updateCart() {
        /**
         * Step 1: Get raw cart from server
         */
        let cart_response = await getCart();
        /**
         * Step 2: Update cart state variable
         */
        if (cart_response && cart_response.cart && Array.isArray(cart_response.cart)) {
            this.setState({ cart_status: OPERATION_LOADING_COMPLETED, cart: cart_response.cart });

            let cart = cart_response.cart;
            let cart_details = [];

            for (let i = 0; i < cart.length; i++) {
                let item = cart[i];
                let item_detail = {};
                const product = await getProductById(item.id);
                if (product.id) {
                    item_detail = product;
                    item_detail.count = item.count;
                    item_detail.selected_color = item.color;
                    item_detail.selected_size = item.size;
                    cart_details.push(item_detail);
                }
            };

            this.setState({ cart_details_status: OPERATION_LOADING_COMPLETED, cart_details: cart_details });
        } else {
            this.setState({
                cart_status: OPERATION_LOADING_ERROR,
                cart_details_status: OPERATION_LOADING_ERROR,
                cart: [],
                cart_details: []
            });
        }
    }

    render() {
        return (
            <Container style={{ padding: '1em' }} maxWidth="md">
                <Grid container>
                    {this.state.cart_status === OPERATION_LOADING && <ProductDetailLoading />}

                    {this.state.cart_status === OPERATION_LOADING_ERROR && <ErrorCart />}

                    {this.state.cart_status === OPERATION_LOADING_COMPLETED && this.state.cart.length === 0 && <EmptyCart />}

                    {this.state.cart_status === OPERATION_LOADING_COMPLETED && this.state.cart.length > 0 &&
                        <>
                            <Grid item xs={8}>
                                <Box className="p-widget" m={2}>
                                    <Box m={3}>
                                        <Typography text={`My Cart (${this.state.cart.length})`} size="h6" />
                                    </Box>
                                    <Box m={2}> <Divider /> </Box>
                                    {
                                        this.state.cart_details.map((cart_detail, key) =>
                                            <div key={key}>
                                                <Box m={3}>
                                                    <ProductImages style={{
                                                        height: "100px",
                                                        width: "100px"
                                                    }} images={cart_detail.images} />
                                                </Box>
                                                <Box m={2}> <Divider /> </Box>
                                            </div>
                                        )
                                    }


                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box className="p-widget" m={2}>
                                    <Box m={3}>
                                        <Typography text={`Price Details`} size="h6" />
                                    </Box>
                                </Box>
                            </Grid>
                        </>
                    }
                </Grid>
            </Container>
        )
    }
}