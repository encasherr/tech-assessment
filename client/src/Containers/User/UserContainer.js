import React from 'react';
import { connect } from 'react-redux';
import {    FetchUsers, AddUser, CurrentUserFieldChange,
            UpdateUser, DeleteUser, CloseSnackbar,
            OpenSnackbar } from '../../actions/UserActions';            
import { FetchOrgs } from '../../actions/OrgActions';            
import Grid from '@material-ui/core/Grid';
import SnackbarComponent from '../../components/lib/SnackbarComponent';
import { Button, Card, CardHeader } from '@material-ui/core';
import LoadingComponent from '../../components/lib/LoadingComponent';
import UsersList from './UsersList';
import AddUserComponent from './AddUser';
import User401 from './User401';
import config from '../../config';

class UserContainer extends React.Component {
    
    componentDidMount = () => {
        this.reload();
    }


    reload = () => {
        this.props.FetchUsers();
        this.props.FetchOrgs();
    }

    onAddUser = (model) => {
        this.props.AddUser(model)
                .then((res) => {
                    this.reload();
                });
    }

    onDeleteUser = (model) => {
        this.props.DeleteUser(model)
                .then((res) => {
                    this.reload();
                });
    }

    onUpdateUser = (model) => {
        this.props.UpdateUser(model)
            .then((res) => {
                this.reload();
            });   
    }

    render = () => {
        let { current_user, users, orgList, error } = this.props;
        let user_roles = config.instance.getValue('user_roles');
        let UserRoles = user_roles.split(',');

        if(error) {
            return(
                <User401 />
            )
        }

        return(
            <Grid container spacing={16}>
                <Grid item xs={12} sm={12}>
                {!current_user && <LoadingComponent />}
                {current_user &&
                <Card>
                    <CardHeader action={
                        <div>
                    <AddUserComponent 
                        onSubmit={ (model) => this.onAddUser(model) }
                        model={this.props.current_user}
                        orgs={orgList}
                        UserRoles={UserRoles}
                        onFieldChange={ (val, field, model) => this.props.CurrentUserFieldChange(val, field, model) } 
                        />
                           </div>
                    }
                    title="Users"
                    />
                    <UsersList 
                        users={users} 
                        orgs={orgList}
                        UserRoles={UserRoles}
                        onFieldChange={ (val, field, model) => this.props.CurrentUserFieldChange(val, field, model) } 
                        onUpdateUser={ (model) => this.onUpdateUser(model) }
                        onDeleteUser={ (model) => this.onDeleteUser(model) }
                    />
                </Card>
                }
                <SnackbarComponent 
                    openSnack={this.props.snack_open} handleClose={() => this.props.CloseSnackbar()} 
                    snackMessage={"Data Saved Successfully!"} 
                    /> 
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = state => ({
    ...state.userReducer,
    ...state.orgReducer
});
const mapDispatchToProps = dispatch => ({
    UpdateUser: (model) => dispatch(UpdateUser(model)),
    DeleteUser: (model) => dispatch(DeleteUser(model)),
    AddUser: (userModel) => dispatch(AddUser(userModel)),
    FetchUsers: () => dispatch(FetchUsers()),
    FetchOrgs: () => dispatch(FetchOrgs()),
    CloseSnackbar: () => dispatch(CloseSnackbar()),
    OpenSnackbar: () => dispatch(OpenSnackbar()),
    CurrentUserFieldChange: (val, field, model) => dispatch(CurrentUserFieldChange(val, field, model))
});
export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);