import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import Box from '@material-ui/core/Box';
import Header from '../header/Header';
import ComponentLoader from '../common/loaders/ComponentLoader';
import Typography from '../common/elements/Typography';
import LargeBtn from '../common/elements/LargeBtn';
import OrderSummary from './widgets/OrderSummary';
import PersonalInformation from './widgets/PersonalInformation';
import Address from './widgets/Address';
import InstantOrderModal from '../../modals/instant-order/InstantOrderModal';
import {
    getOrderDetails,
    patchOrder
} from '../../actions';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
    OPERATION_LOADING_ERROR,
    COMPONENT_STATUS_INVALID,
    COMPONENT_MAPPER
} from '../../lib/constants';

export default class InstantPurchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: OPERATION_LOADING,
            errors: new Set(),
            notification: {
                status: false,
                message: null
            },
            ...new InstantOrderModal().getDefaultData(),
        }
        this.update = this.update.bind(this);
        this.patch = this.patch.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
    }

    async componentDidMount() {
        const orderid = this.props.match.params.orderid;
        const instantOrderModal = new InstantOrderModal();
        try {
            const order = await getOrderDetails(orderid);
            if (order && order.id) {
                instantOrderModal.updateData(order);
                await this.setState({
                    status: OPERATION_LOADING_COMPLETED,
                    ...instantOrderModal.getData()
                });
            } else {
                await this.setState({
                    status: OPERATION_LOADING_ERROR,
                    ...instantOrderModal.getDefaultData()
                });
            }
        } catch (error) {
            await this.setState({
                status: OPERATION_LOADING_ERROR,
                ...instantOrderModal.getDefaultData()
            });
        }
    }

    async update(name, value) {
        let { status } = value;
        let { errors } = this.state;
        if (status === COMPONENT_STATUS_INVALID) {
            errors.add(COMPONENT_MAPPER[name]);
        } else {
            errors.delete(COMPONENT_MAPPER[name]);
        }
        await this.setState({
            errors: errors,
            [name]: value
        });
    }

    async patch() {
        const { errors } = this.state;
        if (errors.size === 0) {
            const instantOrderModal = new InstantOrderModal();
            instantOrderModal.updatePatchDataFromState(this.state);
            try {
                const response = await patchOrder(instantOrderModal.buildPatchOrderRequest());
                if (response && response.status === 'COMPLETED') {
                    const next = response.links.filter(link => link.name === 'PAYMENT');
                    window.location.href = next[0].href;
                } else if (response && response.status === 'PENDING') {
                    await this.setState({
                        notification: {
                            status: true,
                            message: response.reason
                        }
                    });
                } else {
                    console.log('Error patching order');
                }
            } catch (error) {
                console.log('Error patching order', error);
            }
        } else {
            await this.setState({
                notification: {
                    status: true,
                    message: 'Fill all required information to continue'
                }
            });
        }
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
            status,
            personal_information,
            purchase_item,
            amount,
            billing_address,
            shipping_address,
            delivery,
            notification
        } = this.state;
        return (
            <>
                <Header />
                <Snackbar
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    key={`2`}
                    open={notification.status}
                    onClose={this.closeNotification}
                    message={notification.message}
                />
                <Container style={{ padding: '1em' }} maxWidth="lg">
                    <Card variant="outlined">
                        <Grid container>
                            {status === OPERATION_LOADING && <ComponentLoader />}
                            {status === OPERATION_LOADING_ERROR && <div>Invalid order</div>}
                            {status === OPERATION_LOADING_COMPLETED &&
                                <>
                                    <Grid item xs={12}>
                                        <Box m={2}>
                                            <Grid container>
                                                <Grid item>
                                                    <Box m={1}>
                                                        <Typography
                                                            className="t-breadcrumb-inactive"
                                                            variant="button"
                                                            gutterBottom
                                                            text="Instant Purchase" />
                                                    </Box>
                                                </Grid>
                                                <Grid item>
                                                    <Box m={1}>
                                                        <Typography
                                                            variant="button"
                                                            gutterBottom
                                                            icon="arrow_forward_ios"
                                                        />
                                                    </Box>
                                                </Grid>
                                                <Grid item>
                                                    <Box m={1}>
                                                        <Typography
                                                            className="t-breadcrumb"
                                                            variant="button"
                                                            gutterBottom
                                                            text={purchase_item.data.name}
                                                            onClick={() => window.location.href = '/product/' + purchase_item.id}
                                                        />
                                                    </Box>
                                                </Grid>
                                                <Grid item>
                                                    <Box m={1}>
                                                        <Typography
                                                            variant="button"
                                                            gutterBottom
                                                            icon="arrow_forward_ios"
                                                        />
                                                    </Box>
                                                </Grid>
                                                <Grid item>
                                                    <Box m={1}>
                                                        <Typography
                                                            className="t-breadcrumb-active"
                                                            variant="button"
                                                            gutterBottom
                                                            text="REVIEW ORDER"
                                                        />
                                                    </Box>
                                                </Grid>
                                                <Grid item>
                                                    <Box m={1}>
                                                        <Typography
                                                            variant="button"
                                                            gutterBottom
                                                            icon="arrow_forward_ios"
                                                        />
                                                    </Box>
                                                </Grid>
                                                <Grid item>
                                                    <Box m={1}>
                                                        <Typography
                                                            className="t-breadcrumb-inactive"
                                                            variant="button"
                                                            gutterBottom
                                                            text="PROCEED TO PAY YOUR ORDER" />
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <PersonalInformation
                                            email={personal_information.email}
                                            phone_number={personal_information.phone_number}
                                            update={this.update}
                                        />
                                        <Divider />
                                        <Address
                                            label="2. Billing Address"
                                            {...billing_address}
                                            update={((data) => this.update('billing_address', data))}
                                        />
                                        <Divider />
                                        <Address
                                            label="3. Shipping Address"
                                            {...shipping_address}
                                            isShipping={true}
                                            update={((data) => this.update('shipping_address', data))}
                                        />
                                        <Box m={2}>
                                            <LargeBtn
                                                name="PROCEED TO PAY YOUR ORDER"
                                                icon="arrow_forward"
                                                color="rgb(247, 36, 52)"
                                                onClick={this.patch} />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Divider orientation="vertical" />
                                    </Grid>
                                    <Grid item>
                                        <Box m={2}>
                                            <LargeBtn
                                                name="PROCEED TO PAY YOUR ORDER"
                                                icon="arrow_forward"
                                                onClick={this.patch}
                                            />
                                        </Box>
                                        <Box m={2}>
                                            <Typography text="Review Order" />
                                            <Typography variant="caption" gutterBottom text="Here is what you're about to purchase." />
                                        </Box>
                                        <OrderSummary
                                            id={purchase_item.id}
                                            name={purchase_item.data.name}
                                            description={purchase_item.data.description}
                                            payment={amount}
                                            amount={purchase_item.amount}
                                            discount={purchase_item.amount.discount}
                                            size={purchase_item.size}
                                            color={purchase_item.color}
                                            quantity={purchase_item.quantity}
                                            picture_links={purchase_item.picture_links}
                                            delivery={delivery}
                                        />
                                    </Grid>
                                </>
                            }
                        </Grid>
                    </Card>
                </Container>
            </>
        );
    }
}