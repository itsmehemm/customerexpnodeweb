import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '../../common/elements/Typography';
import TextField from '../../common/elements/TextField';
import {
    COMPONENT_STATUS_INVALID,
    COMPONENT_STATUS_VALID
} from '../../../lib/constants';

export default class PersonalInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            phone_number: null,
            status: COMPONENT_STATUS_INVALID
        };
        this.update = this.update.bind(this);
    }

    async componentDidMount() {
        const { email, phone_number } = this.props;
        await this.setState({
            email: email,
            phone_number: phone_number
        });
        await this.validate();
        await this.props.update('personal_information', this.state);
    }

    async validate() {
        const { email, phone_number } = this.state;
        if (!email || !phone_number) {
            await this.setState({
                status: COMPONENT_STATUS_INVALID
            });
        } else {
            await this.setState({
                status: COMPONENT_STATUS_VALID
            });
        }
    }

    async update(name, value) {
        await this.setState({
            [name]: value
        });
        await this.validate();
        await this.props.update('personal_information', this.state);
    }

    render() {
        const { email, phone_number } = this.state;
        return (
            <Box>
                <Box m={2}>
                    <Typography text='1. Personal Information' size='h6' gutterBottom/>
                    <Typography text='We need your email and phone number to keep you updated.' variant='caption' gutterBottom/>
                </Box>
                <Grid container>
                    <Grid item sm={6} xs={12}>
                        <Box m={2}>
                            <TextField
                                label='Email'
                                value={email}
                                error={email ? false : true}
                                helperText={email ? '' : 'Your email is required.'}
                                required={true}
                                onChange={(data) => this.update('email', data)}
                            />
                        </Box>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Box m={2}>
                            <TextField
                                label='Phone Number'
                                value={phone_number}
                                error={phone_number ? false : true}
                                helperText={phone_number ? '' : 'Your phone number is required.'}
                                required={true}
                                onChange={(data) => this.update('phone_number', data)}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        );
    }
};