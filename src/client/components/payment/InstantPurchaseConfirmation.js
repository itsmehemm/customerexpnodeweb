import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import Typography from '../common/elements/Typography';
import Header from '../header/Header';
import ComponentLoader from '../common/loaders/ComponentLoader';
import ViewAddress from '../instant-purchase/widgets/ViewAddress';
import OrderSummary from '../instant-purchase/widgets/OrderSummary';
import {
    getOrderDetails
} from '../../actions';
import InstantOrderModal from '../../modals/instant-order/InstantOrderModal';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
} from '../../lib/constants';

export default class InstantPurchaseConfirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: OPERATION_LOADING
        }
    }

    async componentDidMount() {
        const orderid = this.props.match.params.orderid;
        try {
            const order = await getOrderDetails(orderid);
            if (order && order.payment_information && order.payment_information.status === 'COMPLETED') {
                const instantOrderModal = new InstantOrderModal();
                instantOrderModal.updateData(order);
                await this.setState({
                    status: OPERATION_LOADING_COMPLETED,
                    ...instantOrderModal.getData()
                });
            }
        } catch (error) {

        }
    }

    render() {
        const {
            status,
            id,
            billing_address,
            personal_information,
            purchase_items,
            amount
        } = this.state;
        console.log(JSON.stringify(this.state));
        return (
            <>
                <Header />
                <Container style={{ padding: '1em' }} maxWidth="lg">
                    {
                        status === OPERATION_LOADING_COMPLETED &&
                        <Card variant="outlined">
                            <Grid container>
                                <Grid item xs={12}>
                                    <Box m={2}>
                                        <Alert severity="success">
                                            Thank you, {billing_address && billing_address.name} <br></br>
                                            Your order (Order ID: {id}) has been placed successfully.
                                        </Alert>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item>
                                            <Box m={2}>
                                                <Typography text={`Order Summary`} />
                                            </Box>
                                            <OrderSummary
                                                id={id}
                                                name={purchase_items[0].data.name}
                                                description={purchase_items[0].data.description}
                                                amount={purchase_items[0].amount}
                                                payment={amount}
                                                discount={purchase_items[0].amount.discount}
                                                size={purchase_items[0].size}
                                                color={purchase_items[0].color}
                                                quantity={purchase_items[0].quantity}
                                                picture_links={purchase_items[0].picture_links}
                                            />
                                        </Grid>
                                        <Divider orientation="vertical" flexItem />
                                        <Grid item xs={5}>
                                            <Box m={2}>
                                                <Typography text={`Your Order ID: ${id}`} />
                                                <Typography text="Placed on Tue, 9 Jan, 2020" variant="caption" />
                                            </Box>
                                            <Divider />
                                            <Box m={2}>
                                                <Typography text="Items will be delivered to:" variant="subtitle2" />
                                                <ViewAddress
                                                    {...billing_address}
                                                    forceShow={true}
                                                />
                                            </Box>
                                            <Divider />
                                            <Box m={2}>
                                                <Typography text={`Check your email at ${personal_information && personal_information.email} for further information.`} variant="subtitle2" />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    }
                    {status === OPERATION_LOADING && <ComponentLoader />}
                </Container>
            </>
        );
    }
}