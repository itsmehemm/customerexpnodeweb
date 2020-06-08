import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '../../../common/elements/TextField';
import Typography from '../../../common/elements/Typography';
import Select from '../../../common/elements/Select';
import BasicDetailsModal from '../../../../modals/internal/product-factory/widgets/BasicDetailsModal';
import {
    COMPONENT_STATUS_VALID,
    COMPONENT_STATUS_INVALID
} from '../../../../lib/constants';
import CategoryCodes from '../../../../lib/options/category-codes.json';

export default class BasicDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...new BasicDetailsModal().getData(),
            helperTexts: {
                name: {
                    text: '',
                    type: 'INFO'
                },
                product_code: {
                    text: 'Enter a unique code for your product',
                    type: 'INFO'
                }
            },
            status: COMPONENT_STATUS_INVALID
        };
    }

    async componentDidMount() {
        const { data } = this.props;
        const basicDetailsModal = new BasicDetailsModal();
        basicDetailsModal.updateData(data.basic_details);
        await this.setState({
            ...basicDetailsModal.getData()
        });
        await this.validate();
        await this.props.update('basic_details', this.state);
    }

    onChange = async (element, data) => {
        await this.setState({ [element]: data });
        await this.validate();
        await this.props.update('basic_details', this.state);
    }

    async validate() {
        let { name, product_code, helperTexts, status } = this.state;
        let errors = 0;
        if (!name || name.length === 0) {
            helperTexts.name = {
                text: 'Product name cannot be empty',
                type: 'ERROR'
            };
            errors += 1;
        } else {
            helperTexts.name = {
                text: null,
                type: 'INFO'
            }
        }
        if (!product_code || product_code.length === 0) {
            helperTexts.product_code = {
                text: 'Product code cannot be empty',
                type: 'ERROR'
            };
            errors += 1;
        } else {
            helperTexts.product_code = {
                text: 'Enter a unique code for your product',
                type: 'INFO'
            }
        }
        if (errors === 0) {
            status = COMPONENT_STATUS_VALID
        } else {
            status = COMPONENT_STATUS_INVALID
        }
        this.setState({ helperTexts: helperTexts, status: status });
    }

    render() {
        const { helperTexts } = this.state;
        return (
            <Box m={2}>
                <Grid container spacing={3}>
                    <Typography variant="h6" text="1. Basic Details" />
                    <TextField
                        required={true}
                        width={3}
                        label="Product Name"
                        value={this.state.name}
                        error={helperTexts.name.type === 'ERROR'}
                        helperText={helperTexts.name.text}
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
                        value={this.state.product_code}
                        error={helperTexts.product_code.type === 'ERROR'}
                        helperText={helperTexts.product_code.text}
                        onChange={data => this.onChange('product_code', data)}
                    />
                    <Select
                        width={3}
                        label="Category Code"
                        value={this.state.category_code}
                        onChange={data => this.onChange("category_code", data)}
                        options={CategoryCodes}
                    />
                </Grid>
            </Box>
        );
    }
};