import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '../common/elements/Typography';
import BaseHeader from './BaseHeader';
import User from './user/User';
import logo from '../../images/tinnat-logo-white.png';

const Header = () => {
    return (
        <BaseHeader>
            <Grid
                alignItems='center'
                justify='center'
                container>
                <Grid style={{ cursor: 'pointer' }} onClick={() => window.location = '/'} item xs={1}>
                    <img src={logo} alt='Tinnat' height='80px' width='120px' />
                </Grid>
                <Grid className='t-menu-item-1' onClick={() => window.location = '/'} item xs={1}>
                    <Typography text='home' variant='button' display='block' guttertop={'true'} />
                </Grid>
                <Grid className='t-menu-item-1' onClick={() => window.location = '/about'} item xs={1}>
                    <Typography text='about' variant='button' display='block' guttertop={'true'} />
                </Grid>
                <Grid className='t-menu-item-1' onClick={() => window.location = '/products'} item xs={1}>
                    <Typography text='products' variant='button' display='block' guttertop={'true'} />
                </Grid>
                <Grid className='t-menu-item-1' onClick={() => window.location = '/help'} item xs={1}>
                    <Typography text='help' variant='button' display='block' guttertop={'true'} />
                </Grid>
                <Grid className='t-menu-item-1' onClick={() => window.location = '/contactus'} item xs={1}>
                    <Typography text='contact' variant='button' display='block' guttertop={'true'} />
                </Grid>
                <Grid className='t-menu-item' item xs={2}>
                    <User />
                </Grid>
            </Grid>
        </BaseHeader>
    );
};

export default Header;