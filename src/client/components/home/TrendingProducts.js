import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '../common/elements/Typography';
import ProductWidget from '../common/widgets/ProductWidget';
import { getFeaturedProducts } from '../../actions';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
    OPERATION_LOADING_ERROR
} from '../../lib/constants';

export default class TrendingProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: OPERATION_LOADING,
            products: []
        }
    }

    async componentDidMount() {
        try {
            const products = await getFeaturedProducts();
            if (Array.isArray(products)) {
                await this.setState({
                    products: products,
                    status: OPERATION_LOADING_COMPLETED
                });
            } else {
                await this.setState({
                    products: [],
                    status: OPERATION_LOADING_ERROR
                });
            }
        } catch (error) {
            await this.setState({
                products: [],
                status: OPERATION_LOADING_ERROR
            });
        }
    }

    render() {
        const { status, products } = this.state;
        return (
            <Container maxWidth={"xl"}>
                <Box m={2}>
                    <Card variant="outlined">
                        <Grid container>
                            <Grid item xs={12}>
                                <Box m={2}>
                                    <Typography variant="h6" text="Trending Products" />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Box m={2}>
                                    <Grid container align="center" spacing={2}>
                                        {
                                            status === OPERATION_LOADING &&
                                            <div> Loading trending products... </div>
                                        }
                                        {
                                            status === OPERATION_LOADING_COMPLETED &&
                                            products.map((product, key) =>
                                                <Grid item xs={3} key={key}>
                                                    <ProductWidget
                                                        {...product}
                                                        onClick={() => window.open(product.url)} />
                                                </Grid>)
                                        }
                                        {
                                            status === OPERATION_LOADING_COMPLETED &&
                                            products.length === 0 &&
                                            <div> There are no trending products </div>
                                        }
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Box>
            </Container>
        );
    }
};