import React, { Component } from 'react';
import moment from 'moment';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import TransactionList from './TransactionList';
import Typography from '../../common/elements/Typography';
import TextField from '../../common/elements/TextField';
import Select from '../../common/elements/Select';
import Component404 from '../../common/errors/Component404';
import ComponentLoader from '../../common/loaders/ComponentLoader';
import { searchTransactions } from '../../../actions';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
    OPERATION_LOADING_ERROR,
    TRANSACTIONS_NOT_FOUND
} from '../../../lib/constants';

export default class SearchTransactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: OPERATION_LOADING_COMPLETED,
            search_status: OPERATION_LOADING,
            from: moment().subtract(3, 'months'),
            to: moment(),
            search_type: "transaction_id",
            search_text: '',
            transactions: []
        };
        this.search = this.search.bind(this);
    }

    async componentDidMount() {
        await this.search();
    }

    constructSearchRequest = () => {
        const {
            from,
            to,
            search_type,
            search_text
        } = this.state;
        let request = {
            range: {
                from: new Date(from).getTime(),
                to: new Date(to).getTime()
            }
        };
        if (search_type === 'transaction_id') {
            request.transaction = {
                id: search_text
            };
        }
        if (search_type === 'order_id') {
            request.order = {
                id: search_text
            };
        }
        if (search_type === 'email') {
            request.order = {
                email: search_text
            };
        }
        if (search_type === 'phone_number') {
            request.order = {
                phone_number: search_text
            };
        }
        return request;
    }

    async update(name, value) {
        await this.setState({ [name]: value });
    }

    async updateRange(name, value) {
        await this.setState({ [name]: value });
        await this.search();
    }

    search = async () => {
        await this.setState({
            search_status: OPERATION_LOADING
        });
        const response = await searchTransactions(this.constructSearchRequest());
        if (response && Array.isArray(response.transactions)) {
            await this.setState({
                search_status: OPERATION_LOADING_COMPLETED,
                transactions: response.transactions
            });
        } else if (response && response.status === TRANSACTIONS_NOT_FOUND) {
            await this.setState({
                search_status: OPERATION_LOADING_COMPLETED,
                transactions: []
            });
        } else {
            await this.setState({
                search_status: OPERATION_LOADING_ERROR,
                transactions: []
            });
        }
    }

    render() {
        const {
            status,
            from,
            to,
            search_type,
            search_text,
            search_status,
            transactions
        } = this.state;
        return (
            <>
                {status === OPERATION_LOADING && <ComponentLoader />}
                {status === OPERATION_LOADING_ERROR && <Component404 />}
                {
                    status === OPERATION_LOADING_COMPLETED &&
                    <Box m={2}>
                        <Container maxWidth="lg">
                            <Card variant="outlined">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Box m={2}>
                                            <Typography variant="h6" text="Search Transactions" />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box m={2}>
                                            <Grid container>
                                                <Grid item xs={3}>
                                                    <Select
                                                        value={search_type}
                                                        options={[
                                                            { label: "Transaction ID", value: "transaction_id" },
                                                            { label: 'Order ID', value: "order_id" },
                                                            { label: 'Buyer email', value: "email" },
                                                            { label: 'Buyer Phonenumber', value: "phone_number" }
                                                        ]}
                                                        onChange={(data) => this.update('search_type', data)}
                                                    />
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <TextField
                                                        placeholder="Search for transactions"
                                                        value={search_text}
                                                        onChange={(data) => this.update('search_text', data)}
                                                    />
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <Button
                                                        style={{ height: '100%', width: '100%', backgroundColor: 'rgb(247, 36, 52)', color: '#fff' }}
                                                        variant="contained"
                                                        startIcon={<SearchIcon style={{ fontSize: '2em' }} />}
                                                        onClick={this.search}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <Box m={2}>
                                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                                        <KeyboardDatePicker
                                                            disableToolbar
                                                            inputVariant="outlined"
                                                            variant="inline"
                                                            format="MMM D, YYYY"
                                                            margin="normal"
                                                            id="date-picker-inline"
                                                            label="From"
                                                            value={from}
                                                            onChange={(data) => this.updateRange('from', data)}
                                                            KeyboardButtonProps={{
                                                                'aria-label': 'from date',
                                                            }}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </Box>
                                            </Grid>
                                            <Grid item>
                                                <Box m={2}>
                                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                                        <KeyboardDatePicker
                                                            disableToolbar
                                                            inputVariant="outlined"
                                                            variant="inline"
                                                            format="MMM D, YYYY"
                                                            margin="normal"
                                                            id="date-picker-inline"
                                                            label="To"
                                                            value={to}
                                                            onChange={(data) => this.updateRange('to', data)}
                                                            KeyboardButtonProps={{
                                                                'aria-label': 'from date',
                                                            }}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {search_status === OPERATION_LOADING && <ComponentLoader />}
                                    {
                                        search_status === OPERATION_LOADING_COMPLETED &&
                                        transactions && transactions.length > 0 &&
                                        <TransactionList transactions={transactions} columns={{
                                            date: true,
                                            transaction_id: true,
                                            order_id: true,
                                            customer: true,
                                            payment_status: true,
                                            gross: true,
                                            actions: true,
                                        }} />
                                    }
                                    {
                                        search_status === OPERATION_LOADING_COMPLETED &&
                                        transactions && transactions.length === 0 &&
                                        <Grid container>
                                            <Grid align="center" item xs={12}>
                                                <Box m={2}>
                                                    <Typography variant="body2" text="Sorry, no transactions were found that matches your filter." />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    }
                                </Grid>
                            </Card>
                        </Container>
                    </Box>
                }
            </>
        );
    }
};