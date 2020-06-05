import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '../common/elements/Typography';
import ProductWidget from '../common/widgets/ProductWidget';
import { getFeaturedProducts } from '../../actions';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
    OPERATION_LOADING_ERROR
} from '../../lib/constants';

export default class FeaturedProducts extends Component {
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
            <Container maxWidth={"lg"}>
                {
                    (status === OPERATION_LOADING || status === OPERATION_LOADING_COMPLETED) &&
                    <Box m={1}>
                        <Box className="center" m={4}>
                            <Typography size="h4" text="Featured Products" />
                        </Box>
                        <Box className="center" m={4}>
                            <Grid container spacing={1}>
                                {
                                    status === OPERATION_LOADING &&
                                    <div> Loading featured products... </div>
                                }
                                {
                                    status === OPERATION_LOADING_COMPLETED &&
                                    products.map((product, key) =>
                                        <Grid item xs={4} key={key}>
                                            <ProductWidget
                                                {...product}
                                                onClick={() => window.open(product.url)} />
                                        </Grid>)
                                }
                                {
                                    status === OPERATION_LOADING_COMPLETED &&
                                    products.length === 0 &&
                                    <div> There are no featured products </div>
                                }
                            </Grid>
                        </Box>
                    </Box>
                }
            </Container>
        );
    }
};