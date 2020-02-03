import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PriceWidget from './PriceWidget';
import DeliveryInformation from './DeliveryInformation';
import OrderDetails from './OrderDetails';
import Header from '../common/Header';
import Footer from '../common/Footer';

export default class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            delivery_information: {
                name: 's',
                mobile_number: '1',
                address_line_1: 's',
                address_line_2: 's',
                city: 's',
                pincode: '1',
                state: 's',
                landmark: 's',
            },
            order: {},
            enable_order_summary: false
        }
    }

    update(type, data) {
        this.setState({ [type]: data });

        if (type === 'delivery_information' && data) {
            console.log('order updated')
            this.setState({ enable_order_summary: true });
        }
    }

    render() {
        const { delivery_information, enable_order_summary, order } = this.state;
        return (
            <div>
                <Header />
                <Container maxWidth={"lg"}>
                    <Grid container>
                        <Grid item xs={8}>
                            <Box m={2}>
                                <DeliveryInformation
                                    delivery_information={delivery_information}
                                    update={(data) => this.update('delivery_information', data)} />
                            </Box>
                            <Box m={2}>
                                <OrderDetails
                                    order={order}
                                    delivery_information={delivery_information}
                                    enable={enable_order_summary} />
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box m={2}><PriceWidget /></Box>
                        </Grid>
                    </Grid>
                </Container>
                <Footer />
            </div>
        );
    }
}