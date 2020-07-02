import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import Login from './Login';

const ActionButton = withStyles(() => ({
    root: {
        color: 'rgb(247, 36, 52)',
        border: '2px solid rgb(247, 36, 52)',
        backgroundColor: '#fff',
        '&:hover': {
            color: '#fff',
            border: '2px solid #fff',
            backgroundColor: 'rgb(247, 36, 52)'
        },
    },
}))(Button);

export default class GuestUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openLogin: false,
            openSignup: false
        };
    }

    render() {
        const {
            openLogin,
            openSignup
        } = this.state;
        return (
            <Grid container>
                <Grid item>
                    <ThemeProvider>
                        <ButtonGroup disableElevation variant="contained" style={{ color: '#fff' }}>
                            <ActionButton onClick={() => this.setState({ openLogin: true })}>Login</ActionButton>
                            <ActionButton onClick={() => this.setState({ openSignup: true })}>Signup</ActionButton>
                        </ButtonGroup>
                    </ThemeProvider>
                </Grid>
                <Login open={openLogin} />
            </Grid>
        );
    }
};