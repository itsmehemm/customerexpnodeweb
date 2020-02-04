import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from './elements/Typography';

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

    updateComponent() {
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

    componentDidMount() {
        // To update the cart periodically every 2 seconds.
        setInterval(() => {
            this.updateComponent();
        }, 2000);
    }

    render() {
        return (
            <Container className="header-content-wrapper" maxWidth={false}>
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
                        <Grid className="menu-item" onClick={() => window.location = '/contact'} item xs={1}>
                            <Typography text="Contact" />
                        </Grid>
                        <Grid className="menu-item" onClick={() => window.location = '/cart'} item xs={1}>
                            <Typography icon="add_shopping_cart" text={`(${this.state.cart.length})`} />

                        </Grid>
                    </Grid>
                </Container>
            </Container>
        )
    }
}