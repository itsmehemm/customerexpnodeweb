
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '../common/elements/TextField';
import LargeBtn from '../common/elements/LargeBtn';
import Typography from '../common/elements/Typography';

export default class Addresses extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            mobile_number: '',
            address_line_1: '',
            address_line_2: '',
            city: '',
            pincode: '',
            state: '',
            landmark: '',

            validation_error: ''
        };

        this.validateAndUpdate = this.validateAndUpdate.bind(this);
    }

    // Reusing the component to edit the address
    componentDidMount() {
        this.setState({
            ...this.props.address
        });
    }

    updateData(type, data) {
        this.setState({ [type]: data });
    }

    validateAndUpdate() {
        const { name, mobile_number, address_line_1, city, pincode, state } = this.state;
        if (!name || !mobile_number || !address_line_1 || !city || !pincode || !state) {
            this.setState({ validation_error: 'One or more required data is not entered. Fields marked * are mandatory.' });
            this.props.update(null);
        }
        else
            this.props.update({
                ...this.state
            });
    }

    render() {
        const {
            name,
            mobile_number,
            address_line_1,
            address_line_2,
            city, state,
            pincode,
            landmark,
            validation_error
        } = this.state;

        return (
            <Grid container>
                <Grid item xs={6}>
                    <Box m={2}><TextField
                        label="Name"
                        value={name}
                        error={name ? false : true}
                        helperText={name ? "" : "Your name is required."}
                        required={true}
                        onChange={(data) => this.updateData('name', data)}
                    />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box m={2}>
                        <TextField
                            label="Mobile number"
                            type="number"
                            value={mobile_number}
                            error={mobile_number ? false : true}
                            helperText={mobile_number ? "" : "Your mobile number is required."}
                            required={true}
                            onChange={(data) => this.updateData('mobile_number', data)}
                        />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box m={2}>
                        <TextField
                            label="Address Line 1"
                            value={address_line_1}
                            error={address_line_1 ? false : true}
                            helperText={address_line_1 ? "" : "Your address is required."}
                            required={true}
                            onChange={(data) => this.updateData('address_line_1', data)}
                        />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box m={2}>
                        <TextField
                            label="Address Line 2"
                            value={address_line_2}
                            onChange={(data) => this.updateData('address_line_2', data)}
                        />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box m={2}>
                        <TextField
                            label="City"
                            value={city}
                            error={city ? false : true}
                            helperText={city ? "" : "Your city is required."}
                            required={true}
                            onChange={(data) => this.updateData('city', data)}
                        />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box m={2}>
                        <TextField
                            label="Pincode"
                            type="number"
                            value={pincode}
                            error={pincode ? false : true}
                            helperText={pincode ? "" : "Your pincode is required."}
                            required={true}
                            onChange={(data) => this.updateData('pincode', data)}
                        />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box m={2}>
                        <TextField
                            label="State"
                            value={state}
                            error={state ? false : true}
                            helperText={state ? "" : "Your state is required."}
                            required={true}
                            onChange={(data) => this.updateData('state', data)}
                        />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box m={2}>
                        <TextField
                            label="Landmark (optional)"
                            value={landmark}
                            onChange={(data) => this.updateData('landmark', data)}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box m={2}>
                        <Typography text={validation_error} size="subtitle1" style={{ color: '#f44336' }} />
                        <LargeBtn onClick={this.validateAndUpdate} icon="check" name="CONFIRM ADDRESS" color="#fb641b" />
                    </Box>
                </Grid>
            </Grid>
        );
    }
}