import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Filters from './widgets/Filters';
import ProductsViewer from './widgets/ProductsViewer';
import {
    getBusinessFilteredProducts
} from '../../../actions';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
    OPERATION_LOADING_ERROR
} from '../../../lib/constants';

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {
                size: [],
                priceRange: [299, 799],
                subCategories: []
            },
            products: [],
            status: OPERATION_LOADING
        };
        this.updateFilters = this.updateFilters.bind(this);
    }

    async componentDidMount() {
        document.title = `All Products - Tinnat Business`;
        await this.fetchProducts();
    }

    async fetchProducts() {
        await this.setState({
            products: [],
            status: OPERATION_LOADING
        });
        const { filters } = this.state;
        const response = await getBusinessFilteredProducts({
            size: filters.sizes,
            price_range: filters.priceRange,
            sub_categories: filters.subCategories
        });
        if (response && response.results) {
            await this.setState({
                products: response.results,
                status: OPERATION_LOADING_COMPLETED
            });
        } else {
            await this.setState({
                products: [],
                status: OPERATION_LOADING_ERROR
            });
        }
    }

    updateFilters = async (filters) => {
        await this.setState({ filters });
        await this.fetchProducts();
    }

    render() {
        const {
            products,
            status
        } = this.state;
        return (
            <Container maxWidth='xl'>
                <Grid container>
                    <Grid item xs={3}>
                        <Box m={2}><Filters onUpdate={this.updateFilters} /></Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Box m={2}><ProductsViewer products={products} status={status} /></Box>
                    </Grid>
                </Grid>
            </Container>
        );
    }
};