import React, { Component } from 'react';
import validUrl from 'valid-url';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '../../../common/elements/Typography';
import TextField from '../../../common/elements/TextField';
import Select from '../../../common/elements/Select';
import ThemesModal from '../../../../modals/business/warehouse/widgets/ThemesModal';
import {
    COMPONENT_STATUS_INVALID,
    COMPONENT_STATUS_VALID,
    INSTANT_AMOUNT,
    INSTANT_PERCENTAGE
} from '../../../../lib/constants';
import availableSizes from '../../../../lib/options/sizes.json';
import availableColors from '../../../../lib/options/colors.json';
import currencyCodes from '../../../../lib/options/currency-codes.json';
import discountTypes from '../../../../lib/options/discount-types.json';

export default class Theme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...new ThemesModal().getDefaultTheme(),
            helperTexts: {
                size: 'Select a size for the theme',
                color: 'Select a color for the theme',
                picture_links: 'Atleast one product image is required',
                maximum_retail_price: 'MRP should be greater than 0.',
                discount_value: 'Invalid discount value',
                stock_quantity: null,
            },
            link: ''
        };
    }

    async componentDidMount() {
        const { data } = this.props;
        await this.setState({
            ...data
        });
        await this.validate();
    }

    async onChange(name, value) {
        await this.setState({
            [name]: value
        });
        await this.validate();
    }

    async onAmountChange(name, value) {
        const { amount } = this.state;
        await this.setState({
            amount: {
                ...amount,
                [name]: value
            }
        });
        await this.updateSubTotal();
        await this.validate();
    }

    async onDiscountChange(name, value) {
        const { amount } = this.state;
        const { discount } = amount;
        await this.setState({
            amount: {
                ...amount,
                discount: {
                    ...discount,
                    [name]: value
                }
            }
        });
        await this.updateSubTotal();
        await this.validate();
    }

    async onCorrectionChange(data) {
        const { amount } = this.state;
        await this.setState({
            amount: {
                ...amount,
                correction: data
            }
        });
        await this.updateSubTotal();
        await this.validate();
    }

    async updateSubTotal() {
        const { amount } = this.state;
        const { maximum_retail_price, discount, correction } = amount;
        let subtotal = parseInt(maximum_retail_price);
        if (discount.type === INSTANT_AMOUNT) {
            subtotal -= parseInt(discount.value);
        }
        if (discount.type === INSTANT_PERCENTAGE) {
            subtotal -= (subtotal * parseInt(discount.value) / 100);
        }
        if (!isNaN(parseInt(correction))) {
            subtotal += parseInt(correction);
        }
        this.setState({
            amount: {
                ...amount,
                subtotal: isNaN(parseInt(subtotal)) ? 0 : subtotal
            }
        });
    }

    async validate() {
        const {
            size,
            color,
            stock_quantity,
            picture_links,
            amount
        } = this.state;
        const {
            maximum_retail_price,
            discount
        } = amount;
        let helperTexts = {};
        let error = false;
        if (!size) {
            helperTexts.size = 'Select a size for the theme';
            error = true;
        }
        if (!color) {
            helperTexts.color = 'Select a color for the theme';
            error = true;
        }
        if (stock_quantity !== 'UNLIMITED' && isNaN(parseInt(stock_quantity))) {
            helperTexts.stock_quantity = 'Stock quantity should be UNLIMITED or an integer';
            error = true;
        }
        if (picture_links.length === 0) {
            helperTexts.picture_links = 'Atleast one product image is required';
            error = true;
        }
        if (isNaN(parseInt(maximum_retail_price)) || parseInt(maximum_retail_price) <= 0) {
            helperTexts.maximum_retail_price = 'MRP should be greater than 0.';
            error = true;
        }
        if (discount.type !== 'NO_DISCOUNT' && (isNaN(parseInt(discount.value)) || parseInt(discount.value) <= 0)) {
            helperTexts.discount_value = 'Discount value should be greater than 0.';
            error = true;
        }
        await this.setState({
            status: error ? COMPONENT_STATUS_INVALID : COMPONENT_STATUS_VALID,
            helperTexts: helperTexts
        });
    }

    async addPictureLink(link) {
        const { picture_links } = this.state;
        if (validUrl.isUri(link)) {
            picture_links.push(link);
            await this.setState({ picture_links: picture_links });
            await this.validate();
        }
    }

    async removePictureLink(id) {
        const { picture_links } = this.state;
        let n = [];
        for (let i = 0; i < picture_links.length; i++) {
            if (i !== id) {
                n.push(picture_links[i]);
            }
        }
        await this.setState({ picture_links: n });
        await this.validate();
    }

    async addTheme() {
        const { status } = this.state;
        if (status === COMPONENT_STATUS_VALID) {
            alert('Theme added');
        }
        await this.props.update(this.state);
    }

    async removeTheme() {
        alert('Theme removed');
        await this.props.remove();
    }

    render() {
        const {
            size,
            color,
            stock_quantity,
            picture_links,
            amount,
            link,
            helperTexts
        } = this.state;
        const {
            maximum_retail_price,
            subtotal,
            correction,
            currency,
            discount
        } = amount;

        return (
            <Box m={2}>
                <Grid container spacing={3}>
                    <Select
                        width={4}
                        label='Size'
                        value={size}
                        onChange={data => this.onChange('size', data)}
                        error={helperTexts.size ? true : false}
                        helperText={helperTexts.size}
                        options={availableSizes}
                    />
                    <Select
                        width={4}
                        label='Color'
                        value={color}
                        onChange={data => this.onChange('color', data)}
                        error={helperTexts.color ? true : false}
                        helperText={helperTexts.color}
                        options={availableColors}
                    />
                    <TextField
                        width={4}
                        type='text'
                        label='MRP'
                        value={maximum_retail_price}
                        error={helperTexts.maximum_retail_price ? true : false}
                        helperText={helperTexts.maximum_retail_price}
                        onChange={data => this.onAmountChange('maximum_retail_price', data)}
                    />
                    <Select
                        width={4}
                        label='Discount Type'
                        value={discount.type}
                        onChange={data => this.onDiscountChange('type', data)}
                        options={discountTypes}
                    />
                    <TextField
                        width={4}
                        type='number'
                        label='Discount value'
                        value={discount.value}
                        error={helperTexts.discount_value ? true : false}
                        helperText={helperTexts.discount_value}
                        onChange={data => this.onDiscountChange('value', data)}
                    />
                    <TextField
                        width={4}
                        type='text'
                        label='Amount Correction'
                        value={correction}
                        onChange={data => this.onCorrectionChange(data)}
                    />
                    <Select
                        width={6}
                        label='Currency'
                        value={currency}
                        onChange={data => this.onAmountChange('currency', data)}
                        options={currencyCodes}
                    />
                    <TextField
                        label='Final Amount'
                        disabled={true}
                        width={6}
                        type='text'
                        value={subtotal}
                    />
                    <TextField
                        width={12}
                        type='text'
                        label='Stock quantity'
                        value={stock_quantity}
                        error={helperTexts.stock_quantity ? true : false}
                        helperText={helperTexts.stock_quantity}
                        onChange={data => this.onChange('stock_quantity', data)}
                    />
                    <Grid item xs={11}>
                        <TextField
                            width={12}
                            type='text'
                            label='Picture links'
                            value={link}
                            error={helperTexts.picture_links ? true : false}
                            helperText={helperTexts.picture_links}
                            onChange={data => this.onChange('link', data)}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            align='left'
                            style={{ height: '57px' }}
                            size='large'
                            variant='outlined'
                            color='primary'
                            onClick={() => this.addPictureLink(this.state.link)}
                            startIcon={<Icon>done</Icon>}></Button>
                    </Grid>
                    {
                        picture_links.map((link, key) =>
                            <Grid key={key} item xs={12}>
                                <Grid container>
                                    <Grid item xs={9}>
                                        <Typography className='t-text-link' variant='subtitle1' text={link} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography
                                            align='right'
                                            className='t-text-link'
                                            icon='close'
                                            variant='subtitle1'
                                            onClick={() => this.removePictureLink(key)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    }
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            style={{ height: '57px' }}
                            size='large'
                            variant='outlined'
                            color='primary'
                            onClick={() => this.addTheme()}
                            startIcon={<Icon>done</Icon>}>
                            Save
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            style={{ height: '57px' }}
                            size='large'
                            variant='outlined'
                            color='secondary'
                            onClick={() => this.removeTheme()}
                            startIcon={<Icon>cancel</Icon>}>
                            Remove
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        );
    }
};