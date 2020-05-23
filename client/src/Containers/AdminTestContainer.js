import React from 'react';
import { connect } from 'react-redux';
import AddTestComponent from '../components/AdminTest/AddTest';
import {    AddTest, UpdateTest, FetchSkills, FetchTests,  
            CloseSnackbar, CurrentTestFieldChange,
            OpenSnackbar } from '../actions/AdminTestActions';
import Grid from '@material-ui/core/Grid';
import SnackbarComponent from '../components/lib/SnackbarComponent';
import { Button, Card, CardHeader } from '@material-ui/core';
import TestList from '../components/AdminTest/TestList';

class AdminTestContainer extends React.Component {
    
    componentDidMount = () => {
        this.reload();
    }



    reload = () => {
        this.props.FetchSkills();
        this.props.FetchTests();
    }

    onAddTest = (model) => {
        this.props.AddTest(model, this.props.editMode, this.props.history)
                .then((res) => {
                    this.reload();  
                });
    }

    render = () => {
        console.log('render admin test container');
        return(
            <Grid container spacing={16}>
                <Grid item xs={12} sm={12}>
                <Card>
                    <CardHeader action={
                    <AddTestComponent 
                        onSubmit={ (model) => this.onAddTest(model) }
                        model={this.props.current_test}
                        skills={this.props.skills}
                        editMode={this.props.editMode}
                        onFieldChange={ (val, field, model) => this.props.CurrentTestFieldChange(val, field, model) } 
                        />
                    }
                    title="Tests" />
                <TestList tests={this.props.tests} />
                </Card>
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
    ...state.adminTestReducer
});
const mapDispatchToProps = dispatch => ({
    AddTest: (model, editMode) => dispatch(AddTest(model, editMode)),
    UpdateTest: (model) => dispatch(UpdateTest(model)),
    FetchSkills: () => dispatch(FetchSkills()),
    FetchTests: () => dispatch(FetchTests()),
    CloseSnackbar: () => dispatch(CloseSnackbar()),
    OpenSnackbar: () => dispatch(OpenSnackbar()),
    CurrentTestFieldChange: (val, field, model) => dispatch(CurrentTestFieldChange(val, field, model))
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminTestContainer);