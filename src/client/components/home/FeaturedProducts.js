import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '../common/elements/Typography';
import getFeaturedProducts from '../../actions/get-featured-products';
import ProductWidget from '../common/widgets/ProductWidget';
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
            featured: []
        }
    }

    async componentDidMount() {
        try {
            const featured = await getFeaturedProducts();
            this.setState({
                featured: featured,
                status: OPERATION_LOADING_COMPLETED
            });
        } catch (error) {
            this.setState({
                featured: [],
                status: OPERATION_LOADING_ERROR
            });
        }
    }

    render() {
        return (
            <Container maxWidth={"lg"}>
                <Box m={1}>
                    <Box className="center" m={4}>
                        <Typography size="h4" text="Featured Products" />
                    </Box>
                    <Box className="center" m={4}>
                        <Grid container spacing={1}>
                            {this.state.status === OPERATION_LOADING && <div> Loading featured products... </div>}
                            {this.state.featured.map((product, key) =>
                                <Grid item xs={4} key={key}>
                                    <ProductWidget {...product} onClick={() => window.open(`/product/${product.id}`)} />
                                </Grid>)}
                            {this.state.status === OPERATION_LOADING_COMPLETED && this.state.featured.length === 0 && <div> There are no featured products </div>}
                        </Grid>
                    </Box>
                </Box >
            </Container >
        );
    }
}