import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { PersonAdd } from '@material-ui/icons';
import LoadingComponent from '../lib/LoadingComponent';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const TestList = (props) => {
    let { tests } = props;
    return (
        <div>
        {!tests && <LoadingComponent /> }
        {tests && tests.length === 0 && <Typography align="center" variant="subtitle1">No Tests Found </Typography> }
        {tests && tests.length > 0 && 
        <Table>
            <TableHead>
            <TableRow>
                <CustomTableCell>Test</CustomTableCell>
                <CustomTableCell align="left">Status</CustomTableCell>
                <CustomTableCell align="right">Not Attempted</CustomTableCell>
                <CustomTableCell align="right">Completed</CustomTableCell>
                <CustomTableCell align="right">To Evaluate</CustomTableCell>
                <CustomTableCell align="right"></CustomTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {tests.map((test, index) => (
                <TableRow key={index}>
                <CustomTableCell component="th" scope="row">
                    <Link to={ {pathname: "/testConsole", state: { testId: test.$loki } }}>
                        {test.testName}
                    </Link>
                </CustomTableCell>
                <CustomTableCell align="left"><Typography variant="subtitle2" >{test.status.toUpperCase()}</Typography></CustomTableCell>
                <CustomTableCell align="right">{test.pendingAttempt}</CustomTableCell>
                <CustomTableCell align="right">{test.completed}</CustomTableCell>
                <CustomTableCell align="right">{test.toEvaluate}</CustomTableCell>
                <CustomTableCell align="right" scope="row" component="th">
                    <Link to={ {pathname: "/inviteConsole", state: { testId: test.$loki } }}>
                        <PersonAdd />
                    </Link>
                </CustomTableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        }
        </div>
    );
}
const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);
export default TestList;