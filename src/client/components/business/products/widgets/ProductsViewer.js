import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '../../../common/elements/Typography';
import ComponentLoader from '../../../common/loaders/ComponentLoader';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
    OPERATION_LOADING_ERROR,
} from '../../../../lib/constants';
import ProductThemeWidget from '../../../common/widgets/ProductThemeWidget';

export default class ProductsViewer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            status,
            products
        } = this.props;
        return (
            <Card variant="outlined">
                <Grid container>
                    <Grid item xs={12}>
                        <Box m={2}>
                            <Typography variant="h6" text="Men's T Shirts" />
                            {status === OPERATION_LOADING && <ComponentLoader />}
                            {status === OPERATION_LOADING_ERROR && <div>Loading failed</div>}
                            {
                                status === OPERATION_LOADING_COMPLETED &&
                                <Typography variant="caption" text={`${products.length} products found that match your filter`} />
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Box m={1}>
                            {
                                status === OPERATION_LOADING_COMPLETED &&
                                products.length > 0 &&
                                <Grid container spacing={2}>
                                    {
                                        products.map(product =>
                                            <Grid item xs={4}>
                                                <ProductThemeWidget
                                                    {...product}
                                                    edit={true}
                                                    onClick={() => window.open(product.url)}
                                                />
                                            </Grid>)
                                    }
                                </Grid>
                            }
                            {
                                status === OPERATION_LOADING_COMPLETED &&
                                products.length === 0 && 
                                <div>
                                    There are no products that match your filter critera.
                                </div>
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        );
    }
}