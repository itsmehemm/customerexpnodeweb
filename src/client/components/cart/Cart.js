
import React, { Component } from 'react';
import { getCart } from '../../actions/cart/get-cart';
import { getProductById } from '../../actions/get-product-by-id';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '../common/elements/Typography';
import Divider from '@material-ui/core/Divider';
import ProductImages from '../product-detail/ProductImages';

export default class Cart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cart: [],
            cart_details: [{
                count: 1,
                selected_size: 'M',
                selected_color: 'R',
                "id": "Tinnat-Signature-Round-neck-T-shirt-4KESO4OEK63MCVQ8",
                "name": "Tinnat Signature Round neck T-shirt",
                "description": "Bio wash cotton fabric t-shirt from Tinnat",
                "code": "TINNAT-TSHIRT-MEN",
                "category_id": "TSHIRT",
                "default_size": "L",
                "default_color": "R",
                "available_sizes": [
                    "S",
                    "M",
                    "L",
                    "XL",
                    "XXL"
                ],
                "available_colors": [
                    "R",
                    "G",
                    "B"
                ],
                "discount": {
                    "type": "INSTANT",
                    "value": "99"
                },
                "stock_quantity": "10",
                "cost": {
                    "amount": "498",
                    "currency": "INR"
                },
                "picture_links": [
                    "https://i.ibb.co/xM1v6ts/Whats-App-Image-2020-01-25-at-20-30-54.jpg",
                    "https://i.ibb.co/kHHGFGv/Whats-App-Image-2020-01-25-at-20-20-27.jpg"
                ],
                "featured": true,
                "thirty_day_exchange": true,
                "fifteen_day_exchange": false,
                "payment_options": {
                    "cash_on_delivery": true,
                    "credit_card": false
                },
                "details": {
                    "type": "Round neck",
                    "sleeve": "Half Sleeve",
                    "fit": "Regular",
                    "fabric": "Pure Cotton",
                    "pack_size": "1",
                    "neck_type": "Round neck",
                    "ideal_gender": "Men",
                    "occasion": "Western Wear",
                    "brand_color": "Yellow",
                    "fabric_care": "Regular Machine Wash",
                    "brand_fit": "Regular Fit"
                }
            }, {

            }]
        }
    }

    componentDidMount() {
        this.updateCart();
    }

    async updateCart() {
        let response = await getCart();

        let cart = (response && response.cart) || [];
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

        this.setState({
            cart: cart,
            cart_details: [{
                count: 1,
                selected_size: 'M',
                selected_color: 'R',
                "id": "Tinnat-Signature-Round-neck-T-shirt-4KESO4OEK63MCVQ8",
                "name": "Tinnat Signature Round neck T-shirt",
                "description": "Bio wash cotton fabric t-shirt from Tinnat",
                "code": "TINNAT-TSHIRT-MEN",
                "category_id": "TSHIRT",
                "default_size": "L",
                "default_color": "R",
                "available_sizes": [
                    "S",
                    "M",
                    "L",
                    "XL",
                    "XXL"
                ],
                "available_colors": [
                    "R",
                    "G",
                    "B"
                ],
                "discount": {
                    "type": "INSTANT",
                    "value": "99"
                },
                "stock_quantity": "10",
                "cost": {
                    "amount": "498",
                    "currency": "INR"
                },
                "picture_links": [
                    "https://i.ibb.co/xM1v6ts/Whats-App-Image-2020-01-25-at-20-30-54.jpg",
                    "https://i.ibb.co/kHHGFGv/Whats-App-Image-2020-01-25-at-20-20-27.jpg"
                ],
                "featured": true,
                "thirty_day_exchange": true,
                "fifteen_day_exchange": false,
                "payment_options": {
                    "cash_on_delivery": true,
                    "credit_card": false
                },
                "details": {
                    "type": "Round neck",
                    "sleeve": "Half Sleeve",
                    "fit": "Regular",
                    "fabric": "Pure Cotton",
                    "pack_size": "1",
                    "neck_type": "Round neck",
                    "ideal_gender": "Men",
                    "occasion": "Western Wear",
                    "brand_color": "Yellow",
                    "fabric_care": "Regular Machine Wash",
                    "brand_fit": "Regular Fit"
                }
            }, {

            }]
        });
        // this.setState({ cart: cart, cart_details: cart_details });
    }

    render() {
        return (
            <div>
                <Header />
                <Container style={{ padding: '1em' }} maxWidth="md">
                    <Grid container>
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
                    </Grid>
                </Container>
                <Footer />
            </div>
        )
    }
}