import React, { Component } from 'react';
import Script from 'react-load-script'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Header from '../header/Header';
import ComponentLoader from '../common/ComponentLoader';
import Typography from '../common/elements/Typography';
import ViewAddress from '../instant-order/widgets/ViewAddress';
import OrderSummary from '../instant-order/widgets/OrderSummary';
import { getPaymentPlan } from '../../actions';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
    OPERATION_LOADING_ERROR
} from '../../lib/constants';
import { renderSmartPaymentButtons } from './paypal-sdk';

export default class InstantOrderPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentPlan: null,
            scriptLoaded: false,
            scriptError: false,
            status: OPERATION_LOADING
        };
    }

    async componentDidMount() {
        const orderId = this.props.match.params.orderid;
        if (orderId) {
            try {
                const response = await getPaymentPlan(orderId);
                if (response && response.payment_plan) {
                    await this.setState({
                        status: OPERATION_LOADING_COMPLETED,
                        paymentPlan: response.payment_plan
                    });
                    const script = document.createElement("script");
                    script.type = "text/javascript";
                    script.src = `${response.payment_plan.paypal.sdk.url}/sdk/js?components=buttons&client-id=${response.payment_plan.paypal.client_id}`;
                    script['data-client-token'] = response.payment_plan.paypal.client_token;
                    // document.body.appendChild(script);
                } else {
                    this.setState({
                        status: OPERATION_LOADING_ERROR
                    });
                }
            } catch (error) {
                console.log('ERROR')
                await this.setState({
                    status: OPERATION_LOADING_ERROR
                });
            }
        } else {
            console.log('ERROR')
            await this.setState({
                status: OPERATION_LOADING_ERROR
            });
        }
    }

    handleScriptCreate() {
        this.setState({ scriptLoaded: false })
        console.log('CREATED');
    }

    handleScriptError() {
        this.setState({ scriptError: true })
        console.log('ERROR LOADING SDK');
    }

    handleScriptLoad() {
        this.setState({ scriptLoaded: true });
        console.log('LOADED');
        console.log(paypal);
        renderSmartPaymentButtons(paypal, this.state.paymentPlan);
    }

    render() {
        const { status, paymentPlan } = this.state;
        return (
            <>
                <Header />
                <Container style={{ padding: '1em' }} maxWidth="md">
                    {status === OPERATION_LOADING && <ComponentLoader />}
                    {status === OPERATION_LOADING_ERROR && <div> ORDER NOT FOUND </div>}
                    {status === OPERATION_LOADING_COMPLETED &&
                        <>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Box m={2}>
                                        <Typography text="PLACE YOUR ORDER" />
                                    </Box>
                                    <Box m={2}> <Divider /> </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={8}>
                                            <Box m={2}> <Typography text="Order Summary" /></Box>
                                            <OrderSummary
                                                hide_label={true}
                                                name={paymentPlan.tinnat.order_details.purchase_items[0].product_details.name}
                                                description={paymentPlan.tinnat.order_details.purchase_items[0].product_details.description}
                                                cost={paymentPlan.tinnat.order_details.purchase_items[0].product_details.cost}
                                                discount={paymentPlan.tinnat.order_details.purchase_items[0].product_details.discount}
                                                size={paymentPlan.tinnat.order_details.purchase_items[0].size}
                                                color={paymentPlan.tinnat.order_details.purchase_items[0].color}
                                                quantity={paymentPlan.tinnat.order_details.purchase_items[0].quantity}
                                                picture_links={paymentPlan.tinnat.order_details.purchase_items[0].product_details.picture_links}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box m={2}> <Typography text="Ship to" /></Box>
                                            <ViewAddress
                                                {...paymentPlan.tinnat.order_details.shipping_address}
                                            />
                                            <Box m={2}>
                                                <Typography text="Place your order and pay"></Typography>
                                                <Typography
                                                    text="You'll be securely redirected to PayPal to enter your password and complete your purchase"
                                                    component="span"
                                                    size="small"
                                                />
                                            </Box>
                                            <Box m={2}>
                                                <div id="paypal-button-container"></div>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Script
                                url={`${paymentPlan.paypal.sdk.url}/sdk/js?components=buttons&client-id=${paymentPlan.paypal.client_id}&currency=INR`}
                                onCreate={this.handleScriptCreate.bind(this)}
                                onError={this.handleScriptError.bind(this)}
                                onLoad={this.handleScriptLoad.bind(this)}
                            />
                        </>
                    }
                </Container>
            </>
        );
    }
};