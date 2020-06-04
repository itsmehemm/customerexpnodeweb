import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '../../../common/elements/Typography';
import MultiSelect from '../../../common/elements/MultiSelect';
import Select from '../../../common/elements/Select';
import TextField from '../../../common/elements/TextField';
import { COMPONENT_STATUS_INVALID, COMPONENT_STATUS_VALID } from '../../../../lib/constants';
import availableSizes from '../../../../lib/options/sizes.json';
import availableColors from '../../../../lib/options/colors.json';
import AttributesModal from '../../../../modals/internal/product-factory/widgets/AttributesModal';

export default class Attributes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...new AttributesModal().getData(),
            helperTexts: {
                available_sizes: null,
                available_colors: null,
                stock_quantity: null
            },
            status: COMPONENT_STATUS_INVALID
        };
    }

    async componentDidMount() {
        const { data } = this.props;
        const attributesModal = new AttributesModal();
        attributesModal.updateData(data.attributes);
        await this.setState({
            ...attributesModal.getData()
        });
        await this.validate();
        await this.props.update('attributes', this.state);
    }

    async validate() {
        let { helperTexts, available_sizes, available_colors, stock_quantity, default_color, default_size } = this.state;
        let errors = 0;
        if (available_sizes.length === 0) {
            helperTexts.available_sizes = 'Atleast one size should be available.';
            errors += 1;
        } else {
            helperTexts.available_sizes = null;
        }
        if (available_colors.length === 0) {
            helperTexts.available_colors = 'Atleast one color should be available.';
            errors += 1;
        } else {
            helperTexts.available_colors = null;
        }
        if (!default_color) {
            helperTexts.default_color = 'Select a default color to display';
            errors += 1;
        } else {
            helperTexts.default_color = null;
        }
        if (!default_size) {
            helperTexts.default_size = 'Select a default size to display';
            errors += 1;
        } else {
            helperTexts.default_size = null;
        }
        if (!stock_quantity || (stock_quantity !== 'UNLIMITED' && isNaN(parseInt(stock_quantity)))) {
            helperTexts.stock_quantity = 'Stock quantity must be more than 0';
            errors += 1;
        } else {
            helperTexts.stock_quantity = null;
        }
        await this.setState({
            helperTexts: helperTexts,
            status: errors > 0 ? COMPONENT_STATUS_INVALID : COMPONENT_STATUS_VALID
        });
    }

    onChange = async (element, data) => {
        await this.setState({ [element]: data });
        await this.validate();
        await this.props.update('attributes', this.state);
    }

    render() {
        const { helperTexts, default_size, default_color, available_sizes, available_colors, stock_quantity } = this.state;
        return (
            <div className="t-container">
                <Card>
                    <div className="t-container">
                        <Grid container spacing={3}>
                            <Typography type="header" text="Attributes" />
                            <Select
                                width={2}
                                label="Default Size"
                                value={default_size}
                                onChange={data => this.onChange("default_size", data)}
                                error={helperTexts.default_size ? true : false}
                                helperText={helperTexts.default_size}
                                options={availableSizes}
                            />
                            <MultiSelect
                                width={3}
                                label="Available Sizes"
                                values={this.state.available_sizes}
                                onChange={data => this.onChange("available_sizes", data)}
                                error={helperTexts.available_sizes ? true : false}
                                helperText={helperTexts.available_sizes}
                                options={availableSizes}
                            />
                            <Select
                                width={2}
                                label="Default Color"
                                value={this.state.default_color}
                                error={helperTexts.default_color ? true : false}
                                helperText={helperTexts.default_color}
                                options={availableColors}
                                onChange={data => this.onChange("default_color", data)}
                            />
                            <MultiSelect
                                width={3}
                                label="Available Colors"
                                values={available_colors}
                                error={helperTexts.available_colors ? true : false}
                                helperText={helperTexts.available_colors}
                                options={availableColors}
                                onChange={data => this.onChange("available_colors", data)}
                            />
                            <TextField
                                width={2}
                                type="text"
                                label="Stock quantity"
                                value={stock_quantity}
                                error={helperTexts.stock_quantity ? true : false}
                                helperText={helperTexts.stock_quantity}
                                onChange={data => this.onChange("stock_quantity", data)}
                            />
                        </Grid>
                    </div>
                </Card>
            </div >
        );
    }
}