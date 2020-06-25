import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '../../common/elements/Typography';
import { currencyCodeMapper } from '../../../lib/mappers';

export default class OrderSummary extends Component {
    render() {
        const {
            id,
            name,
            description,
            amount,
            payment,
            discount,
            size,
            color,
            quantity,
            picture_links,
        } = this.props;
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item>
                    <Box m={2}>
                        <img
                            height="125px"
                            width="120px"
                            src={picture_links[0]}
                        />
                    </Box>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={9}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box m={2}>
                                <Typography
                                    className="t-text-link"
                                    text={name}
                                    variant="subtitle2"
                                    onClick={() => window.location.href = '/product/' + id}
                                />
                                <Typography text={description} variant="body2" />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
                    <Box m={2}>
                        <Grid container>
                            <Grid item xs={2}>
                                <Typography text="Size" variant="body2" />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography text={size} variant="body2" />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2}>
                                <Typography text="Color" variant="body2" />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography text={color} variant="body2" />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2}>
                                <Typography text="Quantity" variant="body2" />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography text={quantity} variant="body2" />
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider />
                    <Box m={2}>
                        <Typography
                            icon="local_shipping"
                            text={"Confirmed delivery in 4 - 7 days"}
                            variant="body2"
                            style={{ color: "rgb(5, 153, 54)" }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box m={0}> <Divider /> </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box m={2}>
                        <Grid container>
                            <Grid item xs={3}>
                                <Typography text="MRP (Inc. of all taxes)" variant="body2" />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography align="right" text={`${currencyCodeMapper[amount.currency]}${amount.maximum_retail_price}`} variant="body2" />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={3}>
                                <Typography text="Discount" variant="body2" />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography align="right" text={`${discount.type === 'INSTANT_AMOUNT' ? currencyCodeMapper[amount.currency] : ''}${discount.value}${discount.type === 'INSTANT_AMOUNT' ? '' : '%'}`} variant="body2" />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={3}>
                                <Typography text="Sub total" variant="body2" />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography align="right" text={`${currencyCodeMapper[amount.currency]}${amount.subtotal}`} variant="body2" />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={3}>
                                <Typography text="Shipping charges" variant="body2" />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography align="right" text={`${currencyCodeMapper[amount.currency]}0`} variant="body2" />
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider />
                    <Box m={2}>
                        <Grid container>
                            <Grid item xs={3}>
                                <Typography text="Total" variant="h6" />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography align="right" text={`${currencyCodeMapper[payment.currency]}${payment.subtotal}`} variant="h6" />
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider />
                </Grid>
            </Grid>
        );
    }
};