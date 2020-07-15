import React, { Component } from 'react';
import LoggedInUser from './LoggedInUser';
import GuestUser from './GuestUser';
import { whoami } from '../../../actions';
import {
    GUEST_USER,
    TINNAT_USER,
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED
} from '../../../lib/constants';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: OPERATION_LOADING,
            userType: null,
            user: null
        };
    }

    async componentDidMount() {
        const userObj = await whoami();
        console.log(userObj);
        if (userObj && userObj.message === TINNAT_USER) {
            await this.setState({
                status: OPERATION_LOADING_COMPLETED,
                userType: TINNAT_USER,
                user: userObj.data
            });
        } else {
            await this.setState({
                status: OPERATION_LOADING_COMPLETED,
                userType: GUEST_USER
            });
        }
    }

    render() {
        const {
            status,
            userType,
            user
        } = this.state;
        switch (status) {
            case OPERATION_LOADING:
                return <div></div>;
        };
        switch (userType) {
            case TINNAT_USER:
                return <LoggedInUser
                    {...user}
                    logout={{ onClick: () => window.location.href = '/logout' }}
                    account={{ onClick: () => window.location.href = '/account' }}
                    orders={{ onClick: () => window.location.href = '/account/activity/orders' }}
                />
            case GUEST_USER:
            default:
                return <GuestUser />
        };
    }
}