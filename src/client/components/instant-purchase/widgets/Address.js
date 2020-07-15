import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '../../common/elements/TextField';
import Typography from '../../common/elements/Typography';
import ViewAddress from './ViewAddress';
import AddressModal from '../../../modals/instant-order/widgets/AddressModal';
import {
    COMPONENT_STATUS_INVALID,
    COMPONENT_STATUS_VALID
} from '../../../lib/constants';

export default class Addresses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...new AddressModal().getDefaultData(),
            status: COMPONENT_STATUS_INVALID,
            viewer: false
        };
        this.update = this.update.bind(this);
        this.validate = this.validate.bind(this);
        this.confirm = this.confirm.bind(this);
    }

    async componentDidMount() {
        const addressModal = new AddressModal();
        addressModal.setData(this.props);
        await this.setState({
            ...addressModal.getData()
        });
        await this.validate();
        await this.props.update(this.state)
    }

    async update(name, value) {
        await this.setState({ [name]: value });
        await this.validate();
        await this.props.update(this.state);
    }

    async validate() {
        const { name, address_line_1, city, pincode, state, shipping_same_as_billing } = this.state;
        if (shipping_same_as_billing) {
            await this.setState({
                status: COMPONENT_STATUS_VALID
            });
        } else if (!name || !address_line_1 || !city || !pincode || !state) {
            await this.setState({
                status: COMPONENT_STATUS_INVALID
            });
        }
        else {
            await this.setState({
                status: COMPONENT_STATUS_VALID
            });
        }
    }

    async confirm() {
        await this.validate();
        const { status } = this.state;
        if (status === COMPONENT_STATUS_VALID) {
            await this.setState({
                viewer: true
            });
        } else {
            await this.setState({
                viewer: false
            });
        }
    }

    render() {
        const {
            name,
            address_line_1,
            address_line_2,
            city,
            state,
            pincode,
            landmark,
            shipping_same_as_billing,
            viewer
        } = this.state;
        const {
            isShipping,
            label,
        } = this.props;
        return (
            <Grid container>
                {
                    viewer &&
                    <>
                        <Grid item xs={10}>
                            <Box m={2}>
                                <Typography text={label} size='h6' />
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box m={2} onClick={() => this.setState({ viewer: false })}>
                                <Typography
                                    text='Edit'
                                    variant='button'
                                    className='t-text-link-2'
                                />
                            </Box>
                        </Grid>
                    </>
                }
                {
                    !viewer &&
                    <Grid item xs={12}>
                        <Box m={2}>
                            <Typography text={label} size='h6' />
                        </Box>
                    </Grid>
                }
                {
                    isShipping &&
                    <Grid item xs={12}>
                        <Box m={2}>
                            <FormControlLabel
                                control={<Checkbox checked={shipping_same_as_billing}
                                    onChange={(e) => this.update('shipping_same_as_billing', e.target.checked)}
                                    name='shipping_check_box' />}
                                label='Shipping address same as billing address'
                            />
                        </Box>
                    </Grid>
                }

                {viewer && <Grid item xs={12}><Box m={2}><ViewAddress {...this.state} /></Box></Grid>}

                {
                    ((isShipping && !shipping_same_as_billing) || (!isShipping)) && !viewer &&
                    <>
                        <Grid item xs={12}>
                            <Box m={2}>
                                <TextField
                                    label='Name'
                                    value={name}
                                    error={name ? false : true}
                                    helperText={name ? '' : 'Your name is required.'}
                                    required={true}
                                    onChange={(data) => this.update('name', data)}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box m={2}>
                                <TextField
                                    label='Address Line 1'
                                    value={address_line_1}
                                    error={address_line_1 ? false : true}
                                    helperText={address_line_1 ? '' : 'Your address is required.'}
                                    required={true}
                                    onChange={(data) => this.update('address_line_1', data)}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box m={2}>
                                <TextField
                                    label='Address Line 2'
                                    value={address_line_2}
                                    onChange={(data) => this.update('address_line_2', data)}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box m={2}>
                                <TextField
                                    label='City'
                                    value={city}
                                    error={city ? false : true}
                                    helperText={city ? '' : 'Your city is required.'}
                                    required={true}
                                    onChange={(data) => this.update('city', data)}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box m={2}>
                                <TextField
                                    label='Pincode'
                                    type='number'
                                    value={pincode}
                                    error={pincode ? false : true}
                                    helperText={pincode ? '' : 'Your pincode is required.'}
                                    required={true}
                                    onChange={(data) => this.update('pincode', data)}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box m={2}>
                                <TextField
                                    label='State'
                                    value={state}
                                    error={state ? false : true}
                                    helperText={state ? '' : 'Your state is required.'}
                                    required={true}
                                    onChange={(data) => this.update('state', data)}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box m={2}>
                                <TextField
                                    label='Landmark (optional)'
                                    value={landmark}
                                    onChange={(data) => this.update('landmark', data)}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box m={2}>
                                <Typography
                                    align='center'
                                    variant='body1'
                                    className='t-text-link'
                                    icon='check'
                                    text='Confirm Address'
                                    onClick={this.confirm}
                                />
                            </Box>
                        </Grid>
                    </>
                }
            </Grid>
        );
    }
};