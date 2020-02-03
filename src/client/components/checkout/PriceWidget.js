import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '../common/elements/Typography';

const PriceWidget = (props) => {
    return (
        <Card variant="outlined">
            <Box m={2}><Typography style={{ color: '#878787' }} text="ORDER DETAILS" /></Box>
            <Box m={2}><Divider /></Box>
            <Grid container>
                <Grid item xs={6}>
                    <Box m={2}><Typography size="subtitle1" text="Price" /></Box>
                </Grid>
                <Grid item xs={6}>
                    <Box m={2}><Typography size="subtitle1" text="₹500" /></Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6}>
                    <Box m={2}><Typography size="subtitle1" text="Delivery charges" /></Box>
                </Grid>
                <Grid item xs={6}>
                    <Box m={2}><Typography size="subtitle1" style={{ color: '#388e3c' }} text="FREE" /></Box>
                </Grid>
            </Grid>
            <Box m={2}><Divider /></Box>
            <Grid container>
                <Grid item xs={6}>
                    <Box m={2}><Typography text="Total Amount" /></Box>
                </Grid>
                <Grid item xs={6}>
                    <Box m={2}><Typography text="₹500" /></Box>
                </Grid>
            </Grid>
            <Box m={2}><Divider /></Box>
            <Box m={2}><Typography size="subtitle1" style={{ color: '#388e3c' }} text="Your total savings on this order is ₹10" /></Box>
        </Card>
    );
};

export default PriceWidget;