import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ConsumerApp from '../common/ConsumerApp';
import ComponentLoader from '../common/loaders/ComponentLoader';
import Component404 from '../common/errors/widgets/Component404';
import ViewAddress from '../instant-purchase/widgets/ViewAddress';
import Typography from '../common/elements/Typography';
import OrderDetail from './widgets/OrderDetail';
import { getPurchaseById } from '../../actions';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
    OPERATION_LOADING_ERROR
} from '../../lib/constants';

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: OPERATION_LOADING
        }
    }

    async componentDidMount() {
        const orderId = this.props.match.params.orderid;
        const order = await getPurchaseById(orderId);
        if (order && order.id) {
            await this.setState({
                status: OPERATION_LOADING_COMPLETED,
                order: order
            });
        } else {
            await this.setState({
                status: OPERATION_LOADING_ERROR
            });
        }
    }

    render() {
        const {
            status,
            order
        } = this.state;
        return (
            <ConsumerApp>
                {status === OPERATION_LOADING && <ComponentLoader />}
                {status === OPERATION_LOADING_ERROR && <Component404 />}
                {
                    status === OPERATION_LOADING_COMPLETED &&
                    order &&
                    <Container maxWidth={"lg"}>
                        {
                            order.shipping_address &&
                            <Box m={2}>
                                <Card variant="outlined">
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Box m={2}>
                                                <Typography variant="button" text="Delivery Address" />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box m={2}>
                                                <ViewAddress {...order.shipping_address} forceShow={true} />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Box>
                        }
                        <OrderDetail {...order} />
                    </Container>
                }
            </ConsumerApp>
        );
    }
};