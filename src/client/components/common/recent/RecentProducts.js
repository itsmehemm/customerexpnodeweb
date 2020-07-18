import React, { Component } from 'react';
import _ from 'lodash';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import ProductWidget from '../widgets/ProductWidget';
import ComponentLoader from '../loaders/ComponentLoader';
import Typography from '../elements/Typography';
import {
    getRecentlyViewedProducts,
    getProductById
} from '../../../actions';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED
} from '../../../lib/constants';

export default class RecentProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: OPERATION_LOADING,
            products: []
        }
    }

    async componentDidMount() {
        const recentProducts = getRecentlyViewedProducts();
        const productids = Object.keys(recentProducts);
        const products = [];
        for (let i = 0; i < productids.length; i++) {
            const product = await getProductById(productids[i]);
            if (product && product.id) {
                products.push(product);
            }
        }
        await this.setState({ products, status: OPERATION_LOADING_COMPLETED });
    }

    render() {
        const {
            status,
            products
        } = this.state;
        return (
            <Box m={2}>
                <Container maxWidth='lg'>
                    {status === OPERATION_LOADING && <ComponentLoader />}
                    {status === OPERATION_LOADING_COMPLETED &&
                        Array.isArray(products) &&
                        products.length > 0 &&
                        <Card variant='outlined'>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Box m={2}>
                                        <Typography variant='h6' text='Recently Viewed' />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box m={2}>
                                        <Grid container align='center' spacing={2}>
                                            {
                                                products.map((product, key) =>
                                                    <Grid item xs={12} sm={4} key={key}>
                                                        <ProductWidget
                                                            {...product}
                                                            picture_links={_.get(product, 'default_theme.picture_links', [])}
                                                            amount={_.get(product, 'default_theme.amount')}
                                                            onClick={() => window.open(product.url)}
                                                        />
                                                    </Grid>)
                                            }
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Card>
                    }
                </Container>
            </Box>
        );
    }
};