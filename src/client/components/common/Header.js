import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import logo from '../../images/tinnat-logo-white.png';
import '../../styles/header.css';

import { getCart } from '../../actions/cart/get-cart';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: []
        }
    }

    componentDidMount() {
        getCart()
            .then(response => {
                if (response && response.cart) {
                    this.setState({ cart: response.cart });
                } else {
                    this.setState({ cart: [] });
                }
            })
            .catch(error => this.setState({ cart: [] }))
    }

    render() {
        return (
            <Container className="header-content-wrapper" maxWidth={false}>
                <Container maxWidth={"xl"}>
                    <Grid className="menu" alignItems="center"
                        justify="center"
                        container
                        spacing={1}>
                        <Grid className="logo" onClick={() => window.location = '/'} item xs={1}>
                            <img src={logo} height="45px" width="80px" />
                        </Grid>
                        <Grid className="menu-item" onClick={() => window.location = '/'} item xs={1}>
                            Home
                        </Grid>
                        <Grid className="menu-item" onClick={() => window.location = '/about'} item xs={1}>
                            About
                        </Grid>
                        <Grid className="menu-item" onClick={() => window.location = '/products'} item xs={1}>
                            Products
                        </Grid>
                        <Grid className="menu-item" onClick={() => window.location = '/help'} item xs={1}>
                            Help
                        </Grid>
                        <Grid className="menu-item" onClick={() => window.location = '/contact'} item xs={1}>
                            Contact
                        </Grid>
                        <Grid className="menu-item" onClick={() => window.location = '/cart'} item xs={1}>
                            <i className="material-icons">add_shopping_cart</i>&nbsp;({this.state.cart.length})
                        </Grid>
                    </Grid>
                </Container>
            </Container>
        )
    }
}