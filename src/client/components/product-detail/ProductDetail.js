import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SmallButtonGroup from '../common/elements/SmallButtonGroup';
import SmallImageButtonGroup from '../common/elements/SmallImageButtonGroup';
import Amount from '../common/elements/Amount';
import ProductImages from './ProductImages';
import LargeBtn from '../common/elements/LargeBtn';
import Typography from '../common/elements/Typography';
import InstantOrderModal from '../../modals/instant-order/InstantOrderModal';
import { productAdvancedDetailsMapper } from '../../lib/mappers';
import {
    createInstantOrder
} from '../../actions';
import {
    addItemToCart
} from '../../actions/cart/add-item-cart';

export default class ProductDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            color: null,
            size: null,
            quantity: 1,
            notification: {
                status: false,
                message: null
            }
        };
        this.closeNotification = this.closeNotification.bind(this);
        this.update = this.update.bind(this);
        this.instantPurchase = this.instantPurchase.bind(this);
    }

    async componentDidMount() {
        const { data } = this.props;
        await this.setState({
            id: data && data.id,
            color: data && data.default_color,
            size: data && data.default_size
        });
    }

    async update(name, value) {
        await this.setState({ [name]: value });
    }

    // addToCart() {
    //     const item = {
    //         id: this.props.id,
    //         color: this.state.selected.color || this.props.data.default_color,
    //         size: this.state.selected.size || this.props.data.default_size
    //     }
    //     console.log(`ITEM TO BE ADDED: ${JSON.stringify(item)}`);
    //     console.log(`${JSON.stringify(this.props)}`);
    //     addItemToCart({
    //         id: this.props.data.id,
    //         color: this.state.selected.color || this.props.data.default_color,
    //         size: this.state.selected.size || this.props.data.default_size
    //     }).then(response => {
    //         if (response && response.status === 'SUCCESS') {
    //             this.setState({ notification: { status: true, message: response.description } });
    //         } else {
    //             this.setState({ notification: { status: true, message: response.description } });
    //         }
    //     }).catch(error => {
    //         this.setState({ notification: { status: true, message: 'Internal error' } });
    //     })
    // }

    async instantPurchase() {
        const instantOrderModal = new InstantOrderModal();
        instantOrderModal.updateCreateDataFromState(this.state);
        try {
            const response = await createInstantOrder(instantOrderModal.buildCreateOrderRequest());
            if (response && response.instant_purchase_url) {
                window.location.href = response.instant_purchase_url;
            } else {
                await this.notify('There was an error while creating the order.');
            }
        } catch (error) {
            await this.notify('There was an error while creating the order.');
        }
    }

    async notify(message) {
        await this.setState({
            notification: {
                status: true,
                message: message
            }
        });
    }

    async closeNotification() {
        await this.setState({
            notification: {
                status: false,
                message: null
            }
        });
    }

    render() {
        const { data } = this.props;
        const { notification } = this.state;
        return (
            <Container style={{ padding: '1em' }} maxWidth="md">
                <Snackbar
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    key={`2`}
                    open={notification.status}
                    onClose={this.closeNotification}
                    message={notification.message}
                />
                <Grid container>
                    <Grid item xs={6}>
                        <Box m={0}>
                            <ProductImages images={data.picture_links} />
                            {/* <LargeBtn
                                onClick={() => this.addToCart()}
                                name="ADD TO CART"
                                color="#2874f0"
                                icon="add_shopping_cart" /> */}
                            <LargeBtn
                                onClick={this.instantPurchase}
                                name="BUY NOW"
                                color="#fb641b"
                                icon="trending_up" />
                        </Box>
                    </Grid>
                    <Grid style={{ height: "700px", overflow: 'auto' }} item xs={6}>
                        <Grid container>
                            <Grid item xs={10}>
                                <Box m={2}>
                                    <Typography
                                        text={data.name}
                                        variant="h5" />
                                    <Typography
                                        text={data.description}
                                        size="subtitle1" />

                                </Box>
                            </Grid>
                            <Grid item xs={2}>
                                <Box m={2}>
                                    <CopyToClipboard
                                        text={data.url}
                                        onCopy={() => this.notify('Product link copied!')}>
                                        <Typography className="t-text-link" text="Share" size="subtitle1" />
                                    </CopyToClipboard>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box m={2}>
                            <Amount cost={data.cost} discount={data.discount} />
                        </Box>
                        <Box m={2}> <Divider /> </Box>
                        <Box m={2}>
                            <Typography
                                text={"Size"}
                                variant="button"
                            />
                        </Box>
                        <Box m={2}>
                            <Grid item xs={12}>
                                <SmallButtonGroup
                                    defaultButton={data.default_size}
                                    buttons={data.available_sizes}
                                    onSelect={(data) => this.update('size', data)}
                                />
                            </Grid>
                        </Box>
                        <Box m={2}> <Divider /> </Box>
                        <Box m={2}>
                            <Typography
                                text={"Color"}
                                variant="button"
                            />
                        </Box>
                        <Box m={2}>
                            <Grid item xs={12}>
                                <SmallImageButtonGroup
                                    name="color"
                                    defaultButton={data.default_color}
                                    buttons={data.available_colors}
                                    onSelect={(data) => this.update('color', data)}
                                />
                            </Grid>
                        </Box>
                        <Box m={2}> <Divider /> </Box>
                        <Box m={2}>
                            {
                                (data.stock_quantity === 'UNLIMITED' || parseInt(data.stock_quantity) > 0) &&
                                <Typography
                                    text="IN STOCK"
                                    icon="done"
                                    variant="h6"
                                    style={{ color: 'rgb(5, 153, 54)' }}
                                />
                                ||
                                <Typography
                                    text="OUT OF STOCK"
                                    icon="cancel"
                                    variant="h6"
                                    style={{ color: 'rgb(189, 6, 61)' }}
                                />
                            }
                        </Box>
                        <Box m={2}> <Divider /> </Box>
                        {
                            data.advanced_details &&
                            <>
                                <Box m={2}> <Typography text={"Product Details"} type="h4" /> </Box>
                                <Box m={2}>
                                    {
                                        Object.keys(data.advanced_details || []).map((i, key) =>
                                            data.advanced_details[i] &&
                                            <Grid container key={key} spacing={2}>
                                                <Grid item xs={6}>
                                                    <Typography
                                                        text={productAdvancedDetailsMapper[i]}
                                                        size="button" />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography
                                                        text={data.advanced_details[i]}
                                                        size="subtitle1" />
                                                </Grid>
                                            </Grid>
                                        )
                                    }
                                </Box>
                                <Box m={2}> <Divider /> </Box>
                            </>
                        }
                    </Grid>
                </Grid>
            </Container >
        );
    }
}
