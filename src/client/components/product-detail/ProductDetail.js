import React, { Component } from 'react';
import SmallButtonGroup from '../common/elements/SmallButtonGroup';
import Amount from '../common/elements/Amount';
import ProductImages from './ProductImages';
import LargeBtn from '../common/elements/LargeBtn';

import Typography from '../common/elements/Typography';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';

import { productDetailsLabel } from '../../client-lib/mappers';

import { addItemToCart } from '../../actions/cart/add-item-cart';

export default class ProductDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: {
                color: null,
                size: null
            },

            notification: {
                status: false,
                message: ''
            }
        };

        this.closeNotification = this.closeNotification.bind(this);
        this.update = this.update.bind(this);
    }

    update(type, data) {
        let selected = this.state.selected;
        selected[type] = data;
        this.setState({ selected: selected });
    }

    addToCart() {
        const item = {
            id: this.props.id,
            color: this.state.selected.color || this.props.data.default_color,
            size: this.state.selected.size || this.props.data.default_size
        }
        console.log(`ITEM TO BE ADDED: ${JSON.stringify(item)}`);
        console.log(`${JSON.stringify(this.props)}`);
        addItemToCart({
            id: this.props.data.id,
            color: this.state.selected.color || this.props.data.default_color,
            size: this.state.selected.size || this.props.data.default_size
        }).then(response => {
            if (response && response.status === 'SUCCESS') {
                this.setState({ notification: { status: true, message: response.description } });
            } else {
                this.setState({ notification: { status: true, message: response.description } });
            }
        }).catch(error => {
            this.setState({ notification: { status: true, message: 'Internal error' } });
        })
    }

    buyNow() {

    }

    closeNotification() {
        this.setState({ notification: { status: false, message: '' } });
    }

    render() {
        const { data } = this.props;
        return (
            <Container style={{ padding: '1em' }} maxWidth="md">
                <Snackbar
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    key={`2`}
                    open={this.state.notification.status}
                    onClose={this.closeNotification}
                    message={this.state.notification.message}
                />
                <Grid container>
                    {/* Product Images and Buttons */}
                    <Grid item xs={6}>
                        <Box m={0}>
                            <ProductImages images={data.picture_links} />
                            <LargeBtn
                                onClick={() => this.addToCart()}
                                name="ADD TO CART"
                                color="#2874f0"
                                icon="add_shopping_cart" />
                            <LargeBtn
                                onClick={() => this.buyNow()}
                                name="BUY NOW"
                                color="#fb641b"
                                icon="trending_up" />
                        </Box>
                    </Grid>
                    {/* Product Information */}
                    <Grid style={{ height: "700px", overflow: 'auto' }} item xs={6}>
                        <Box m={2}>
                            <Typography text={data.name} size="h5" />
                        </Box>
                        <Box m={2}>
                            <Typography text={data.description} size="subtitle1" />
                        </Box>
                        <Box m={2}>
                            <Amount cost={data.cost} discount={data.discount} />
                        </Box>
                        <Box m={2}> <Divider /> </Box>

                        <Box m={2}>
                            <Typography text={"Size"} />
                        </Box>
                        <Box m={2}>
                            <Grid item xs={12}>
                                <SmallButtonGroup
                                    onSelect={(data) => this.update('size', data)}
                                    defaultButton={data.default_size}
                                    buttons={data.available_sizes}
                                />
                            </Grid>
                        </Box>
                        <Box m={2}> <Divider /> </Box>

                        <Box m={2}>
                            <Typography text={"Color"} />
                        </Box>
                        <Box m={2}>
                            <Grid item xs={12}>
                                <SmallButtonGroup
                                    onSelect={(data) => this.update('color', data)}
                                    defaultButton={data.default_color}
                                    buttons={data.available_colors}
                                />
                            </Grid>
                        </Box>
                        <Box m={2}> <Divider /> </Box>

                        <Box m={2}>

                            {
                                data.stock_quantity === 'UNLIMITED' || parseInt(data.stock_quantity) > 0 ?
                                    <span className="small-header-text green-text">
                                        <i className="material-icons">done</i>
                                        &ensp; IN STOCK
                                                </span> :
                                    <span className="small-header-text red-text">
                                        <i className="material-icons">cancel</i>
                                        &ensp; OUT OF STOCK
                                                </span>
                            }
                        </Box>
                        <Box m={2}> <Divider /> </Box>
                        {
                            data.details ?
                                <div>
                                    <Box m={2}> <Typography text={"Product Details"} type="h4" /> </Box>
                                    <Box m={2}>
                                        {
                                            Object.keys(data.details || {}).map((i, key) =>
                                                <Grid container key={key} spacing={2}>
                                                    <Grid item xs={6}>
                                                        <Typography text={productDetailsLabel[i]} size="subtitle1" />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography text={data["details"][i]} size="subtitle1" />
                                                    </Grid>
                                                </Grid>
                                            )
                                        }
                                    </Box>
                                    <Box m={2}> <Divider /> </Box>
                                </div> : <div></div>}
                    </Grid>
                </Grid>
            </Container >
        )
    }
}
