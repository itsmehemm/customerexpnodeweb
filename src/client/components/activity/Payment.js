import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Header from '../header/Header';
import Typography from '../common/elements/Typography';
import ViewAddress from '../instant-purchase/widgets/ViewAddress';
import Component404 from '../common/errors/widgets/Component404';
import ComponentLoader from '../common/loaders/ComponentLoader';
import { getPaymentActivity } from '../../actions';
import { currencyCodeMapper } from '../../lib/mappers';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
    OPERATION_LOADING_ERROR,
    PAYMENT_ACTIVITY_NOT_FOUND,
    INSTANT_PERCENTAGE,
    INSTANT_AMOUNT
} from '../../lib/constants';

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

const getDiscountString = (discount) => {
    if (!discount) return '';
    if (discount.type === INSTANT_PERCENTAGE) return `${discount.value}%`;
    if (discount.type === INSTANT_AMOUNT) return `${currencyCodeMapper[discount.currency]}${discount.value}`;
    return '';
}

const PurchaseItems = ({ purchaseItems, amount }) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell><Typography variant="body1_bold" text="Order Details" /></StyledTableCell>
                        <StyledTableCell align="right"><Typography variant="body1_bold" text="Quantity" /></StyledTableCell>
                        <StyledTableCell align="right"><Typography variant="body1_bold" text="Price" /></StyledTableCell>
                        <StyledTableCell align="right"><Typography variant="body1_bold" text="Discount" /></StyledTableCell>
                        <StyledTableCell align="right"><Typography variant="body1_bold" text="Subtotal" /></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {purchaseItems.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                <Typography variant="body1" text={row.name} />
                            </StyledTableCell>
                            <StyledTableCell align="right"><Typography variant="body1" text={row.quantity} /></StyledTableCell>
                            <StyledTableCell align="right"><Typography variant="body1" text={`${currencyCodeMapper[row.amount.currency]}${row.amount.maximum_retail_price}`} /></StyledTableCell>
                            <StyledTableCell align="right"><Typography variant="body1" text={getDiscountString({ ...row.amount.discount, currency: amount.currency })} /></StyledTableCell>
                            <StyledTableCell align="right"><Typography variant="body1" text={`${currencyCodeMapper[row.amount.currency]}${row.amount.subtotal}`} /></StyledTableCell>
                        </StyledTableRow>
                    ))}
                    <StyledTableRow key={amount.currency}>
                        <StyledTableCell component="th" scope="row">
                        </StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right"><Typography variant="body1_bold" text="Subtotal" /></StyledTableCell>
                        <StyledTableCell align="right"><Typography variant="h6" text={`${currencyCodeMapper[amount.currency]}${amount.subtotal}`} /> </StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: OPERATION_LOADING
        };
    }

    async componentDidMount() {
        const transactionId = this.props.match.params.transactionid;
        const response = await getPaymentActivity(transactionId);
        if (response && response.data) {
            await this.setState({
                status: OPERATION_LOADING_COMPLETED,
                data: response.data
            });
        } else if (response && response.message === PAYMENT_ACTIVITY_NOT_FOUND) {
            await this.setState({
                status: OPERATION_LOADING_ERROR,
                data: null
            });
        }
    }

    render() {
        const {
            status,
            data
        } = this.state;
        return (
            <>
                <Header />
                {status === OPERATION_LOADING && <ComponentLoader />}
                {status === OPERATION_LOADING_ERROR && <Component404 />}
                {status === OPERATION_LOADING_COMPLETED &&
                    <Box m={2}>
                        <Container maxWidth="lg">
                            <Card variant="outlined">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Box m={2}> <Typography variant="h6" text="Transaction Details" /> </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item align="left" xs={8}>
                                                <Box m={2}>
                                                    <Typography variant="body1_bold" text={`You paid for order: ${data.order_id}`} />
                                                </Box>
                                                <Box m={2}>
                                                    <Typography variant="body1" text={new Date(data.time_stamp).toString()} />
                                                </Box>
                                            </Grid>
                                            <Grid item align="right" xs={4}>
                                                <Box m={2}>
                                                    <Typography variant="body1" text="Gross amount" />
                                                    <Typography variant="h4" text={`${currencyCodeMapper[data.amount.currency]}${data.amount.subtotal}`} />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item align="left" xs={6}>
                                                <Box m={2}>
                                                    <Typography variant="body1_bold" text="Transaction ID" />
                                                    <Typography variant="body1" text={data.transaction_id} />
                                                </Box>
                                            </Grid>
                                            <Grid item align="left" xs={6}>
                                                <Box m={2}>
                                                    <Typography variant="body1_bold" text="Payment Status" />
                                                    <Typography variant="body1" text={data.status} />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {
                                        data && data.personal_information &&
                                        <Grid item xs={12}>
                                            <Box style={{ backgroundColor: '#f5f7fa', color: '#000', padding: '0.5em' }} m={0}>
                                                <Box m={1}>
                                                    <Typography variant="body1_bold" text="Personal Information" />
                                                </Box>
                                            </Box>
                                            <Box m={2}>
                                                <Grid container>
                                                    <Grid item xs={6}>
                                                        <Typography variant="body1_bold" text="Email" />
                                                        <Typography variant="body1" text={data.personal_information.email} />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="body1_bold" text="Phone Number" />
                                                        <Typography variant="body1" text={data.personal_information.phone_number} />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                    }
                                    <Grid item xs={12}>
                                        <Grid container>
                                            {
                                                data && data.billing_address &&
                                                <Grid item xs={6}>
                                                    <Box m={2}>
                                                        <Typography variant="body1_bold" text="Billing address" />
                                                    </Box>
                                                    <Box m={2}>
                                                        <ViewAddress {...data.billing_address} />
                                                    </Box>
                                                </Grid>
                                            }
                                            {
                                                data && data.shipping_address &&
                                                <Grid item xs={6}>
                                                    <Box m={2}>
                                                        <Typography variant="body1_bold" text="OK to ship to" />
                                                    </Box>
                                                    <Box m={2}>
                                                        <ViewAddress {...data.shipping_address} forceShow={true} />
                                                    </Box>
                                                </Grid>
                                            }
                                        </Grid>
                                    </Grid>
                                    {
                                        data && data.amount &&
                                        <>
                                            <Grid item xs={12}>
                                                <Box m={0}>
                                                    <PurchaseItems purchaseItems={data.purchase_items} amount={data.amount} />
                                                </Box>
                                            </Grid>
                                        </>
                                    }
                                    {
                                        data && data.payment_information &&
                                        <Grid item xs={12}>
                                            <Box style={{ backgroundColor: '#f5f7fa', color: '#000', padding: '0.5em' }} m={0}>
                                                <Box m={1}>
                                                    <Typography variant="body1_bold" text="Payment details" />
                                                </Box>
                                            </Box>
                                            <Box m={2}>
                                                <Grid container>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body1_bold" text="Mode" />
                                                        <Typography variant="body1" text={data.payment_information.processor} />
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body1_bold" text="Processor Transaction ID" />
                                                        <Typography variant="body1" text={data.payment_information.transaction_id} />
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body1_bold" text="Processor Order ID" />
                                                        <Typography variant="body1" text={data.payment_information.processor_order_id} />
                                                    </Grid>
                                                </Grid>
                                            </Box>
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