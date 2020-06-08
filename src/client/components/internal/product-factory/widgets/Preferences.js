import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MultiSelect from '../../../common/elements/MultiSelect';
import Typography from '../../../common/elements/Typography';
import {
    COMPONENT_STATUS_INVALID,
    COMPONENT_STATUS_VALID
} from '../../../../lib/constants';
import paymentOptions from '../../../../lib/options/payment-options.json';
import PreferencesModal from '../../../../modals/internal/product-factory/widgets/PreferencesModal';

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
            thirty_day_exchange,
            fifteen_day_exchange,
            payment_options,
            helperTexts,
            message
        } = this.state;
        return (
            <Box m={2}>
                <Grid container spacing={3}>
                    <Typography variant="h6" text="4. Preferences" />
                    <Grid item xs={3}>
                        <MultiSelect
                            label="Accepted Payment options"
                            values={payment_options}
                            onChange={data => this.onChange("payment_options", data)}
                            error={helperTexts.payment_options ? true : false}
                            helperText={helperTexts.payment_options}
                            options={paymentOptions}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={featured}
                                    onChange={(event) => this.onChange('featured', event.target.checked)}
                                />
                            }
                            label="Mark this product as featured"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={fifteen_day_exchange}
                                    onChange={(event) => this.onChange('fifteen_day_exchange', event.target.checked)}
                                />
                            }
                            label="15 days exchange"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={thirty_day_exchange}
                                    onChange={(event) => this.onChange('thirty_day_exchange', event.target.checked)}
                                />
                            }
                            label="30 days exchange"
                        />
                    </Grid>
                </Grid>
            </Box >
        );
    }
}