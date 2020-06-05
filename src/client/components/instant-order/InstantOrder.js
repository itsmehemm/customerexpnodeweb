import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Box from '@material-ui/core/Box';
import Header from '../header/Header';
import ComponentLoader from '../common/loaders/ComponentLoader';
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

export default class InstantOrder extends Component {

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
                if (response && response.instant_payment_url) {
                    window.location.href = response.instant_payment_url;
                } else {
                    console.log('ERROR PATCHING ORDER');
                }
            } catch (error) {
                console.log(error)
                console.log('ERROR PATCHING ORDER');
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
            billing_address,
            shipping_address,
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
                <Container style={{ padding: '1em' }} maxWidth="md">
                    <Grid container>
                        {status === OPERATION_LOADING && <ComponentLoader />}
                        {status === OPERATION_LOADING_ERROR && <div>Invalid order</div>}
                        {status === OPERATION_LOADING_COMPLETED &&
                            <>
                                <Grid item xs={6} />
                                <Grid item xs={6}>
                                    <Box m={2}>
                                        <LargeBtn
                                            name="REVIEW AND PLACE ORDER"
                                            icon="arrow_forward"
                                            color="rgb(23, 105, 236)"
                                            onClick={this.patch}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <OrderSummary
                                        name={purchase_item.data.name}
                                        description={purchase_item.data.description}
                                        cost={purchase_item.data.cost}
                                        discount={purchase_item.data.discount}
                                        size={purchase_item.size}
                                        color={purchase_item.color}
                                        quantity={purchase_item.quantity}
                                        picture_links={purchase_item.data.picture_links}
                                    />
                                    <PersonalInformation
                                        email={personal_information.email}
                                        phone_number={personal_information.phone_number}
                                        update={this.update}
                                    />
                                    <Address
                                        label="BILLING ADDRESS"
                                        {...billing_address}
                                        update={((data) => this.update('billing_address', data))}
                                    />
                                    {
                                        <Address
                                            label="SHIPPING ADDRESS"
                                            {...shipping_address}
                                            isShipping={true}
                                            update={((data) => this.update('shipping_address', data))}
                                        />
                                    }
                                </Grid>
                                <Grid item xs={6} />
                                <Grid item xs={6}>
                                    <Box m={2}>
                                        <LargeBtn
                                            name="REVIEW AND PLACE ORDER"
                                            icon="arrow_forward"
                                            color="rgb(23, 105, 236)"
                                            onClick={this.patch} />
                                    </Box>
                                </Grid>
                            </>
                        }
                    </Grid>
                </Container>
            </>
        );
    }
}