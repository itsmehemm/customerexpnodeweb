import React from 'react';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '../../common/elements/Typography';

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

const getRowClassName = (status) => {
    status = parseInt(status);
    if (status === 1) {
        return 't-cal-row-info';
    }
    if (status === 2) {
        return 't-cal-row-warn';
    }
    if (status === 3) {
        return 't-cal-row-error';
    }
    return '';
}

const LogTable = ({ logs, columns = {} }) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='customized table'>
                <TableHead>
                    <TableRow>
                        {columns.date && <StyledTableCell align='center'><Typography variant='button' text='Date' /></StyledTableCell>}
                        {columns.component && <StyledTableCell align='center'><Typography variant='button' text='Component' /></StyledTableCell>}
                        {columns.operation && <StyledTableCell align='center'><Typography variant='button' text='Operation' /></StyledTableCell>}
                        {columns.additional_data && <StyledTableCell align='center'><Typography variant='button' text='Additional Data' /></StyledTableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logs.map((row) => (
                        <StyledTableRow key={row.date + row.component}>
                            {columns.date && <StyledTableCell align='center'><Typography variant='body2' text={moment(row.time_stamp).format('DD.MM.YYYY HH:MM:SS')} className={getRowClassName(row.status)} /></StyledTableCell>}
                            {columns.component && <StyledTableCell align='left'><Typography variant='body2' text={row.component} className={getRowClassName(row.status)} /></StyledTableCell>}
                            {columns.operation && <StyledTableCell align='left'><Typography variant='body2' text={row.operation} className={getRowClassName(row.status)} /></StyledTableCell>}
                            {columns.additional_data && <StyledTableCell align='left'><Typography variant='body2' text={row.additional_data} className={getRowClassName(row.status)} /></StyledTableCell>}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LogTable;