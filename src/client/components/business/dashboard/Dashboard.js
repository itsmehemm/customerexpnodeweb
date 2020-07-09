import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Typography from '../../common/elements/Typography';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import PageviewIcon from '@material-ui/icons/Pageview';
import ViewListIcon from '@material-ui/icons/ViewList';
import TransactionList from '../activity/TransactionList';
import ComponentLoader from '../../common/loaders/ComponentLoader';
import { getKPIs } from '../../../actions';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
    OPERATION_LOADING_ERROR
} from '../../../lib/constants';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: OPERATION_LOADING
        };
    }

    async componentDidMount() {
        const response = await getKPIs();
        if (response && response.status === 'SUCCESS') {
            await this.setState({
                status: OPERATION_LOADING_COMPLETED,
                recent_transactions: response.recent_transactions
            });
        } else {
            await this.setState({ status: OPERATION_LOADING_ERROR });
        }
    }

    render() {
        const {
            recent_transactions,
            status
        } = this.state;
        return (
            <Box m={2}>
                <Container maxWidth={"lg"}>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Card variant="outlined">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Box m={2}>
                                            <Typography variant="h6" text="Quick links" />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={3} align="center" style={{ cursor: 'pointer' }}>
                                        <Box m={2}>
                                            <Card variant="outlined">
                                                <Box m={2} onClick={() => window.open('/business/warehouse/product/add')}>
                                                    <LibraryAddIcon fontSize="large" />
                                                    <Typography variant="subtitle1" text="Add Product" />
                                                </Box>
                                            </Card>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={3} align="center" style={{ cursor: 'pointer' }}
                                        onClick={() => window.open('/business/warehouse/products')}>
                                        <Box m={2}>
                                            <Card variant="outlined">
                                                <Box m={2}>
                                                    <ViewModuleIcon fontSize="large" />
                                                    <Typography variant="subtitle1" text="Products" />
                                                </Box>
                                            </Card>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={3} align="center" style={{ cursor: 'pointer' }}
                                        onClick={() => window.open('/business/activity/transactions')}>
                                        <Box m={2}>
                                            <Card variant="outlined">
                                                <Box m={2}>
                                                    <PageviewIcon fontSize="large" />
                                                    <Typography variant="subtitle1" text="Search Activity" />
                                                </Box>
                                            </Card>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>

                        <Grid item xs={10}>
                            <Card variant="outlined">
                                <Grid container>
                                    <Grid item xs={1}>
                                        <Box m={2}>
                                            <ViewListIcon fontSize="large" />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Box m={2}>
                                            <Typography variant="h6" text="Recent Activity" />
                                            <Typography variant="caption" text="Transactions" />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {status === OPERATION_LOADING && <ComponentLoader />}
                                        {status === OPERATION_LOADING_COMPLETED &&
                                            <TransactionList transactions={recent_transactions} columns={{
                                                date: true,
                                                transaction_id: true,
                                                order_id: true,
                                                payment_status: true,
                                                gross: true,
                                                actions: true,
                                            }} />
                                        }
                                        {status === OPERATION_LOADING_ERROR && <div> Error loading recent transactions </div>}
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        );
    }
};