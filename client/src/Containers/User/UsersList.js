import React, { Fragment, Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Delete, Edit, Save, Undo } from '@material-ui/icons';
import LoadingComponent from '../../components/lib/LoadingComponent';
import { Button, Typography, IconButton } from '@material-ui/core';
import EditUser from './EditUser';
import { MenuItem, OutlinedInput, Select, InputLabel } from '@material-ui/core';


import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
const styles = {
    formControl: {
        width: '80%',
        marginBottom: '4%'
    },
    avatar: {
        backgroundColor: '#555'
    }
};

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEditIndex: -1
        };
    }

    handleEditClick = (editIndex) => {
        this.setState({
            userEditIndex: editIndex
        })
    }

    onUpdateUser = (user) => {
        this.props.onUpdateUser(user);
        this.setState({
            userEditIndex: -1
        });
    }

    render = () => {
        let { users, orgs, UserRoles } = this.props;
        let { userEditIndex } = this.state;

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
                    <CustomTableCell>Org</CustomTableCell>
                    <CustomTableCell></CustomTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {users.map((user, index) => (
                    <Fragment key={index}>
                    {index === userEditIndex && 
                    <TableRow>
                        <CustomTableCell align="left">
                            <Typography variant="subtitle2" >
                                {user.user_meta ? user.user_meta.emailId : ''}
                            </Typography>
                        </CustomTableCell>
                        <CustomTableCell align="left">
                            <FormControl variant="outlined" style={styles.formControl}>
                                    <TextField
                                        id="outlined-name"
                                        label="Full Name"
                                        className={styles.dense}
                                        value={user.user_meta.name}
                                        onChange={(e) => this.this.props.onFieldChange(e.target.value, 'name', user)}
                                        margin="normal"
                                        variant="outlined"
                                    />
                            </FormControl>
                        </CustomTableCell>
                        <CustomTableCell align="left">
                            <EditUser 
                                model={user} 
                                UserRoles={UserRoles}
                                onFieldChange={ (val, field, model) => this.props.onFieldChange(val, field, model) } 
                            />
                        </CustomTableCell>
                        <CustomTableCell align="left">
                                <FormControl variant="standard" style={styles.formControl}>
                                   <Select
                                        onChange={(e) => this.props.onFieldChange(e.target.value, 'orgId', user)}
                                        value={user.user_meta.orgId ? user.user_meta.orgId : -1}
                                        >
                                        <MenuItem value="">
                                        <em>None</em>
                                        </MenuItem>
                                        {orgs && orgs.length > 0 &&
                                            orgs.map((item, index) => {
                                                console.log('org item', item);
                                            return (
                                                <MenuItem key={index} value={item.id}>{item.org_meta.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                        </CustomTableCell>
                        <CustomTableCell>
                            <IconButton 
                                onClick={() => this.onUpdateUser(user)}
                                edge="end"
                                color="primary"
                                >
                                <Save />
                            </IconButton>
                            <IconButton 
                                // onClick={() => this.props.onUpdateUser(user)}
                                edge="end"
                                color="secondary"
                                >
                                <Undo />
                            </IconButton>

                        </CustomTableCell>
                    </TableRow>
                    }
                    {index !== userEditIndex &&
                    <TableRow>
                        <CustomTableCell align="left">
                            <Typography variant="subtitle2" >
                                {user.user_meta ? user.user_meta.emailId : ''}
                            </Typography>
                        </CustomTableCell>
                        <CustomTableCell align="left">
                            <Typography variant="subtitle2" >
                                {user.user_meta ? user.user_meta.name : ''}
                            </Typography>
                        </CustomTableCell>
                        <CustomTableCell align="left">
                            {user.user_meta ? (user.user_meta.role ? user.user_meta.role.toUpperCase() : '') : ''}
                        </CustomTableCell>
                        <CustomTableCell align="left">
                            {user.org_meta ? (user.org_meta.name ? user.org_meta.name : '') : ''}
                        </CustomTableCell>
                        <CustomTableCell>
                            <IconButton 
                                onClick={() => this.props.onDeleteUser(user)}
                                edge="end"
                                color="inherit"
                                >
                                <Delete />
                            </IconButton>
                            <IconButton 
                                onClick={() => this.handleEditClick(index)}
                                edge="end"
                                color="primary"
                                >
                                <Edit />
                            </IconButton>
                        </CustomTableCell>
                    </TableRow>
                    }
                    </Fragment>
                ))}
                </TableBody>
            </Table>
            }
            </div>
        );
    }
}
const CustomTableCell = withStyles(theme => ({
    head: {
    //   backgroundColor: theme.palette.common.black,
      color: theme.palette.common.black,
      fontSize: 18
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);
export default UsersList;