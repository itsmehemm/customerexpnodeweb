import React, { Component } from 'react';
import LoggedInUser from './LoggedInUser';
import GuestUser from './GuestUser';
import { whoami } from '../../actions';
import {
    GUEST_USER,
    TINNAT_USER
} from '../../lib/constants';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: null,
            user: null
        }
    }

    async componentDidMount() {
        const userObj = await whoami();
        if (userObj && userObj.data && userObj.message === TINNAT_USER) {
            await this.setState({
                type: TINNAT_USER,
                user: userObj.data
            });
        } else {
            await this.setState({
                type: GUEST_USER
            });
        }
    }

    render() {
        const {
            type,
            user
        } = this.state;
        switch (type) {
            case TINNAT_USER:
                return <LoggedInUser {...user} logout={{ onClick: () => window.location.href = "/logout" }} />
            case GUEST_USER:
            default:
                return <GuestUser />
        };
    }
}