import React, { Component } from 'react';
import Script from 'react-load-script'
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Header from '../header/Header';
import ComponentLoader from '../common/loaders/ComponentLoader';
import Typography from '../common/elements/Typography';
import ViewAddress from '../instant-purchase/widgets/ViewAddress';
import OrderSummary from '../instant-purchase/widgets/OrderSummary';
import { renderSmartPaymentButtons } from './paypal-sdk';
import {
    getPaymentPlan,
    razorpayPayment
} from '../../actions';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
    OPERATION_LOADING_ERROR
} from '../../lib/constants';

export default class InstantPurchasePayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentPlan: null,
            delivery: null,
            paypalSdkLoaded: false,
            paypalSdkError: false,
            razorpaySdkLoaded: false,
            razorpaySdkError: false,
            paymentChoice: 'razorpay',
            notification: null,
            status: OPERATION_LOADING
        };
    }

    async componentDidMount() {
        const orderId = this.props.match.params.orderid;
        document.title = `Payment for your order - Tinnat`;
        if (orderId) {
            try {
                const response = await getPaymentPlan(orderId);
                if (response && response.payment_plan) {
                    await this.setState({
                        status: OPERATION_LOADING_COMPLETED,
                        paymentPlan: response.payment_plan,
                        delivery: response.delivery
                    });
                } else {
                    this.setState({
                        status: OPERATION_LOADING_ERROR
                    });
                }
            } catch (error) {
                await this.setState({
                    status: OPERATION_LOADING_ERROR
                });
            }
        } else {
            await this.setState({
                status: OPERATION_LOADING_ERROR
            });
        }
    }

    handlePaypalSdkInit() {
        this.setState({ paypalSdkLoaded: false })
    }

    handlePaypalSdkError() {
        this.setState({ paypalSdkError: true })
    }

    handlePaypalSdkLoad() {
        this.setState({ paypalSdkLoaded: true });
        renderSmartPaymentButtons(paypal, this.state.paymentPlan);
    }

    handleRazorpaySdkInit() {
        this.setState({ razorpaySdkLoaded: false })
    }

    handleRazorpaySdkError() {
        this.setState({ razorpaySdkError: true })
    }

    handleRazorpaySdkLoad() {
        this.setState({ razorpaySdkLoaded: true });
        const { paymentPlan } = this.state;
        const { razorpay, tinnat } = paymentPlan;
        const options = {
            key: razorpay.api_key,
            amount: razorpay.order_details.amount,
            currency: razorpay.order_details.currency,
            name: 'Tinnat Inc.',
            description: tinnat.order_id,
            image: 'http://localhost:3000/tinnat-logo.png',
            order_id: razorpay.order_id,
            handler: async (response) => {
                if (response) {
                    await this.setState({
                        status: OPERATION_LOADING
                    });
                    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
                    const paymentResponse = await razorpayPayment({
                        id: tinnat.order_id,
                        payment_id: razorpay_payment_id,
                        order_id: razorpay_order_id,
                        signature: razorpay_signature,
                    });
                    await this.setState({ notification: null });
                    if (paymentResponse && paymentResponse.message === 'PAYMENT_COMPLETED') {
                        window.location.href = '/instant-purchase/complete/' + tinnat.order_id;
                    }
                } else {
                    this.setState({
                        status: OPERATION_LOADING_COMPLETED,
                        notification: 'Sorry, the payment for the order failed. Please try again. If amount is deducted, we will refund you in 2-3 working days.'
                    });
                }
            },
            prefill: {
                name: tinnat.order_details.billing_address.name,
                email: tinnat.order_details.personal_information.email,
                contact: tinnat.order_details.personal_information.phone_number,
            },
            theme: {
                color: 'rgb(247, 36, 52)'
            }
        };
        var razorPay = new Razorpay(options);
        document.getElementById('rzp-button1').onclick = function (e) {
            razorPay.open();
            e.preventDefault();
        };
    }

    render() {
        const {
            status,
            paymentPlan,
            delivery,
            notification
        } = this.state;
        return (
            <>
                <Header />
                <Container style={{ padding: '1em' }} maxWidth='lg'>
                    <Card variant="outlined">
                        {status === OPERATION_LOADING && <ComponentLoader />}
                        {status === OPERATION_LOADING_ERROR && <div> CANNOT RETRIVE PAYMENT PLAN FOR THIS ORDER </div>}
                        {status === OPERATION_LOADING_COMPLETED &&
                            <Grid container>
                                <Grid item xs={12}>
                                    <Box m={2}>
                                        <Grid container>
                                            <Grid item>
                                                <Box m={1}>
                                                    <Typography
                                                        className='t-breadcrumb-inactive'
                                                        variant='button'
                                                        gutterBottom
                                                        text='Instant Purchase' />
                                                </Box>
                                            </Grid>
                                            <Grid item>
                                                <Box m={1}>
                                                    <Typography
                                                        variant='button'
                                                        gutterBottom
                                                        icon='arrow_forward_ios'
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item>
                                                <Box m={1}>
                                                    <Typography
                                                        className='t-breadcrumb'
                                                        variant='button'
                                                        gutterBottom
                                                        text={paymentPlan.tinnat.order_details.purchase_items[0].data.name}
                                                        onClick={() => window.location.href = '/product/' + paymentPlan.tinnat.order_details.purchase_items[0].id}
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item>
                                                <Box m={1}>
                                                    <Typography
                                                        variant='button'
                                                        gutterBottom
                                                        icon='arrow_forward_ios'
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item>
                                                <Box m={1}>
                                                    <Typography
                                                        className='t-breadcrumb'
                                                        variant='button'
                                                        gutterBottom
                                                        text='REVIEW ORDER'
                                                        onClick={() => window.location.href = '/instant-purchase/' + paymentPlan.tinnat.order_id}
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item>
                                                <Box m={1}>
                                                    <Typography
                                                        className='t-breadcrumb'
                                                        variant='button'
                                                        gutterBottom
                                                        icon='arrow_forward_ios'
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item>
                                                <Box m={1}>
                                                    <Typography
                                                        className='t-breadcrumb-active'
                                                        variant='button'
                                                        gutterBottom
                                                        text='PLACE YOUR ORDER AND PAY' />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                {
                                    notification &&
                                    <Grid item xs={12}>
                                        <Box m={2}>
                                            <Alert severity="success">
                                                {notification}
                                            </Alert>
                                        </Box>
                                    </Grid>
                                }
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item>
                                            <Grid container>
                                                <Grid item xs={10}>
                                                    <Box m={2}>
                                                        <Typography variant='h6' text='Ship to' gutterBottom />
                                                        <Typography
                                                            text='Your order will be shipped to the following address.'
                                                            variant='caption'
                                                        />
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Box m={2}>
                                                        <Typography
                                                            className='t-text-link-2'
                                                            variant='button'
                                                            text='EDIT'
                                                            gutterBottom
                                                            onClick={() => window.location.href = '/instant-purchase/' + paymentPlan.tinnat.order_id}
                                                        />
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                            <Box m={2}>
                                                <ViewAddress
                                                    {...paymentPlan.tinnat.order_details.shipping_address}
                                                    forceShow={true}
                                                />
                                            </Box>
                                            <Divider />
                                            <Grid container>
                                                <Grid item xs={10}>
                                                    <Box m={2}>
                                                        <Typography variant='h6' text='Billing Address' gutterBottom />
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Box m={2}>
                                                        <Typography
                                                            className='t-text-link-2'
                                                            variant='button'
                                                            text='EDIT'
                                                            gutterBottom
                                                            onClick={() => window.location.href = '/instant-purchase/' + paymentPlan.tinnat.order_id}
                                                        />
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                            <Box m={2}>
                                                <ViewAddress
                                                    {...paymentPlan.tinnat.order_details.billing_address}
                                                    forceShow={true}
                                                />
                                            </Box>
                                        </Grid>
                                        <Divider orientation="vertical" flexItem />
                                        <Grid item xs={8} >
                                            <Grid container alignItems="right">
                                                <Grid item xs={12}>
                                                    <Box m={2}>
                                                        <Typography text='Confirm your order' />
                                                        <Typography variant='caption' gutterBottom text={`Here is what you're making a purchase.`} />
                                                    </Box>
                                                    <OrderSummary
                                                        id={paymentPlan.tinnat.order_details.purchase_items[0].id}
                                                        name={paymentPlan.tinnat.order_details.purchase_items[0].data.name}
                                                        description={paymentPlan.tinnat.order_details.purchase_items[0].data.description}
                                                        payment={paymentPlan.tinnat.order_details.amount}
                                                        amount={paymentPlan.tinnat.order_details.purchase_items[0].amount}
                                                        discount={paymentPlan.tinnat.order_details.purchase_items[0].amount.discount}
                                                        size={paymentPlan.tinnat.order_details.purchase_items[0].size}
                                                        color={paymentPlan.tinnat.order_details.purchase_items[0].color}
                                                        quantity={paymentPlan.tinnat.order_details.purchase_items[0].quantity}
                                                        picture_links={paymentPlan.tinnat.order_details.purchase_items[0].picture_links}
                                                        delivery={delivery}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Box m={2}>
                                                        <Typography variant='h6' text='Place your order and pay' gutterBottom></Typography>
                                                        <Typography
                                                            text='Secure payments with several options.'
                                                            variant='caption'
                                                        />
                                                    </Box>
                                                    <Box m={2}>
                                                        <FormControl fullWidth={true} component='fieldset'>
                                                            <RadioGroup aria-label='pay' name='pay' value={this.state.paymentChoice} onChange={(event) => this.setState({ paymentChoice: event.target.value })}>
                                                                <FormControlLabel value='razorpay' control={<Radio />} label='Credit Card / Debit Card / Internet Banking / UPI' />
                                                                {
                                                                    this.state.paymentChoice === 'razorpay' &&
                                                                    <Box m={2}>
                                                                        <Typography
                                                                            text='Pay securely by Credit or Debit card or Internet Banking through Razorpay.'
                                                                            variant='caption'
                                                                        />
                                                                        <button className='paynow-btn' id='rzp-button1'>PAY NOW</button>
                                                                        <Script
                                                                            url='https://checkout.razorpay.com/v1/checkout.js'
                                                                            onCreate={this.handleRazorpaySdkInit.bind(this)}
                                                                            onError={this.handleRazorpaySdkError.bind(this)}
                                                                            onLoad={this.handleRazorpaySdkLoad.bind(this)}
                                                                        />
                                                                    </Box>
                                                                }
                                                                <FormControlLabel value='paypal' control={<Radio />} label='Pay using PayPal' />
                                                                {
                                                                    this.state.paymentChoice === 'paypal' &&
                                                                    <Box m={2}>
                                                                        <Typography
                                                                            text="You'll be securely redirected to PayPal to enter your password and complete your purchase."
                                                                            variant="caption"
                                                                        />
                                                                        <div id='paypal-button-container'></div>
                                                                        <Script
                                                                            url={`${paymentPlan.paypal.sdk.url}/sdk/js?components=buttons&client-id=${paymentPlan.paypal.client_id}&currency=INR`}
                                                                            onCreate={this.handlePaypalSdkInit.bind(this)}
                                                                            onError={this.handlePaypalSdkError.bind(this)}
                                                                            onLoad={this.handlePaypalSdkLoad.bind(this)}
                                                                        />
                                                                    </Box>
                                                                }
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        }
                    </Card>
                </Container>
            </>
        );
    }
};