import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { PersonAdd, Delete } from '@material-ui/icons';
import LoadingComponent from '../../components/lib/LoadingComponent';
import { Typography, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import EditUser from './EditUser';

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
                <CustomTableCell align="left">Role</CustomTableCell>
                <CustomTableCell>Edit Role</CustomTableCell>
                <CustomTableCell></CustomTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {users.map((user, index) => (
                <Fragment key={index}>
                <TableRow >
                    <CustomTableCell align="left"><Typography variant="subtitle2" >{user.emailId}</Typography></CustomTableCell>
                    <CustomTableCell align="left"><Typography variant="subtitle2" >{user.name}</Typography></CustomTableCell>
                    <CustomTableCell align="left">{user.role.toUpperCase()}</CustomTableCell>
                    {/* <CustomTableCell align="right">Edit</CustomTableCell> */}
                    <CustomTableCell align="left">
                        <EditUser 
                            model={user} 
                            onFieldChange={ (val, field, model) => props.onFieldChange(val, field, model) } 
                            onUpdateUser={ (model) => props.onUpdateUser(model) }
                        />
                    </CustomTableCell>
                    <CustomTableCell>
                        <IconButton 
                            onClick={() => props.onDeleteUser(user)}
                            edge="end"
                            color="inherit"
                            >
                            <Delete />
                        </IconButton>
                    </CustomTableCell>
                </TableRow>
                </Fragment>
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