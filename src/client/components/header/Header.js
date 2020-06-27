import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '../common/elements/Typography';
import LoginDialog from '../login/LoginDialog';
import { getCart } from '../../actions/cart/get-cart';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
    OPERATION_LOADING_ERROR
} from '../../lib/constants';
import logo from '../../images/tinnat-logo-white.png';
import '../../styles/header.css';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: OPERATION_LOADING,
            login: false,
            cart: []
        }
        this.fbAtttributes = {
            "data-size": "medium",
            "data-button-type": "continue_with",
            "data-layout": "rounded",
            "data-auto-logout-link": "true",
            "data-use-continue-as": "true",
            "data-width": "",
            "data-scope": "public_profile,email",
            "data-onlogin": "checkLoginStatus()"
        }
    }

    componentDidMount() {
        // setInterval(() => {
        //     this.updateComponent();
        // }, 2000);
    }

    async updateComponent() {
        try {
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
        catch (error) {
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
                <Container maxWidth={"xl"}>
                    <Grid
                        style={{ height: '4.5rem' }}
                        alignItems="center"
                        justify="center"
                        container>
                        <Grid style={{ cursor: 'pointer' }} onClick={() => window.location = '/'} item xs={1}>
                            <img src={logo} alt="Tinnat" height="80px" width="120px" />
                        </Grid>
                        <Grid className="t-menu-item" onClick={() => window.location = '/'} item xs={1}>
                            <Typography text="home" variant="button" display="block" guttertop={"true"} />
                        </Grid>
                        <Grid className="t-menu-item" onClick={() => window.location = '/about'} item xs={1}>
                            <Typography text="about" variant="button" display="block" guttertop={"true"} />
                        </Grid>
                        <Grid className="t-menu-item" onClick={() => window.location = '/products'} item xs={1}>
                            <Typography text="products" variant="button" display="block" guttertop={"true"} />
                        </Grid>
                        <Grid className="t-menu-item" onClick={() => window.location = '/help'} item xs={1}>
                            <Typography text="help" variant="button" display="block" guttertop={"true"} />
                        </Grid>
                        <Grid className="t-menu-item" onClick={() => window.location = '/contactus'} item xs={1}>
                            <Typography text="contact" variant="button" display="block" guttertop={"true"} />
                        </Grid>
                        {/* <Grid className="t-menu-item" onClick={() => this.setState({ login: true })} item xs={1}>
                            <Typography className="t-text-link-3" text="Login" variant="button" display="block" guttertop={"true"} />
                        </Grid> */}
                        <Grid className="t-menu-item" onClick={() => this.setState({ login: true })} item xs={1}>
                            <div
                                className="fb-login-button"
                                {...this.fbAtttributes}
                            />
                        </Grid>
                        {/* <Grid className="t-menu-item" onClick={() => window.location = '/viewcart'} item xs={1}>
                            <Typography icon="add_shopping_cart" text={
                                `(${this.state.status === OPERATION_LOADING ?
                                    '...' : (this.state.status === OPERATION_LOADING_ERROR ?
                                        '!' : this.state.cart.length)})`
                            } />
                        </Grid> */}
                    </Grid>
                </Container>
            </Container>
        )
    }
}