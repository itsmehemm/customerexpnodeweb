import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '../../../common/elements/Typography';
import MultiSelect from '../../../common/elements/MultiSelect';
import Select from '../../../common/elements/Select';
import TextField from '../../../common/elements/TextField';

export default class Attributes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            default_size: 'L',
            default_color: 'Red',
            available_sizes: ['L'],
            available_colors: ['Red'],
            stock_quantity: 'UNLIMITED',

            errors: {
                available_sizes: false,
                available_colors: false,
                stock_quantity: false
            },
            error_messages: {
                available_sizes_error: '',
                available_colors_error: '',
                stock_quantity_error: '',
            }
        };
    }

    componentDidUpdate() {
        if (this.props.validate) {
            this.validate();
            this.sendAttributes();
        }
    }

    validate() {
        let prevState = this.state;
        if (this.state.available_sizes.length === 0) {
            prevState.errors.available_sizes = true;
            prevState.error_messages.available_sizes_error = 'Atleast one size should be available.';
            this.setState({ ...prevState });
            return false;
        }
        if (this.state.available_colors.length === 0) {
            prevState.errors.available_colors = true;
            prevState.error_messages.available_colors_error = 'Atleast one color should be available.';
            this.setState({ ...prevState });
            return false;
        }
        if (this.state.stock_quantity !== 'UNLIMITED' && isNaN(parseInt(this.state.stock_quantity))) {
            prevState.errors.stock_quantity = true;
            prevState.error_messages.stock_quantity_error = 'Stock quantity should be a valid number or UNLIMITED';
            this.setState({ ...prevState });
            return false;
        }

        this.setState({
            errors: {
                available_sizes: false,
                available_colors: false,
                stock_quantity: false
            },
            error_messages: {
                available_sizes_error: '',
                available_colors_error: '',
                stock_quantity_error: '',
            }
        });

        return true;
    }

    sendAttributes() {
        if (this.validate())
            this.props.updateAttributes({
                default_size: this.state.default_size,
                default_color: this.state.default_color,
                available_sizes: this.state.available_sizes,
                available_colors: this.state.available_colors,
                stock_quantity: this.state.stock_quantity
            });
        else
            this.props.updateAttributes(null);
    }

    onChange = async (element, data) => {
        await this.setState({ [element]: data });
        this.sendAttributes();
    }

    render() {
        return (
            <div className="t-container">
                <Card>
                    <div className="t-container">
                        <Grid container spacing={3}>
                            <Typography text="Attributes" />
                            <Select
                                width={3}
                                label="Default Size"
                                value={this.state.default_size}
                                onChange={data => this.onChange("default_size", data)}
                                options={[{ value: 'S', label: 'S' }, { value: 'M', label: 'M' }, { value: 'L', label: 'L' }, { value: 'XL', label: 'XL' }, { value: 'XXL', label: 'XXL' }]}
                            />
                            <MultiSelect
                                error={this.state.errors.available_sizes}
                                helperText={this.state.error_messages.available_sizes_error}
                                width={3}
                                label="Available Sizes"
                                values={this.state.available_sizes}
                                onChange={data => this.onChange("available_sizes", data)}
                                options={["S", "M", "L", "XL", "XXL"]}

                            />
                            <Select
                                width={3}
                                label="Default Color"
                                value={this.state.default_color}
                                onChange={data => this.onChange("default_color", data)}
                                options={[{ value: 'Red', label: 'Red' }, { value: 'Black', label: 'Black' }, { value: 'Blue', label: 'Blue' }]}
                            />
                            <MultiSelect
                                error={this.state.errors.available_colors}
                                helperText={this.state.error_messages.available_colors_error}
                                width={3}
                                label="Available Colors"
                                values={this.state.available_colors}
                                onChange={data => this.onChange("available_colors", data)}
                                options={["Red", "Black", "Blue"]}
                            />
                            <TextField
                                error={this.state.errors.stock_quantity}
                                helperText={this.state.error_messages.stock_quantity_error}
                                width={3}
                                type="text"
                                label="Stock quantity"
                                value={this.state.stock_quantity}
                                onChange={data => this.onChange("stock_quantity", data)}
                            />
                        </Grid>
                    </div>
                </Card>
            </div >
        );
    }
}