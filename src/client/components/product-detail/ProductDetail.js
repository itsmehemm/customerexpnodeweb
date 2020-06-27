import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SmallButtonGroup from '../common/elements/SmallButtonGroup';
import SmallImageButtonGroup from '../common/elements/SmallImageButtonGroup';
import Amount from '../common/elements/Amount';
import LargeBtn from '../common/elements/LargeBtn';
import Typography from '../common/elements/Typography';
import ProductImages from './ProductImages';
import InstantOrderModal from '../../modals/instant-order/InstantOrderModal';
import ProductDetailModal from '../../modals/product-detail/ProductDetailModal';
import { productAdvancedDetailsMapper } from '../../lib/mappers';
import {
    createInstantOrder
} from '../../actions';

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
        const { selection, stockQuantity } = this.state;
        if (selection.color && selection.size) {
            if (stockQuantity === 'UNLIMITED' || parseInt(stockQuantity) > 0) {
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
                await this.notify('This product is out of stock.');
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
        const {
            data
        } = this.props;
        const {
            availableSizes,
            availableColors,
            amount,
            stockQuantity,
            pictureLinks,
            notification,
            selection
        } = this.state;
        return (
            <Container style={{ padding: '1em' }} maxWidth="lg">
                <Snackbar
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    key={`2`}
                    open={notification.status}
                    onClose={this.closeNotification}
                    message={notification.message}
                />
                <Card variant="outlined">
                    <Grid container>
                        <Grid item xs={5}>
                            <Box m={2}>
                                <ProductImages
                                    images={pictureLinks}
                                    style={{
                                        height: "500px",
                                        width: "100%"
                                    }}
                                />
                                <LargeBtn
                                    disabled={!(stockQuantity === 'UNLIMITED' || parseInt(stockQuantity) > 0)}
                                    onClick={this.instantPurchase}
                                    name="BUY NOW"
                                    color="rgb(247, 36, 52)"
                                    icon="trending_up"
                                />
                            </Box>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={6}>
                            <Grid container>
                                <Grid item xs={9}>
                                    <Box m={2}>
                                        <Typography
                                            text={data.name}
                                            variant="h5" />
                                        <Typography
                                            text={data.description}
                                            size="body2" />
                                    </Box>
                                </Grid>
                                <Grid item xs={3}>
                                    <Box m={2}>
                                        <CopyToClipboard
                                            text={data.url}
                                            onCopy={() => this.notify('Product link copied!')}>
                                            <Typography
                                                icon="share"
                                                className="t-text-link-2"
                                                text="Share"
                                                variant="button" />
                                        </CopyToClipboard>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider className="t-extend-hr-2" />
                                </Grid>
                            </Grid>
                            <Grid container>
                                {
                                    amount &&
                                    <>
                                        <Grid item xs={12}>
                                            <Box m={2}>
                                                <Amount amount={amount} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider className="t-extend-hr-2" />
                                        </Grid>
                                    </>
                                }
                            </Grid>
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
                                            defaultButton={data.default_theme.size}
                                            buttons={availableSizes}
                                            onSelect={(data) => this.update('size', data)}
                                        />
                                    </Grid>
                                </Box>
                            }
                            <Divider className="t-extend-hr-2" />
                            <Box m={2}>
                                <Typography
                                    text={"Color"}
                                    variant="button"
                                />
                            </Box>
                            {
                                availableColors &&
                                availableColors.length > 0 &&
                                <>
                                    <Box m={2}>
                                        <Grid item xs={12}>
                                            <SmallImageButtonGroup
                                                name="color"
                                                size={selection.size}
                                                buttons={availableColors}
                                                onSelect={(data) => this.update('color', data)}
                                            />
                                            {
                                                !selection.color &&
                                                <Typography
                                                    text="select a color of your choice"
                                                    variant="caption"
                                                    style={{ color: 'rgb(189, 6, 61)' }}
                                                />
                                            }
                                        </Grid>
                                    </Box>
                                    <Divider className="t-extend-hr-2" />
                                </>
                            }
                            {
                                stockQuantity !== null && stockQuantity !== undefined &&
                                <>
                                    <Box m={2}>
                                        {
                                            (stockQuantity === 'UNLIMITED' || parseInt(stockQuantity) > 0) &&
                                            <Typography
                                                text="IN STOCK"
                                                icon="done"
                                                variant="button"
                                                style={{ color: 'rgb(5, 153, 54)' }}
                                            />
                                            ||
                                            <Typography
                                                text="OUT OF STOCK"
                                                icon="cancel"
                                                variant="button"
                                                style={{ color: 'rgb(189, 6, 61)' }}
                                            />
                                        }
                                    </Box>
                                    <Divider className="t-extend-hr-2" />
                                </>
                            }
                            {
                                data.advanced_details &&
                                <>
                                    <Box m={2}> <Typography variant="button" text={"Product Details"} /> </Box>
                                    <Box m={2}>
                                        {
                                            Object.keys(data.advanced_details || []).map((i, key) =>
                                                data.advanced_details[i] &&
                                                <Grid container key={key} spacing={2}>
                                                    <Grid item xs={6}>
                                                        <Typography
                                                            text={productAdvancedDetailsMapper[i]}
                                                            size="overline" />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography
                                                            text={data.advanced_details[i]}
                                                            size="subtitle2" />
                                                    </Grid>
                                                </Grid>
                                            )
                                        }
                                    </Box>
                                </>
                            }
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        );
    }
}
