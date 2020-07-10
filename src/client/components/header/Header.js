import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '../common/elements/Typography';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
    OPERATION_LOADING_ERROR
} from '../../lib/constants';
import logo from '../../images/tinnat-logo-white.png';
import '../../styles/header.css';
import User from '../user/User';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: OPERATION_LOADING,
            login: false,
            cart: []
        }
        this.fbAtttributes = {
            'data-size': 'medium',
            'data-button-type': 'continue_with',
            'data-layout': 'rounded',
            'data-auto-logout-link': 'true',
            'data-use-continue-as': 'true',
            'data-width': '',
            'data-scope': 'public_profile,email',
            'data-onlogin': 'checkLoginStatus()'
        }
    }

    async updateComponent() {
        const response = await getCart();
        if (response && response.cart) {
            this.setState({
                status: OPERATION_LOADING_COMPLETED,
                cart: response.cart
            });
        } else {
            this.setState({
                status: OPERATION_LOADING_ERROR,
                cart: []
            });
        }
    }

    render() {
        return (
            <Container
                style={{
                    backgroundImage: 'linear-gradient(100deg, rgb(247, 36, 52), rgb(247, 36, 52))'
                }}
                maxWidth={false}>
                <Container maxWidth={'xl'}>
                    <Grid
                        style={{ height: '4.5rem' }}
                        alignItems='center'
                        justify='center'
                        container>
                        <Grid style={{ cursor: 'pointer' }} onClick={() => window.location = '/'} item xs={1}>
                            <img src={logo} alt='Tinnat' height='80px' width='120px' />
                        </Grid>
                        <Grid className='t-menu-item' onClick={() => window.location = '/'} item xs={1}>
                            <Typography text='home' variant='button' display='block' guttertop={'true'} />
                        </Grid>
                        <Grid className='t-menu-item' onClick={() => window.location = '/about'} item xs={1}>
                            <Typography text='about' variant='button' display='block' guttertop={'true'} />
                        </Grid>
                        <Grid className='t-menu-item' onClick={() => window.location = '/products'} item xs={1}>
                            <Typography text='products' variant='button' display='block' guttertop={'true'} />
                        </Grid>
                        <Grid className='t-menu-item' onClick={() => window.location = '/help'} item xs={1}>
                            <Typography text='help' variant='button' display='block' guttertop={'true'} />
                        </Grid>
                        <Grid className='t-menu-item' onClick={() => window.location = '/contactus'} item xs={1}>
                            <Typography text='contact' variant='button' display='block' guttertop={'true'} />
                        </Grid>
                        <Grid className='t-menu-item' item xs={2}>
                            <User />
                        </Grid>
                    </Grid>
                </Container>
            </Container>
        )
    }
}