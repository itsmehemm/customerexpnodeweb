import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

import Typography from '../common/elements/Typography';

import Advanced from './products/product-info/Advanced';
import Attributes from './products/product-info/Attributes';
import Cost from './products/product-info/Cost';
import Basics from './products/product-info/Basics';

import '../../styles/admin.css';

import addProduct from '../../actions/add-product';

/**
 * Hosts a list of input fields to add/edit products.
 */

export default class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {
                id: null,
                name: null,
                description: null,
                code: 'CODE_MISC',
                category_id: 'CATEGORY_MISC',
                default_size: 'L',
                default_color: null,
                available_sizes: ['L'],
                available_colors: [],
                discount: {
                    type: 'NO_DISCOUNT',
                    value: 0
                },
                stock_quantity: 'UNLIMITED',
                cost: {
                    amount: 0,
                    currency: 'INR'
                },
                picture_links: [],
                featured: false,
                thirty_day_exchange: false,
                fifteen_day_exchange: false,
                payment_options: ['CREDIT_OR_DEBIT_CARDS'],
                details: {
                    type: null,
                    sleeve: null,
                    fit: null,
                    fabric: null,
                    pack_size: null,
                    neck_type: null,
                    ideal_gender: null,
                    occasion: null,
                    brand_color: null,
                    fabric_care: null,
                    brand_fit: null,
                },
                validate: false,
            },
            errors: new Set()
        }

        this.updateCost = this.updateCost.bind(this);
        this.updateBasics = this.updateBasics.bind(this);
        this.updateAttributes = this.updateAttributes.bind(this);
        this.updateAdvanced = this.updateAdvanced.bind(this);
    }

    componentDidMount() {
        // Editing a product that's already there.
        if (this.props.product != null) {
            this.setState({ product: this.props.product })
        }
    }

    async add() {
        await this.setState({ validate: true });
        if (this.state.errors.size === 0) {
            console.log(`NO ERRORS!`)
        } else {
            console.log(`ERRORS!`)
        }
    }

    updateBasics(basics) {
        this.setState({ ...this.state, ...basics });
        let errors = this.state.errors;
        if (!basics)
            errors.add('BASICS');
        else
            errors.delete('BASICS');
        this.setState({ errors: errors });
    }

    updateCost(cost) {
        this.setState({ ...this.state, ...cost });
        let errors = this.state.errors;
        if (!cost)
            errors.add('COST');
        else
            errors.delete('COST');
        this.setState({ errors: errors });
    }

    updateAttributes(attributes) {
        this.setState({ ...this.state, ...attributes });
        let errors = this.state.errors;
        if (attributes === null) {
            console.log('add')
            errors.add('ATTRIBUTES');
        }
        else
            errors.delete('ATTRIBUTES');
        this.setState({ errors: errors });
        console.log(`ERRORS: ${JSON.stringify(errors)}`);
        console.log(`Attributes received: ${JSON.stringify(attributes)}`);
    }

    updateAdvanced(advanced) {
        this.setState({ ...this.state, details: advanced });
        let errors = this.state.errors;
        if (!advanced)
            errors.add('ADVANCED');
        else
            errors.delete('ADVANCED');
        this.setState({ errors: errors });
    }

    render() {
        return (
            <div className="t-container">
                <Typography align="center" size="h5" text="Add a new product to Tinnat sale" />

                <Basics validate={this.state.validate} updateBasics={this.updateBasics} />

                <Attributes validate={this.state.validate} updateAttributes={this.updateAttributes} />

                <Cost validate={this.state.validate} updateCost={this.updateCost} />

                <Advanced validate={this.state.validate} updateAdvanced={this.updateAdvanced} />

                <div className="t-container">
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                size="large"
                                variant="outlined"
                                color="primary"
                                // onClick={() => this.add()}
                                startIcon={<Icon>add</Icon>}
                            >
                                Add Product
                        </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                size="large"
                                variant="outlined"
                                color="primary"
                                startIcon={<Icon>refresh</Icon>}
                            >
                                Reset
                        </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}