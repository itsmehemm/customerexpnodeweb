import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '../common/elements/Typography';
import Amount from '../common/elements/Amount';
import getFeaturedProducts from '../../actions/get-featured-products';
import { currencyCodeLabel } from '../../client-lib/mappers';

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
        return (
            <Container maxWidth={"lg"}>
                <Box m={1}>
                    <Box className="center" m={4}>
                        <span className="header-large"> Featured Products </span>
                    </Box>
                    <Box className="center" m={4}>
                        <Grid container spacing={1}>
                            {
                                this.state.featured.map((product, key) =>
                                    <Grid item xs={4} key={key} onClick={() => window.open(`/product/${product.id}`)} >
                                        <Box m={1} className="p-widget">
                                            <img src={product.picture_links[0]} height="250px" width="250px" />
                                            <Box m={1}>
                                                <Typography text={product.name} size="subtitle1" />
                                            </Box>
                                            <Box m={1}>
                                                <Amount cost={product.cost} discount={product.discount} />
                                            </Box>
                                        </Box>
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