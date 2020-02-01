import React, { Component } from 'react';
import Typography from '../../../common/elements/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '../../../common/elements/TextField';
import Card from '@material-ui/core/Card';

export default class Advanced extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            sleeve: "",
            fit: "",
            fabric: "",
            pack_size: "",
            neck_type: "",
            ideal_gender: "",
            occasion: "",
            brand_color: "",
            fabric_care: "",
            brand_fit: ""
        };
    }

    onChange = (element, data) => {
        this.setState({ [element]: data });
        this.props.advancedDetails(this.state);
    }

    render() {
        return (
            <div className="t-container">
                <Card>
                    <div className="t-container">
                        <Grid container spacing={3}>
                            <Typography text="Advanced Details" />
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
                                width={3}
                                label="Brand Color"
                                value={this.state.brand_color}
                                onChange={data => this.onChange('brand_color', data)}
                            />
                            <TextField
                                width={3}
                                label="Fabric Care"
                                value={this.state.fabric_care}
                                onChange={data => this.onChange('fabric_care', data)}
                            />
                            <TextField
                                width={3}
                                label="Brand Fit"
                                value={this.state.brand_fit}
                                onChange={data => this.onChange('brand_fit', data)}
                            />
                        </Grid>
                    </div>
                </Card>
            </div>
        );
    }
};