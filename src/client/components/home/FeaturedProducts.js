import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '../common/elements/Typography';
import Amount from '../common/elements/Amount';
import getFeaturedProducts from '../../actions/get-featured-products';
import ProductWidget from '../common/ProductWidget';
import { addItemToCart } from '../../actions/cart/add-item-cart';

export default class FeaturedProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            featured: []
        }
    }

    componentDidMount() {
        getFeaturedProducts()
            .then(featured => this.setState({ featured: featured }));

    }

    render() {
        addItemToCart({
            id: 'HJEM',
            color: 'R',
            size: 'M'
        });
        return (
            <Container maxWidth={"lg"}>
                <Box m={1}>
                    <Box className="center" m={4}>
                        <Typography type="header" size="h4" text="Featured Products" />
                    </Box>
                    <Box className="center" m={4}>
                        <Grid container spacing={1}>
                            {
                                this.state.featured.map((product, key) =>
                                    <Grid item xs={4} key={key}>
                                        <ProductWidget {...product} onClick={() => window.open(`/product/${product.id}`)} />
                                    </Grid>)
                            }
                            {
                                this.state.featured.length === 0 &&
                                <div> There are no featured products </div>
                            }
                        </Grid>
                    </Box>
                </Box >
            </Container >
        );
    }
}