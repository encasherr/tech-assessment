import React from 'react';
import { connect } from 'react-redux';
// import AddTestComponent from '../components/AdminTest/AddTest';
import {    FetchTest, AddMcqToTest, PublishTest, CloseSnackbar, SetHistory,
            OpenSnackbar } from '../../actions/TestConsoleActions';            
import Grid from '@material-ui/core/Grid';
import SnackbarComponent from '../../components/lib/SnackbarComponent';
import TestConsoleTabs from './TestConsoleTabs';
import { Button, Card, CardHeader } from '@material-ui/core';
import TestConsoleQuestions from './TestConsoleQuestions';
import LoadingComponent from '../../components/lib/LoadingComponent';

class TestConsoleContainer extends React.Component {
    
    componentWillMount = () => {
    }

    componentDidMount = () => {
        console.log('this.props.history', this.props.history);
        this.props.SetHistory(this.props.history);
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
        if(state){
            this.props.FetchTest(state.testId, this.props.history);
        }
    }

    onAddTest = (model) => {
        this.props.AddTest(model, this.props.editMode)
    }

    onAddMcqToTest = (mcqItem) => {
        console.log('container: mcq added to test');
        this.props.AddMcqToTest(mcqItem, this.props.current_test);
    }

    onPublish = () => {
        this.props.PublishTest(this.props.current_test);
    }

    render = () => {
        let { current_test } = this.props;
        console.log('container: render');
        console.log(current_test);
        if(current_test && current_test.selectedMcqs) {
            console.log(current_test.selectedMcqs);
        }
        return(
            <Grid container spacing={16}>
                <Grid item xs={12} sm={12}>
                {!current_test && <LoadingComponent />}
                {current_test &&
                <Card>
                    <CardHeader action={
                        current_test.status=='draft' &&
                        <Button variant="contained" color="primary"
                                onClick={this.onPublish}
                        >Publish</Button>
                        
                    }
                    title={current_test.testName}
                     subheader={current_test.status!=='draft' ? 'Published' : 'draft'}
                    />
                    <TestConsoleTabs 
                        tabs={tabs} 
                        onAddMcqToTest={(mcqId) => this.onAddMcqToTest(mcqId) }
                        selectedMcqs={current_test.selectedMcqs} 
                        currentTest={current_test}
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
    ...state.testConsoleReducer
});
const mapDispatchToProps = dispatch => ({
    // AddTest: (model, editMode) => dispatch(AddTest(model, editMode)),
    // UpdateTest: (model) => dispatch(UpdateTest(model)),
    SetHistory: (history) => dispatch(SetHistory(history)),
    AddMcqToTest: (mcqItem, testModel) => dispatch(AddMcqToTest(mcqItem, testModel)),
    PublishTest: (testModel) => dispatch(PublishTest(testModel)),
    FetchTest: (testId, history) => dispatch(FetchTest(testId, history)),
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