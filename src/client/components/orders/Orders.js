import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import ConsumerApp from '../common/ConsumerApp';
import ComponentLoader from '../common/loaders/ComponentLoader';
import Order from './widgets/Order';
import { getAllPurchases } from '../../actions';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
    OPERATION_LOADING_ERROR
} from '../../lib/constants';

export default class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: OPERATION_LOADING,
            orders: []
        };
    }

    async componentDidMount() {
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
                <Container maxWidth="lg">
                    {status === OPERATION_LOADING && <ComponentLoader />}
                    {status === OPERATION_LOADING_COMPLETED && orders.length === 0 && <div> No orders found</div>}
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