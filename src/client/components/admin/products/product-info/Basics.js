import React, { Component } from 'react';
import Typography from '../../../common/elements/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '../../../common/elements/TextField';
import Card from '@material-ui/core/Card';
import Select from '../../../common/elements/Select';

export default class Basics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            code: 'CODE_MISC',
            category_id: 'CATEGORY_MISC',
        };
    }

    onChange = (element, data) => {
        this.setState({ [element]: data });
        this.props.basics(this.state);
    }

    render() {
        return (
            <div className="t-container">
                <Card>
                    <div className="t-container">
                        <Grid container spacing={3}>
                            <Typography text="Basic Details" />
                            <TextField
                                required={true}
                                width={3}
                                label="Product Name"
                                value={this.state.name}
                                onChange={data => this.onChange('name', data)}
                            />
                            <TextField
                                width={3}
                                label="Product Description"
                                value={this.state.description}
                                onChange={data => this.onChange('description', data)}
                            />
                            <TextField
                                required={true}
                                width={3}
                                label="Product Code"
                                value={this.state.fit}
                                helperText="Enter an unique code for the product"
                                onChange={data => this.onChange('code', data)}
                            />
                            <Select
                                width={3}
                                label="Category Code"
                                value={this.state.category_id}
                                onChange={data => this.onChange("category_id", data)}
                                options={[{ value: 'CODE_MISC', label: 'MISC' }]}
                            />
                        </Grid>
                    </div>
                </Card>
            </div>
        );
    }
};