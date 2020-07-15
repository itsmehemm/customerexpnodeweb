import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '../../../common/elements/Typography';
import { currencyCodeMapper } from '../../../../lib/mappers';
import {
    DELIVERABLE
} from '../../../../lib/constants';
import defaultImg from '../../../../images/default-product-image.png';

const ColorPallette = ({ color }) => <Grid item xs={1}> <div className='t-color-pallette' style={{ backgroundColor: color }} /></Grid>

const Order = ({ id, purchase_items, delivery }) => {
    const purchaseItem = purchase_items[0];
    const images = purchaseItem.picture_links || [defaultImg];
    return (
        <Box m={2} className='t-card' onClick={() => window.open(`/account/activity/order/${id}`)}>
            <Card variant='outlined'>
                <Grid container>
                    <Grid item xs={2}>
                        <Box m={2}>
                            <img src={images[0]} height='150px' width='150px' />
                        </Box>
                    </Grid>
                    <Grid item xs={5}>
                        <Box m={2}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant='body1' text={purchaseItem.name} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <Typography variant='body2' text='Size' />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant='body2' text={purchaseItem.size} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <Typography variant='body2' text='Color' />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <ColorPallette color={purchaseItem.color} />                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box m={2}>
                            <Typography variant='body1' text={`${currencyCodeMapper[purchaseItem.amount.currency]}${purchaseItem.amount.subtotal}`} />
                        </Box>
                    </Grid>
                    {
                        delivery &&
                        <Grid item xs={4}>
                            <Box m={2}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        {
                                            delivery.status === DELIVERABLE &&
                                            <>
                                                <Typography text={delivery.formatted.delivery_string} variant='body1_bold' />
                                                <Typography text='Your item will be delivered' variant='caption' />
                                            </>
                                        }
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    }
                </Grid>
            </Card>
        </Box>
    );
};

export default Order;