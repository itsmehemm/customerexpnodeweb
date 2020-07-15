import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MultiSelect from '../../../common/elements/MultiSelect';
import Typography from '../../../common/elements/Typography';
import PreferencesModal from '../../../../modals/business/warehouse/widgets/PreferencesModal';
import {
    COMPONENT_STATUS_INVALID,
    COMPONENT_STATUS_VALID
} from '../../../../lib/constants';
import paymentOptions from '../../../../lib/options/payment-options.json';

export default class Preferences extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...new PreferencesModal().getData(),
            helperTexts: {
                payment_options: 'Atleast one payment option should be selected.'
            },
            status: COMPONENT_STATUS_INVALID
        };
    }

    async componentDidMount() {
        const { data } = this.props;
        const preferencesModal = new PreferencesModal();
        preferencesModal.updateData(data.preferences);
        await this.setState({
            ...preferencesModal.getData()
        });
        await this.validate();
        await this.props.update('preferences', this.state);
    }

    async validate() {
        const { payment_options, helperTexts } = this.state;
        let errors = 0;
        if (payment_options.length === 0) {
            helperTexts.payment_options = 'Atleast one payment option should be selected.'
            errors += 1;
        } else {
            helperTexts.payment_options = null;
        }
        await this.setState({
            helperTexts: helperTexts,
            status: errors === 0 ? COMPONENT_STATUS_VALID : COMPONENT_STATUS_INVALID
        });
    }

    onChange = async (name, data) => {
        await this.setState({
            [name]: data
        });
        await this.validate();
        await this.props.update('preferences', this.state);
    }

    render() {
        const {
            featured,
            active,
            thirty_day_exchange,
            fifteen_day_exchange,
            payment_options,
            helperTexts
        } = this.state;
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant='button' text='Preferences' />
                </Grid>
                <Grid item xs={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color='primary'
                                checked={featured}
                                onChange={(event) => this.onChange('featured', event.target.checked)}
                            />
                        }
                        label='Mark this product as featured'
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color='primary'
                                checked={active}
                                onChange={(event) => this.onChange('active', event.target.checked)}
                            />
                        }
                        label='Enable this product for sale'
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color='primary'
                                checked={fifteen_day_exchange}
                                onChange={(event) => this.onChange('fifteen_day_exchange', event.target.checked)}
                            />
                        }
                        label='15 days exchange'
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color='primary'
                                checked={thirty_day_exchange}
                                onChange={(event) => this.onChange('thirty_day_exchange', event.target.checked)}
                            />
                        }
                        label='30 days exchange'
                    />
                </Grid>
                <Grid item xs={6}>
                    <MultiSelect
                        label='Accepted Payment options'
                        values={payment_options}
                        onChange={data => this.onChange('payment_options', data)}
                        error={helperTexts.payment_options ? true : false}
                        helperText={helperTexts.payment_options}
                        options={paymentOptions}
                    />
                </Grid>
            </Grid>
        );
    }
};