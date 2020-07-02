import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '../common/elements/Typography';
import {
    LOGGED_IN,
    LOGGED_OUT
} from '../../lib/constants';

export default class LoginWithFacebook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: null,
            facebookResponse: null
        }
    }

    async componentDidMount() {
        if (FB) {
            FB.getLoginStatus(async response => {
                if (response && response.status === 'connected' && response.authResponse) {
                    FB.api('/me', async (user) => {
                        await this.setState({
                            status: LOGGED_IN,
                            facebookResponse: {
                                ...response,
                                user: user
                            }
                        });
                    })
                } else {
                    await this.setState({
                        status: null,
                        facebookResponse: null
                    });
                }
            });
        }
    }

    logout = () => {
        if (FB) {
            FB.getLoginStatus(response => {
                if (response && response.status === 'connected' && response.authResponse) {
                    FB.logout(response => {
                        this.setState({
                            status: null,
                            facebookResponse: null
                        });
                        fetch('/logout');
                    });
                } else {
                    fetch('/logout');
                }
            });
        }
    }

    login = () => {
        if (FB) {
            FB.getLoginStatus(response => {
                if (response && response.status === 'connected' && response.authResponse) {
                    FB.api('/me', async (user) => {
                        await this.setState({
                            status: LOGGED_IN,
                            facebookResponse: {
                                ...response,
                                user: user
                            }
                        });
                        this.tinnatLogin();
                    });
                } else {
                    FB.login(response => {
                        if (response && response.status === 'connected' && response.authResponse) {
                            FB.api('/me', async (user) => {
                                await this.setState({
                                    status: LOGGED_IN,
                                    facebookResponse: {
                                        ...response,
                                        user: user
                                    }
                                });
                                this.tinnatLogin();
                            })
                        }
                    }, {
                        scope: 'public_profile,email'
                    });
                }
            });
        }
    }

    tinnatLogin = () => {
        const { facebookResponse } = this.state;
        fetch(`/auth/facebook?access_token=${facebookResponse.authResponse.accessToken}`)
            .then(() => window.location.reload())
            .catch(error => error);
    }

    tinnatLogout = () => {
        window.location.href = '/logout';
    }

    render() {
        const {
            status,
            facebookResponse
        } = this.state;
        switch (status) {
            case LOGGED_IN:
                return (
                    <Grid container align="center" spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                icon_type="user"
                                icon="facebook"
                                className="fb-logged-in"
                                variant="h6"
                                onClick={this.tinnatLogin}
                                text={`Continue as ${facebookResponse.user.name}`}
                                iconStyle={{ fontSize: '1.5em', verticalAlign: 'middle' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                className="t-text-link-2"
                                text="Continue as another facebook user"
                                variant="subtitle1"
                                onClick={this.logout}
                            />
                        </Grid>
                    </Grid>
                );
            case LOGGED_OUT:
            default:
                return (
                    <Grid container align="center" spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                icon_type="user"
                                icon="facebook"
                                className="fb-logged-in"
                                variant="h6"
                                onClick={this.login}
                                text="Login with facebook"
                                iconStyle={{ fontSize: '1.5em', verticalAlign: 'middle' }}
                            />
                        </Grid>
                    </Grid>
                );
        }; l
    }
};