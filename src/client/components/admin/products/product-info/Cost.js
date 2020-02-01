import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '../../../common/elements/Typography';
import TextField from '../../../common/elements/TextField';
import Select from '../../../common/elements/Select';

export default class Cost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            discount: {
                type: 'NO_DISCOUNT',
                value: 0
            },
            cost: {
                amount: 0,
                currency: 'INR'
            },
            errors: {
                cost_amount_error: false
            },
            error_messages: {
                cost_amount_error: ''
            }
        };
    }

    componentDidUpdate() {
        // To trigger component validation from parent.
        if (this.props.validate) {
            this.validate();
            this.sendCost();
        }
    }

    // validate the current state variables.
    validate() {
        let amount = this.state.cost.amount;
        if (parseInt(amount) === 0) {
            this.setState({
                errors: { cost_amount_error: true },
                error_messages: { cost_amount_error: 'Amount can\'t be 0' }
            });
            return false;
        }
        if (!amount) {
            this.setState({
                errors: { cost_amount_error: true },
                error_messages: { cost_amount_error: 'Amount is required for a product' }
            });
            return false;
        }
        this.setState({
            errors: { cost_amount_error: false },
            error_messages: { cost_amount_error: '' }
        });
        return true;
    }

    // update this.state.cost
    onCostChange = async (type, data) => {
        await this.setState({
            cost: {
                ...this.state.cost,
                [type]: data
            },
        });
        this.validate();
        this.sendCost();
    }

    // update this.state.discount
    onDiscountChange = async (type, data) => {
        await this.setState({
            discount: {
                ...this.state.discount,
                [type]: data
            }
        });
        this.validate();
        this.sendCost();
    }

    sendCost = () => {
        // send data only when all state variables are valid.
        if (this.validate()) {
            this.props.updateCost({ cost: this.state.cost, discount: this.state.discount });
        } else {
            this.props.updateCost(null);
        }
    }

    render() {
        return (
            <div className="t-container">
                <Card>
                    <div className="t-container">
                        <Grid container spacing={3}>
                            <Typography text="Cost" />
                            <TextField
                                error={this.state.errors.cost_amount_error}
                                helperText={this.state.error_messages.cost_amount_error}
                                width={3}
                                type="number"
                                label="Amount"
                                value={this.state.cost.amount}
                                onChange={data => this.onCostChange("amount", data)}
                            />
                            <Select
                                width={3}
                                label="Currency"
                                value={this.state.cost.currency}
                                onChange={data => this.onCostChange("currency", data)}
                                options={[{ value: 'INR', label: 'INR' }, { value: 'USD', label: 'USD' }]}
                            />
                            <Select
                                width={3}
                                label="Discount Type"
                                value={this.state.discount.type}
                                onChange={data => this.onDiscountChange("type", data)}
                                options={[{ value: 'NO_DISCOUNT', label: 'No Discount' }, { value: 'INSTANT', label: 'Instant' }, { value: 'PERCENTAGE', label: 'Percentage' }]}
                            />
                            <TextField
                                width={3}
                                type="number"
                                label="Discount value"
                                value={this.state.discount.value}
                                onChange={data => this.onCostChange("value", data)}
                            />
                        </Grid>
                    </div>
                </Card>
            </div >
        );
    }
}