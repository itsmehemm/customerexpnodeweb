import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '../../common/elements/Typography';
import Amount from '../../common/elements/Amount';
import ProductImages from '../../product-detail/ProductImages';

export default class OrderSummary extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            name,
            description,
            cost,
            discount,
            size,
            color,
            quantity,
            picture_links } = this.props;
        return (
            <Box>
                <Box m={2}>
                    <Typography text="ORDER SUMMARY" size="h6" />
                </Box>
                <Box m={2}> <Divider /> </Box>
                <Grid container>
                    <Grid item xs={6}>
                        <Box m={2}>
                            <ProductImages
                                images={picture_links}
                                default_properties={{ indicators: false }}
                                style={{
                                    width: '340px',
                                    height: '340px',
                                    marginLeft: 'auto',
                                    marginRight: 'auto'
                                }} />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box m={2}>
                            <Typography text={name} size="h5" />
                        </Box>
                        <Box m={2}>
                            <Typography text={description} size="subtitle1" />
                        </Box>
                        <Box m={2}>
                            <Amount cost={cost} discount={discount} />
                        </Box>
                        <Box m={2}> <Divider /> </Box>
                        {
                            size &&
                            <Box m={2}>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <Typography text="Size" size="subtitle1" />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography text={size} size="subtitle1" />
                                    </Grid>
                                </Grid>
                            </Box>
                        }
                        {
                            color &&
                            <Box m={2}>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <Typography text="Color" size="subtitle1" />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography text={color} size="subtitle1" />
                                    </Grid>
                                </Grid>
                            </Box>
                        }
                        {
                            quantity &&
                            <Box m={2}>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <Typography text="Quantity" size="subtitle1" />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography text={quantity} size="subtitle1" />
                                    </Grid>
                                </Grid>
                            </Box>
                        }
                    </Grid>
                </Grid>
            </Box>
        );
    }
};