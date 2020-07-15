import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import DeliveryTimeline from './DeliveryTimeline';
import Typography from '../../../common/elements/Typography';
import { currencyCodeMapper } from '../../../../lib/mappers';
import defaultImg from '../../../../images/default-product-image.png';

const ColorPallette = ({ color }) => <Grid item xs={1}> <div className='t-color-pallette' style={{ backgroundColor: color }} /></Grid>

const OrderDetail = ({ purchase_items, delivery }) => {
    const purchaseItem = purchase_items[0];
    const images = purchaseItem.picture_links || [defaultImg];
    return (
        <Box m={2}>
            <Card variant='outlined'>
                <Grid container>
                    <Grid item xs={12}>
                        <Box m={2}>
                            <Typography variant='h6' text='Order details' />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={2}>
                        <Box m={2}>
                            <img src={images[0]} height='150px' width='150px' />
                        </Box>
                    </Grid>
                    <Grid>
                        <Divider orientation='vertical' />
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Box m={2}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography variant='body1' className='t-text-link' onClick={() => window.open(purchaseItem.url)} text={purchaseItem.name} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container>
                                                <Grid item xs={1}>
                                                    <Typography variant='body2' text='Size' />
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <Typography variant='body2' text={purchaseItem.size} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container>
                                                <Grid item xs={1}>
                                                    <Typography variant='body2' text='Color' />
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <ColorPallette color={purchaseItem.color} />                                        </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container>
                                                <Grid item xs={1}>
                                                    <Typography variant='body2' text='Quantity' />
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <Typography variant='body2' text={purchaseItem.quantity} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <DeliveryTimeline status={delivery.status} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Divider variant='vertical' />
                    </Grid>
                    <Grid item xs={1}>
                        <Box m={2}>
                            <Typography align='right' variant='body1' text={`${currencyCodeMapper[purchaseItem.amount.currency]}${purchaseItem.amount.subtotal}`} />
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
};

export default OrderDetail;