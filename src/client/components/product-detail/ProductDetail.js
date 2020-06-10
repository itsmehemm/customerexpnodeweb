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
import ProductDetailModal from '../../modals/product-detail/ProductDetailModal';
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
        this.state = new ProductDetailModal().getDefaultData();
        this.closeNotification = this.closeNotification.bind(this);
        this.update = this.update.bind(this);
        this.instantPurchase = this.instantPurchase.bind(this);
    }

    async componentDidMount() {
        const { data } = this.props;
        const productDetailModal = new ProductDetailModal(data);
        await this.setState({
            ...productDetailModal.getData(),
        });
    }

    async update(name, value) {
        let { selection, availableColors, amount, stockQuantity, pictureLinks } = this.state;
        if (name === 'size') {
            availableColors = new ProductDetailModal().getAvailableColors(this.props.data.themes, value);
            selection.color = null;
            selection.themeId = new ProductDetailModal().getThemeId(this.props.data.themes, value, selection.color);
            amount = new ProductDetailModal().getAmount(this.props.data.themes, value, selection.color);
            stockQuantity = new ProductDetailModal().getStockQuantity(this.props.data.themes, value, selection.color);
            pictureLinks = new ProductDetailModal().getPictureLinks(this.props.data.themes, value, selection.color);
        }
        if (name === 'color') {
            amount = new ProductDetailModal().getAmount(this.props.data.themes, selection.size, value);
            selection.themeId = new ProductDetailModal().getThemeId(this.props.data.themes, selection.size, value);
            stockQuantity = new ProductDetailModal().getStockQuantity(this.props.data.themes, selection.size, value);
            pictureLinks = new ProductDetailModal().getPictureLinks(this.props.data.themes, selection.size, value);
        }
        await this.setState({
            availableColors: availableColors,
            amount: amount,
            stockQuantity: stockQuantity,
            pictureLinks: pictureLinks,
            selection: {
                ...selection,
                [name]: value
            }
        });
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
        const { selection } = this.state;
        if (selection.color && selection.size) {
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
        } else {
            await this.notify('Select a size and color of your choice.');
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
        const {
            availableSizes,
            availableColors,
            amount,
            stockQuantity,
            pictureLinks,
            notification,
            selection
        } = this.state;
        console.log(stockQuantity)
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
                            <ProductImages images={pictureLinks} />
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
                        {
                            amount &&
                            <>
                                <Box m={2}>
                                    <Amount amount={amount} />
                                </Box>
                                <Box m={2}> <Divider /> </Box>
                            </>
                        }
                        <Box m={2}>
                            <Typography
                                text={"Size"}
                                variant="button"
                            />
                        </Box>
                        {
                            availableSizes &&
                            availableSizes.length > 0 &&
                            <Box m={2}>
                                <Grid item xs={12}>
                                    <SmallButtonGroup
                                        defaultButton={data.default_size}
                                        buttons={availableSizes}
                                        onSelect={(data) => this.update('size', data)}
                                    />
                                </Grid>
                            </Box>
                        }
                        <Box m={2}> <Divider /> </Box>
                        <Box m={2}>
                            <Typography
                                text={"Color"}
                                variant="button"
                            />
                        </Box>
                        {
                            availableColors &&
                            availableColors.length > 0 &&
                            <Box m={2}>
                                <Grid item xs={12}>
                                    <SmallImageButtonGroup
                                        name="color"
                                        size={selection.size}
                                        buttons={availableColors}
                                        onSelect={(data) => this.update('color', data)}
                                    />
                                    {!selection.color && <Typography text="select a color of your choice" variant="caption" style={{ color: 'rgb(189, 6, 61)' }} />}
                                </Grid>
                            </Box>
                        }
                        <Box m={2}> <Divider /> </Box>
                        {
                            stockQuantity !== null && stockQuantity !== undefined &&
                            <>
                                <Box m={2}>
                                    {
                                        (stockQuantity === 'UNLIMITED' || parseInt(stockQuantity) > 0) &&
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
                            </>
                        }
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
