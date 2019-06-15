import React from 'react';
import { connect } from 'react-redux';
import {    FetchUsers, AddUser, CurrentUserFieldChange,
            UpdateUser, CloseSnackbar,
            OpenSnackbar } from '../../actions/UserActions';            
import Grid from '@material-ui/core/Grid';
import SnackbarComponent from '../../components/lib/SnackbarComponent';
import { Button, Card, CardHeader } from '@material-ui/core';
import LoadingComponent from '../../components/lib/LoadingComponent';
import UsersList from './UsersList';

class UserContainer extends React.Component {
    
    componentDidMount = () => {
        this.reload();
    }

    componentWillReceiveProps = (newprops, oldprops) => {
        if(newprops.success_message !== '' && newprops.success_message !== undefined) {
            // this.props.OpenSnackbar();
        }
    }

    reload = () => {
        this.props.FetchUsers();
    }

    onAddUser = (model) => {
        this.props.AddUser(model, this.props.editMode)
    }

    render = () => {
        let { current_user, users } = this.props;
        console.log('User container: render');
        console.log(current_user);

        return(
            <Grid container spacing={16}>
                <Grid item xs={12} sm={12}>
                {!current_user && <LoadingComponent />}
                {current_user &&
                <Card>
                    <CardHeader 
                    title="Users"
                    />
                    <UsersList 
                        users={users} 
                        onFieldChange={ (val, field, model) => this.props.CurrentUserFieldChange(val, field, model) } 
                        onUpdateUser={ (model) => this.props.UpdateUser(model) }
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
    ...state.userReducer
});
const mapDispatchToProps = dispatch => ({
    // AddTest: (model, editMode) => dispatch(AddTest(model, editMode)),
    UpdateUser: (model) => dispatch(UpdateUser(model)),
    // FetchSkills: () => dispatch(FetchSkills()),
    AddUser: (userModel) => dispatch(AddUser(userModel)),
    FetchUsers: () => dispatch(FetchUsers()),
    CloseSnackbar: () => dispatch(CloseSnackbar()),
    OpenSnackbar: () => dispatch(OpenSnackbar()),
    CurrentUserFieldChange: (val, field, model) => dispatch(CurrentUserFieldChange(val, field, model))
});
export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);