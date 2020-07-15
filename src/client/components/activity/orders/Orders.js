import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ConsumerApp from '../../common/ConsumerApp';
import Typography from '../../common/elements/Typography';
import ComponentLoader from '../../common/loaders/ComponentLoader';
import Order from './widgets/Order';
import { getAllPurchases } from '../../../actions';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
    OPERATION_LOADING_ERROR
} from '../../../lib/constants';

export default class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: OPERATION_LOADING,
            orders: []
        };
    }

    async componentDidMount() {
        document.title = `All Orders - Tinnat.com`;
        const response = await getAllPurchases();
        if (response && Array.isArray(response.orders)) {
            await this.setState({
                status: OPERATION_LOADING_COMPLETED,
                orders: response.orders
            });
        } else {
            await this.setState({ status: OPERATION_LOADING_ERROR });
        }
    }

    render() {
        const {
            status,
            orders
        } = this.state;
        return (
            <ConsumerApp>
                <Container maxWidth='lg'>
                    {status === OPERATION_LOADING && <ComponentLoader />}
                    {
                        status === OPERATION_LOADING_COMPLETED &&
                        Array.isArray(orders) &&
                        orders.length === 0 &&
                        <Box m={2}>
                            <Typography variant='body1' align='center' text={`You've not purchased any item`} />
                        </Box>
                    }
                    {
                        status === OPERATION_LOADING_COMPLETED &&
                        orders.length > 0 &&
                        orders.map((order, key) => <Order {...order} key={key} />)
                    }
                </Container>
            </ConsumerApp >
        );
    }
};