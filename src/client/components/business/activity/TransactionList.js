import React from 'react';
import moment from 'moment';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '../../common/elements/Typography';
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

const TransactionList = ({ transactions, columns = {} }) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='customized table'>
                <TableHead>
                    <TableRow>
                        {columns.date && <StyledTableCell align='center'><Typography variant='button' text='Date' /></StyledTableCell>}
                        {columns.transaction_id && <StyledTableCell align='center'><Typography variant='button' text='Transaction ID' /></StyledTableCell>}
                        {columns.order_id && <StyledTableCell align='center'><Typography variant='button' text='Order ID' /></StyledTableCell>}
                        {columns.customer && <StyledTableCell align='center'><Typography variant='button' text='Customer' /></StyledTableCell>}
                        {columns.payment_status && <StyledTableCell align='center'><Typography variant='button' text='Payment Status' /></StyledTableCell>}
                        {columns.gross && <StyledTableCell align='center'><Typography variant='button' text='Gross' /></StyledTableCell>}
                        {columns.actions && <StyledTableCell align='center'><Typography variant='button' text='Actions' /></StyledTableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((row) => (
                        <StyledTableRow key={row.transaction_id}>
                            {columns.date && <StyledTableCell align='center'><Typography variant='body2' text={moment(row.time_stamp).format('MMM D, YYYY / MM:HH:SS')} /></StyledTableCell>}
                            {columns.transaction_id && <StyledTableCell align='center'><Typography variant='body2' text={row.transaction_id} /></StyledTableCell>}
                            {columns.order_id && <StyledTableCell align='center'><Typography variant='body2' text={row.order_id} /></StyledTableCell>}
                            {columns.customer && <StyledTableCell align='left'>
                                {row.billing_address && row.billing_address.name && <Typography variant='body2' text={row.billing_address.name} />}
                                {row.personal_information && row.personal_information.email && <Typography variant='body2' text={row.personal_information.email} />}
                                {row.personal_information && row.personal_information.phone_number && <Typography variant='body2' text={row.personal_information.phone_number} />}
                            </StyledTableCell>}
                            {columns.payment_status && <StyledTableCell align='center'><Typography variant='body2' text={row.status} /></StyledTableCell>}
                            {columns.gross && row.amount && <StyledTableCell align='center'><Typography variant='body2' text={`${currencyCodeMapper[row.amount.currency]}${row.amount.subtotal}`} /></StyledTableCell>}
                            {columns.actions && <StyledTableCell align='center'><Button onClick={() => window.open(`/business/activity/transaction/${row.transaction_id}`)}>View</Button></StyledTableCell>}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TransactionList;