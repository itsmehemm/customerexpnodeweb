import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import ComponentLoader from '../common/loaders/ComponentLoader';
import LoginDialog from '../header/user/widgets/LoginDialog';
import initializeFacebookSDK from '../../lib/utils/initialize-facebook-sdk';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED
} from '../../lib/constants';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: OPERATION_LOADING
        };
    }

    async componentDidMount() {
        await initializeFacebookSDK(document, 'script', 'facebook-jssdk');
        await this.setState({ status: OPERATION_LOADING_COMPLETED });
    }

    render() {
        const { status } = this.state;
        return (
            <Container>
                {status === OPERATION_LOADING && <ComponentLoader />}
                {status === OPERATION_LOADING_COMPLETED && <LoginDialog open={true} />}
            </Container>
        );
    }
};