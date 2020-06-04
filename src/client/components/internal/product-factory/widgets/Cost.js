import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import Typography from '../../../common/elements/Typography';
import TextField from '../../../common/elements/TextField';
import Select from '../../../common/elements/Select';
import CostDetailsModal from '../../../../modals/internal/product-factory/widgets/CostDetailsModal';
import { COMPONENT_STATUS_INVALID, COMPONENT_STATUS_VALID } from '../../../../lib/constants';
import currencyCodes from '../../../../lib/options/currency-codes.json';
import discountTypes from '../../../../lib/options/discount-types.json';

export default class Cost extends Component {

    constructor(props) {
        super(props);
        this.state = {
           ...new CostDetailsModal().getDefaultData(),
            helperTexts: {
                cost_amount: null,
                discount_value: null
            },
            status: COMPONENT_STATUS_INVALID
        };
    }

    async componentDidMount() {
        const { data } = this.props;
        const costDetailsModal = new CostDetailsModal();
        costDetailsModal.updateData(data.cost_details);
        await this.setState({
            ...costDetailsModal.getData()
        });
        await this.validate();
        await this.props.update('cost_details', this.state);
    }

    async validate() {
        let { discount, cost, helperTexts } = this.state;
        let { amount } = cost;
        let { value } = discount;
        let errors = 0;
        if (parseInt(amount) === 0) {
            helperTexts.cost_amount = 'Amount can\'t be 0';
            errors += 1;
        } else if (!amount) {
            helperTexts.cost_amount = 'Amount is required for a product';
            errors += 1;
        } else {
            helperTexts.cost_amount = null;
        }

        if (discount.type !== "NO_DISCOUNT" && (isNaN(parseInt(value)) || parseInt(value) <= 0)) {
            helperTexts.discount_value = 'Invalid discount value.';
            errors += 1;
        } else {
            helperTexts.discount_value = null;
        }

        await this.setState({
            helperTexts: helperTexts,
            status: errors === 0 ? COMPONENT_STATUS_VALID : COMPONENT_STATUS_INVALID
        });
    }

    onCostChange = async (name, data) => {
        await this.setState({
            cost: {
                ...this.state.cost,
                [name]: data
            },
        });
        await this.validate();
        await this.props.update('cost_details', this.state);
    }

    onDiscountChange = async (name, data) => {
        await this.setState({
            discount: {
                ...this.state.discount,
                [name]: data
            }
        });
        await this.validate();
        await this.props.update('cost_details', this.state);
    }

    render() {
        const { discount, cost, helperTexts } = this.state;
        return (
            <div className="t-container">
                <Card>
                    <div className="t-container">
                        <Grid container spacing={3}>
                            <Typography type="header" text="Cost" />
                            <TextField
                                width={3}
                                type="number"
                                label="Amount"
                                value={cost.amount}
                                error={helperTexts.cost_amount ? true : false}
                                helperText={helperTexts.cost_amount}
                                onChange={data => this.onCostChange("amount", data)}
                            />
                            <Select
                                width={3}
                                label="Currency"
                                value={cost.currency}
                                onChange={data => this.onCostChange("currency", data)}
                                options={currencyCodes}
                            />
                            <Select
                                width={3}
                                label="Discount Type"
                                value={discount.type}
                                onChange={data => this.onDiscountChange("type", data)}
                                options={discountTypes}
                            />
                            <TextField
                                width={3}
                                type="number"
                                label="Discount value"
                                value={discount.value}
                                error={helperTexts.discount_value ? true : false}
                                helperText={helperTexts.discount_value}
                                onChange={data => this.onDiscountChange("value", data)}
                            />
                        </Grid>
                    </div>
                </Card>
            </div >
        );
    }
}