import React, { Component } from 'react';
import moment from 'moment';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Typography from '../../common/elements/Typography';
import TextField from '../../common/elements/TextField';
import Select from '../../common/elements/Select';
import Component404 from '../../common/errors/Component404';
import ComponentLoader from '../../common/loaders/ComponentLoader';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
    OPERATION_LOADING_ERROR,
    TRANSACTIONS_NOT_FOUND
} from '../../../lib/constants';
import { searchTransactions } from '../../../actions';
import { currencyCodeMapper } from '../../../lib/mappers';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#f5f7fa',
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.common.white,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const Transactions = ({ transactions }) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center"><Typography variant="body1_bold" text="Date" /></StyledTableCell>
                        <StyledTableCell align="center"><Typography variant="body1_bold" text="Transaction ID" /></StyledTableCell>
                        <StyledTableCell align="center"><Typography variant="body1_bold" text="Order ID" /></StyledTableCell>
                        <StyledTableCell align="center"><Typography variant="body1_bold" text="Customer" /></StyledTableCell>
                        <StyledTableCell align="center"><Typography variant="body1_bold" text="Payment Status" /></StyledTableCell>
                        <StyledTableCell align="center"><Typography variant="body1_bold" text="Gross" /></StyledTableCell>
                        <StyledTableCell align="center"><Typography variant="body1_bold" text="Actions" /></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell align="left"><Typography variant="body2" text={moment(row.time_stamp).format("MMM D, YYYY")} /></StyledTableCell>
                            <StyledTableCell align="center"><Typography variant="body2" text={row.transaction_id} /></StyledTableCell>
                            <StyledTableCell align="center"><Typography variant="body2" text={row.order_id} /></StyledTableCell>
                            <StyledTableCell align="left">
                                {row.billing_address && row.billing_address.name && <Typography variant="body2" text={row.billing_address.name} />}
                                {row.personal_information && row.personal_information.email && <Typography variant="body2" text={row.personal_information.email} />}
                                {row.personal_information && row.personal_information.phone_number && <Typography variant="body2" text={row.personal_information.phone_number} />}
                            </StyledTableCell>
                            <StyledTableCell align="center"><Typography variant="body2" text={row.status} /></StyledTableCell>
                            <StyledTableCell align="center"><Typography variant="body2" text={`${currencyCodeMapper[row.amount.currency]}${row.amount.subtotal}`} /></StyledTableCell>
                            <StyledTableCell align="center"><Button onClick={() => window.open(`/business/activity/transaction/${row.transaction_id}`)}>View</Button></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

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
                                        <Transactions transactions={transactions} />
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