import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Slider from '@material-ui/core/Slider';
import Typography from '../../common/elements/Typography';
import subCategoryCodes from '../../../lib/options/sub-category-codes.json';
import availableSizes from '../../../lib/options/sizes.json';

export default class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sizes: {},
            priceRange: [299, 799],
            subCategories: {},
        };
        this.selectAllSubCategories(true);
        this.selectAllSizes(true);
    }

    onSubCategoryChange = async (subcategory, value) => {
        const { subCategories } = this.state;
        subCategories[subcategory] = value;
        await this.setState({ subCategories });
        await this.updateFilters();
    }

    selectAllSubCategories = async (value) => {
        const { subCategories } = this.state;
        subCategories['ALL'] = value;
        subCategoryCodes.forEach(subcategory => subCategories[subcategory.name] = value);
        await this.setState({ subCategories });
        await this.updateFilters();
    }

    onPriceChange = async (event, value) => {
        await this.setState({ priceRange: value });
        await this.updateFilters();
    }

    onSizeChange = async (name, value) => {
        const { sizes } = this.state;
        sizes[name] = value;
        await this.setState({ sizes });
        await this.updateFilters();
    }

    selectAllSizes = async (value) => {
        const { sizes } = this.state;
        sizes['ALL'] = value;
        availableSizes.forEach(s => sizes[s.name] = value);
        await this.setState({ sizes });
        await this.updateFilters();
    }

    clearAll = async () => {
        this.selectAllSubCategories(false);
        this.selectAllSizes(false);
        this.onPriceChange(null, [299, 799]);
        await this.updateFilters();
    }

    updateFilters = async () => {
        const { priceRange, subCategories, sizes } = this.state;
        let filters = {};
        filters.priceRange = {
            min: priceRange[0],
            max: priceRange[1]
        };
        filters.subCategories = [];
        if (subCategories['ALL'] === false) {
            subCategoryCodes.forEach(subcategory => {
                if (subCategories[subcategory.name] === true) {
                    filters.subCategories.push(subcategory.value);
                }
            });
        }
        filters.sizes = [];
        if (sizes['ALL'] === false) {
            availableSizes.forEach(s => {
                if (sizes[s.name] === true) {
                    filters.sizes.push(s.value);
                }
            });
        }
        this.props.onUpdate(filters);
    }

    render() {
        const {
            sizes,
            subCategories,
            priceRange
        } = this.state;
        return (
            <Card variant='outlined'>
                <Box m={2}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography text='Filters' variant='h6' />
                        </Grid>
                        <Grid item xs={6}>
                            <Box m={1}>
                                <Typography
                                    align='right'
                                    text='CLEAR ALL'
                                    variant='subtitle2'
                                    className='t-text-link-2'
                                    onClick={this.clearAll}
                                />
                            </Box>
                        </Grid>

                    </Grid>
                </Box>
                <Divider />
                <Box m={2}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography text='Categories' variant='button' />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        style={{ color: 'rgb(247, 36, 52)' }}
                                        checked={subCategories['ALL'] === true}
                                        onChange={(e) => this.selectAllSubCategories(e.target.checked)}
                                        name='ALL'
                                    />
                                }
                                label={'All'}
                            />
                        </Grid>
                        {
                            subCategoryCodes.map((categoryCode, key) =>
                                <Grid item xs={12} key={key}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                style={{ color: 'rgb(247, 36, 52)' }}
                                                disabled={subCategories['ALL'] === true}
                                                checked={subCategories[categoryCode.name] === true}
                                                onChange={(e) => this.onSubCategoryChange(categoryCode.name, e.target.checked)}
                                                name={categoryCode.name}
                                            />
                                        }
                                        label={categoryCode.label}
                                    />
                                </Grid>)
                        }
                    </Grid>
                </Box>
                <Divider />
                <Box m={2}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography text='Price' variant='button' id='range-slider' />
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: '3em' }}>
                            <Box m={2}>
                                <Slider
                                    style={{ color: 'rgb(247, 36, 52)' }}
                                    value={priceRange}
                                    onChange={this.onPriceChange}
                                    valueLabelDisplay='auto'
                                    aria-labelledby='range-slider'
                                    valueLabelDisplay='on'
                                    min={99}
                                    max={1999}
                                    valueLabelFormat={(value) => '₹' + value}
                                    marks={[
                                        {
                                            value: 99,
                                            label: '₹99',
                                        },
                                        {
                                            value: 1999,
                                            label: '₹1999',
                                        },
                                    ]}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Divider />
                <Box m={2}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography text='Size' variant='button' />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        style={{ color: 'rgb(247, 36, 52)' }}
                                        checked={sizes['ALL'] === true}
                                        onChange={(e) => this.selectAllSizes(e.target.checked)}
                                        name='ALL'
                                    />
                                }
                                label={'All'}
                            />
                        </Grid>
                        {
                            availableSizes.map((s, key) =>
                                <Grid item xs={12} key={key}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                style={{ color: 'rgb(247, 36, 52)' }}
                                                disabled={sizes['ALL'] === true}
                                                checked={sizes[s.name] === true}
                                                onChange={(e) => this.onSizeChange(s.name, e.target.checked)}
                                                name={s.name}
                                            />
                                        }
                                        label={s.label}
                                    />
                                </Grid>)
                        }
                    </Grid>
                </Box>
            </Card>
        );
    }
}