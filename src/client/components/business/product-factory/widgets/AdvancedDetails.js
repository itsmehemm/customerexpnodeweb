import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '../../../common/elements/TextField';
import Typography from '../../../common/elements/Typography';
import AdvancedDetailsModal from '../../../../modals/business/product-factory/widgets/AdvancedDetailsModal';
import {
    COMPONENT_STATUS_VALID
} from '../../../../lib/constants';

export default class AdvancedDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...new AdvancedDetailsModal().getData(),
            status: COMPONENT_STATUS_VALID
        };
    }

    async componentDidMount() {
        const { data } = this.props;
        const advancedDetailsModal = new AdvancedDetailsModal();
        advancedDetailsModal.updateData(data.advanced_details);
        await this.setState({
            ...advancedDetailsModal.getData()
        });
        await this.props.update('advanced_details', this.state);
    }

    onChange = async (element, data) => {
        await this.setState({ [element]: data });
        await this.props.update('advanced_details', this.state);
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Typography variant="button" text="Advanced Details" />
                <TextField
                    width={3}
                    label="Type"
                    value={this.state.type}
                    onChange={data => this.onChange('type', data)}
                />
                <TextField
                    width={3}
                    label="Sleeve"
                    value={this.state.sleeve}
                    onChange={data => this.onChange('sleeve', data)}
                />
                <TextField
                    width={3}
                    label="Fit"
                    value={this.state.fit}
                    onChange={data => this.onChange('fit', data)}
                />
                <TextField
                    width={3}
                    label="Fabric"
                    value={this.state.fabric}
                    onChange={data => this.onChange('fabric', data)}
                />
                <TextField
                    width={3}
                    label="Pack Size"
                    value={this.state.pack_size}
                    onChange={data => this.onChange('pack_size', data)}
                />
                <TextField
                    width={3}
                    label="Neck Type"
                    value={this.state.neck_type}
                    onChange={data => this.onChange('neck_type', data)}
                />
                <TextField
                    width={3}
                    label="Ideal Gender"
                    value={this.state.ideal_gender}
                    onChange={data => this.onChange('ideal_gender', data)}
                />
                <TextField
                    width={3}
                    label="Occasion"
                    value={this.state.occasion}
                    onChange={data => this.onChange('occasion', data)}
                />
                <TextField
                    width={4}
                    label="Brand Color"
                    value={this.state.brand_color}
                    onChange={data => this.onChange('brand_color', data)}
                />
                <TextField
                    width={4}
                    label="Fabric Care"
                    value={this.state.fabric_care}
                    onChange={data => this.onChange('fabric_care', data)}
                />
                <TextField
                    width={4}
                    label="Brand Fit"
                    value={this.state.brand_fit}
                    onChange={data => this.onChange('brand_fit', data)}
                />
            </Grid>
        );
    }
};