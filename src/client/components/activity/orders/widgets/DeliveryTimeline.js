import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '../../../common/elements/Typography';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#26a541',
    },
}))(LinearProgress);

const DELIVERY_STATUS_VALUE_MAPPER = {
    INITIATED: 5,
    PACKED: 30,
    SHIPPED: 55,
    DELIVERED: 100
};

const DeliveryTimeline = ({ status }) => {
    const value = DELIVERY_STATUS_VALUE_MAPPER[status];
    return (
        <Grid container>
            <Grid item xs={12}>
                <Box m={1}>
                    <BorderLinearProgress variant='determinate' value={value} />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box m={1}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Typography style={{ color: '#26a541' }} variant='caption' text='Ordered' icon='check_circle' />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography style={{ color: value > 5 ? '#26a541' : 'rgb(162, 162, 162)' }} variant='caption' text='Packed' icon='check_circle' />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography style={{ color: value > 30 ? '#26a541' : 'rgb(162, 162, 162)' }} variant='caption' text='Shipped' icon='check_circle' />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography style={{ color: value > 55 ? '#26a541' : 'rgb(162, 162, 162)' }} variant='caption' text='Delivered' icon='check_circle' />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default DeliveryTimeline;
