import React from 'react';
import { connect } from 'react-redux';
// import AddTestComponent from '../components/AdminTest/AddTest';
import {    FetchTest,  
            CloseSnackbar,
            OpenSnackbar } from '../../actions/AdminTestActions';
import Grid from '@material-ui/core/Grid';
import SnackbarComponent from '../../components/lib/SnackbarComponent';
import TabControl from '../../components/lib/TabControl';
import { Button, Card, CardHeader } from '@material-ui/core';
import TestConsoleQuestions from './TestConsoleQuestions';

class TestConsoleContainer extends React.Component {
    
    componentDidMount = () => {
        this.reload();
    }

    componentWillReceiveProps = (newprops, oldprops) => {
        if(newprops.success_message !== '' && newprops.success_message !== undefined) {
            // this.props.OpenSnackbar();
        }
    }

    reload = () => {
        // this.props.FetchSkills();
        let { state } = this.props.location;
        console.log('reload: location state');
        console.log(state);
        this.props.FetchTest(state.testId);
    }

    onAddTest = (model) => {
        this.props.AddTest(model, this.props.editMode)
    }

    render = () => {
        let { current_test } = this.props;
        return(
            <Grid container spacing={16}>
                <Grid item xs={12} sm={12}>
                <Card>
                    <CardHeader action={
                        <Button variant="contained" color="primary">Publish</Button>
                    }
                    title={current_test ? current_test.testName : ''} 
                    />
                    <TabControl tabs={tabs} />
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
    ...state.testConsoleReducer
});
const mapDispatchToProps = dispatch => ({
    // AddTest: (model, editMode) => dispatch(AddTest(model, editMode)),
    // UpdateTest: (model) => dispatch(UpdateTest(model)),
    // FetchSkills: () => dispatch(FetchSkills()),
    FetchTest: (testId) => dispatch(FetchTest(testId)),
    CloseSnackbar: () => dispatch(CloseSnackbar()),
    OpenSnackbar: () => dispatch(OpenSnackbar()),
    // CurrentTestFieldChange: (val, field, model) => dispatch(CurrentTestFieldChange(val, field, model))
});
const tabs = [
    {key: 0, content: '<Button variant="container" color="primary">Page {index}</Button>'},
    {key: 1, content: <TestConsoleQuestions /> },
    {key: 2, content: getButton}
]
const getButton = (index) => {
    return 'abc'+index;
    // (
        // <Button variant="container" color="primary">Page {index}</Button>
    // );
}
export default connect(mapStateToProps, mapDispatchToProps)(TestConsoleContainer);