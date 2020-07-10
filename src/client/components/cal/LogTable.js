import React from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '../common/elements/Typography';
import { currencyCodeMapper } from '../../lib/mappers';

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

const LogTable = ({ logs, columns = {} }) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {columns.date && <StyledTableCell align="center"><Typography variant="body1_bold" text="Date" /></StyledTableCell>}
                        {columns.component && <StyledTableCell align="center"><Typography variant="body1_bold" text="Component" /></StyledTableCell>}
                        {columns.operation && <StyledTableCell align="center"><Typography variant="body1_bold" text="Operation" /></StyledTableCell>}
                        {columns.additional_data && <StyledTableCell align="center"><Typography variant="body1_bold" text="Additional Data" /></StyledTableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logs.map((row) => (
                        <StyledTableRow key={row.date + row.component}>
                            {columns.date && <StyledTableCell align="center"><Typography variant="body2" text={moment(row.time_stamp).format("DD.MM.YYYY HH:MM:SS")} /></StyledTableCell>}
                            {columns.component && <StyledTableCell align="left"><Typography variant="body2" text={row.component} /></StyledTableCell>}
                            {columns.operation && <StyledTableCell align="left"><Typography variant="body2" text={row.operation} /></StyledTableCell>}
                            {columns.additional_data && <StyledTableCell align="left"><Typography variant="body2" text={row.additional_data} /></StyledTableCell>}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LogTable;