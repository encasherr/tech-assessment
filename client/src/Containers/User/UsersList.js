import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { PersonAdd } from '@material-ui/icons';
import LoadingComponent from '../../components/lib/LoadingComponent';
import { Typography, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

const UsersList = (props) => {
    let { users } = props;
    return (
        <div>
        {!users && <LoadingComponent /> }
        {users && users.length === 0 && <Typography align="center" variant="subtitle1">No Tests Found </Typography> }
        {users && users.length > 0 && 
        <Table>
            <TableHead>
            <TableRow>
                <CustomTableCell>Email</CustomTableCell>
                <CustomTableCell align="left">Display Name</CustomTableCell>
                <CustomTableCell align="right">Role</CustomTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {users.map((user, index) => (
                <TableRow key={index}>
                    <CustomTableCell component="th" scope="row">
                        <Link to={ {pathname: "/editUser", state: { userId: user.$loki } }}>
                            {user.emailId}
                        </Link>
                    </CustomTableCell>
                    <CustomTableCell align="left"><Typography variant="subtitle2" >{user.displayName}</Typography></CustomTableCell>
                    <CustomTableCell align="right">{user.role.toUpperCase()}</CustomTableCell>
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
export default UsersList;