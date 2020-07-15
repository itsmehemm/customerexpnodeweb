import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '../common/elements/Typography';
import BaseHeader from './BaseHeader';
import User from './user/User';
import logo from '../../images/tinnat-logo-white.png';

const SecondaryHeader = () => {
    return (
        <BaseHeader>
            <Grid
                alignItems='center'
                justify='center'
                container>
                <Grid style={{ cursor: 'pointer' }} onClick={() => window.location = '/business'} item xs={1}>
                    <img src={logo} alt='Tinnat' height='80px' width='120px' />
                </Grid>
                <Grid className='t-menu-item-1' onClick={() => window.location = '/business'} item xs={1}>
                    <Typography variant='button' display='block' guttertop='true' text='Dashboard' />
                </Grid>
                <Grid className='t-menu-item-1' onClick={() => window.location = '/business/warehouse/products'} item xs={1}>
                    <Typography variant='button' display='block' guttertop='true' text='Products' />
                </Grid>
                <Grid className='t-menu-item-1' onClick={() => window.location = '/business/warehouse/product/add'} item xs={1}>
                    <Typography variant='button' display='block' guttertop='true' text='Add Product' />
                </Grid>
                <Grid className='t-menu-item-1' onClick={() => window.location = '/business/activity/transactions'} item xs={1}>
                    <Typography variant='button' display='block' guttertop='true' text='Activity' />
                </Grid>
                <Grid className='t-menu-item-1' onClick={() => window.location = '/business/logger/idsearch'} item xs={1}>
                    <Typography variant='button' display='block' guttertop='true' text='Idsearch' />
                </Grid>
                <Grid className='t-menu-item' item xs={2}>
                    <User />
                </Grid>
            </Grid>
        </BaseHeader>
    );
};

export default SecondaryHeader;