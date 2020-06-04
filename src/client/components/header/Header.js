import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '../common/elements/Typography';
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
            cart: []
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.updateComponent();
        }, 2000);
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
            <Container className="header-wrapper" maxWidth={false}>
                <Container maxWidth={"xl"}>
                    <Grid className="menu"
                        alignItems="center"
                        justify="center"
                        container>
                        <Grid className="logo" onClick={() => window.location = '/'} item xs={1}>
                            <img src={logo} height="45px" width="80px" />
                        </Grid>
                        <Grid className="menu-item" onClick={() => window.location = '/'} item xs={1}>
                            <Typography text="Home" />
                        </Grid>
                        <Grid className="menu-item" onClick={() => window.location = '/about'} item xs={1}>
                            <Typography text="About" />
                        </Grid>
                        <Grid className="menu-item" onClick={() => window.location = '/products'} item xs={1}>
                            <Typography text="Products" />
                        </Grid>
                        <Grid className="menu-item" onClick={() => window.location = '/help'} item xs={1}>
                            <Typography text="Help" />
                        </Grid>
                        <Grid className="menu-item" onClick={() => window.location = '/contactus'} item xs={1}>
                            <Typography text="Contact" />
                        </Grid>
                        <Grid className="menu-item" onClick={() => window.location = '/viewcart'} item xs={1}>
                            <Typography icon="add_shopping_cart" text={
                                `(${this.state.status === OPERATION_LOADING ?
                                    '...' : (this.state.status === OPERATION_LOADING_ERROR ?
                                        '!' : this.state.cart.length)})`
                            } />
                        </Grid>
                    </Grid>
                </Container>
            </Container>
        )
    }
}