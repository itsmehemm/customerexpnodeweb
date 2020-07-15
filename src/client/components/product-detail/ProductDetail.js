import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import ShareIcon from '@material-ui/icons/Share';
import InputAdornment from '@material-ui/core/InputAdornment';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TextField from '../common/elements/TextField';
import SmallButtonGroup from '../common/elements/SmallButtonGroup';
import PrimaryIconButton from '../common/elements/PrimaryIconButton';
import ButtonLoader from '../common/elements/ButtonLoader';
import SmallImageButtonGroup from '../common/elements/SmallImageButtonGroup';
import Amount from '../common/elements/Amount';
import LargeBtn from '../common/elements/LargeBtn';
import Typography from '../common/elements/Typography';
import ProductImages from './ProductImages';
import InstantOrderModal from '../../modals/instant-order/InstantOrderModal';
import ProductDetailModal from '../../modals/product-detail/ProductDetailModal';
import { productAdvancedDetailsMapper } from '../../lib/mappers';
import {
    createInstantOrder,
    updateDeliveryPincode
} from '../../actions';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
    COMPLETED,
    UNLIMITED,
    DELIVERABLE,
    NOT_DELIVERABLE,
    INSTANT_PURCHASE
} from '../../lib/constants';

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
        document.title = `Product: ${this.props.data.name} - Tinnat.com`;
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

    async instantPurchase() {
        const { selection, stockQuantity, delivery } = this.state;
        if (selection.color && selection.size) {
            if ((stockQuantity === UNLIMITED || parseInt(stockQuantity) > 0) && delivery && delivery.status === DELIVERABLE) {
                await this.setState({ create_order_status: OPERATION_LOADING });
                const instantOrderModal = new InstantOrderModal();
                instantOrderModal.updateCreateDataFromState(this.state);
                try {
                    const response = await createInstantOrder(instantOrderModal.buildCreateOrderRequest());
                    if (response && response.status === COMPLETED) {
                        const next = response.links.filter(link => link.name === INSTANT_PURCHASE)
                        window.location.href = next[0].href;
                    }
                    await this.setState({ create_order_status: OPERATION_LOADING_COMPLETED });
                } catch (error) {
                    await this.setState({ create_order_status: OPERATION_LOADING_COMPLETED });
                }
            } else {
                if (!delivery) {
                    await this.notify('Enter delivery pincode to proceed');
                } else if (delivery.status === NOT_DELIVERABLE) {
                    await this.notify('Sorry, we don\'t deliver to this area');
                } else if (parseInt(stockQuantity) <= 0) {
                    await this.notify('Sorry, this product is out of stock');
                } else {
                    await this.notify('There was an error while creating the order.');
                }
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

    async updatePincode() {
        await this.setState({ delivery_status: OPERATION_LOADING });
        const { pincode } = this.state;
        const response = await updateDeliveryPincode(pincode);
        if (response && response.status === COMPLETED) {
            await this.setState({ delivery: response.delivery, delivery_error: null });
        } else if (response && response.error) {
            await this.setState({ delivery: null, delivery_error: response.error.description })
        } else {
            await this.setState({ delivery: null, delivery_error: 'Please try again.' })
        }
        await this.setState({ delivery_status: OPERATION_LOADING_COMPLETED });
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
            selection,
            pincode,
            delivery,
            delivery_status,
            delivery_error,
            create_order_status,
        } = this.state;
        return (
            <Container style={{ padding: '1em' }} maxWidth='lg'>
                <Snackbar
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    key={`2`}
                    open={notification.status}
                    onClose={this.closeNotification}
                    message={notification.message}
                />
                <Card variant='outlined'>
                    <Grid container>
                        <Grid item xs={5}>
                            <Box m={2}>
                                <ProductImages
                                    images={pictureLinks}
                                    style={{
                                        height: '500px',
                                        width: '100%'
                                    }}
                                />
                                <LargeBtn
                                    disabled={
                                        !((stockQuantity === UNLIMITED ||
                                            parseInt(stockQuantity) > 0) &&
                                            delivery &&
                                            delivery.status === DELIVERABLE)
                                    }
                                    loading={create_order_status === OPERATION_LOADING}
                                    onClick={this.instantPurchase}
                                    name='BUY NOW'
                                    color='rgb(247, 36, 52)'
                                    icon='trending_up'
                                />
                            </Box>
                        </Grid>
                        <Divider orientation='vertical' flexItem />
                        <Grid item xs={6}>
                            <Grid container>
                                <Grid item xs={9}>
                                    <Box m={2}>
                                        <Typography
                                            text={data.name}
                                            variant='h5' />
                                        <Typography
                                            text={data.description}
                                            size='body2' />
                                    </Box>
                                </Grid>
                                <Grid item xs={3}>
                                    <Box m={2}>
                                        <CopyToClipboard
                                            text={data.url}
                                            onCopy={() => this.notify('Product link copied!')}>
                                            <Button
                                                style={{ height: '100%', width: '100%', backgroundColor: 'rgb(247, 36, 52)', color: '#fff' }}
                                                variant='contained'
                                                startIcon={<ShareIcon style={{ fontSize: '2em' }} />} >
                                                Share
                                            </Button>
                                        </CopyToClipboard>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider className='t-extend-hr-2' />
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
                                            <Divider className='t-extend-hr-2' />
                                        </Grid>
                                    </>
                                }
                            </Grid>
                            <Box m={2}>
                                <Typography
                                    text={'Size'}
                                    variant='button'
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
                            <Divider className='t-extend-hr-2' />
                            <Box m={2}>
                                <Typography
                                    text={'Color'}
                                    variant='button'
                                />
                            </Box>
                            {
                                availableColors &&
                                availableColors.length > 0 &&
                                <>
                                    <Box m={2}>
                                        <Grid item xs={12}>
                                            <SmallImageButtonGroup
                                                name='color'
                                                size={selection.size}
                                                buttons={availableColors}
                                                onSelect={(data) => this.update('color', data)}
                                            />
                                            {
                                                !selection.color &&
                                                <Typography
                                                    text='select a color of your choice'
                                                    variant='caption'
                                                    style={{ color: 'rgb(189, 6, 61)' }}
                                                />
                                            }
                                        </Grid>
                                    </Box>
                                    <Divider className='t-extend-hr-2' />
                                </>
                            }
                            {
                                stockQuantity !== null && stockQuantity !== undefined &&
                                <>
                                    <Box m={2}>
                                        {
                                            (stockQuantity === 'UNLIMITED' || parseInt(stockQuantity) > 0) &&
                                            <Typography
                                                text='IN STOCK'
                                                icon='done'
                                                variant='button'
                                                style={{ color: 'rgb(5, 153, 54)' }}
                                            />
                                            ||
                                            <Typography
                                                text='OUT OF STOCK'
                                                icon='cancel'
                                                variant='button'
                                                style={{ color: 'rgb(189, 6, 61)' }}
                                            />
                                        }
                                    </Box>
                                    <Divider className='t-extend-hr-2' />
                                </>
                            }
                            {
                                <>
                                    <Box m={2}> <Typography variant='button' text={'Delivery'} /> </Box>
                                    <Box m={2}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <TextField
                                                    required
                                                    type='number'
                                                    label='Pincode'
                                                    variant='outlined'
                                                    value={pincode}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position='start'>
                                                                <LocationOnIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    onChange={(pincode) => this.setState({ pincode: pincode })}
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            this.updatePincode();
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={2}>
                                                {
                                                    delivery_status === OPERATION_LOADING_COMPLETED &&
                                                    <PrimaryIconButton
                                                        Icon={<CheckIcon style={{ fontSize: '2em' }} />}
                                                        onClick={() => this.updatePincode()}
                                                    />
                                                }
                                                {
                                                    delivery_status === OPERATION_LOADING &&
                                                    <ButtonLoader />
                                                }
                                            </Grid>
                                            {
                                                delivery_error &&
                                                <Grid item xs={12}>
                                                    <Typography text={delivery_error} variant='caption' style={{ color: 'rgb(247, 36, 52)' }} />
                                                </Grid>
                                            }
                                        </Grid>
                                    </Box>
                                    {
                                        delivery && delivery.status === 'DELIVERABLE' &&
                                        <Box m={2}>
                                            <Typography
                                                icon='local_shipping'
                                                text={delivery.formatted.delivery_string}
                                                variant='body2'
                                                style={{ color: 'rgb(5, 153, 54)' }}
                                            />
                                        </Box>
                                    }
                                    {
                                        delivery && delivery.status === 'NOT_DELIVERABLE' &&
                                        <Box m={2}>
                                            <Typography
                                                icon='local_shipping'
                                                text='Sorry, this item is not deliverable to the address.'
                                                variant='body2'
                                                style={{ color: 'rgb(247, 36, 52)' }}
                                            />
                                        </Box>
                                    }
                                    <Divider className='t-extend-hr-2' />
                                </>
                            }

                            {
                                data.advanced_details &&
                                <>
                                    <Box m={2}> <Typography variant='button' text={'Product Details'} /> </Box>
                                    <Box m={2}>
                                        {
                                            Object.keys(data.advanced_details || []).map((i, key) =>
                                                data.advanced_details[i] &&
                                                <Grid container key={key} spacing={2}>
                                                    <Grid item xs={6}>
                                                        <Typography
                                                            text={productAdvancedDetailsMapper[i]}
                                                            size='overline' />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography
                                                            text={data.advanced_details[i]}
                                                            size='subtitle2' />
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
};
