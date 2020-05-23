import React from 'react';
import { connect } from 'react-redux';
import {    FetchTest, AddMcqToTest, PublishTest, CloseSnackbar, SetHistory,
    RemoveMcqFromTest, LoadTestMcqs, LoadTestCandidates, OpenSnackbar } from '../../actions/TestConsoleActions';            
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import SnackbarComponent from '../../components/lib/SnackbarComponent';
import TestConsoleTabs from './TestConsoleTabs';
import { Button, Card, CardHeader } from '@material-ui/core';
import TestConsoleQuestions from './TestConsoleQuestions';
import LoadingComponent from '../../components/lib/LoadingComponent';
import { KeyboardBackspace } from '@material-ui/icons';

class TestConsoleContainer extends React.Component {
    
    componentDidMount = () => {
        this.props.SetHistory(this.props.history);
        this.reload();
    }

    componentWillReceiveProps = (newprops, oldprops) => {
        if(newprops.success_message !== '' && newprops.success_message !== undefined) {
        }
    }

    reload = () => {
        let { state } = this.props.location;
        if(state){
            this.props.FetchTest(state.testId, this.props.history);
            this.props.LoadTestMcqs(state.testId);
            this.props.LoadTestCandidates(state.testId);
        }
    }

    onAddTest = (model) => {
        this.props.AddTest(model, this.props.editMode)
    }

    onAddMcqToTest = (mcqItem) => {
        let { current_test } = this.props;
        this.props.AddMcqToTest(mcqItem, this.props.current_test)
                .then((res) => {
                    this.props.LoadTestMcqs(current_test.id);  
                });
    }
    
    onRemoveMcqFromTest = (mcqItem) => {
        this.props.RemoveMcqFromTest(mcqItem, this.props.current_test);
    }

    onPublish = () => {
        this.props.PublishTest(this.props.current_test);
        this.reload();
    }

    render = () => {
        let { current_test, selectedMcqs, candidates } = this.props;
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
                        <div>
                        {current_test.test_meta.status === 'draft' && 
                        current_test.test_meta.selectedMcqs && 
                        current_test.test_meta.selectedMcqs.length > 0 &&
                        <Button style={styles.headerButton} variant="contained" color="primary" size="small"
                                onClick={this.onPublish}
                        >Publish</Button>}
                        <Link style={styles.headerButton} href="#" onClick={() => this.props.history.goBack()}>
                            Back To Tests
                        </Link>
                        </div>
                    }
                    title={current_test.test_meta.testName}
                     subheader={current_test.test_meta.status!=='draft' ? 'Published' : 'draft'}
                    />
                    <TestConsoleTabs 
                        tabs={tabs} 
                        onAddMcqToTest={(mcqItem) => this.onAddMcqToTest(mcqItem) }
                        onRemoveMcqFromTest={ (mcqItem) => this.onRemoveMcqFromTest(mcqItem) } 
                        selectedMcqs={selectedMcqs} 
                        candidates={candidates}
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
    SetHistory: (history) => dispatch(SetHistory(history)),
    AddMcqToTest: (mcqItem, testModel) => dispatch(AddMcqToTest(mcqItem, testModel)),
    RemoveMcqFromTest: (mcqItem, testModel) => dispatch(RemoveMcqFromTest(mcqItem, testModel)),
    PublishTest: (testModel) => dispatch(PublishTest(testModel)),
    FetchTest: (testId, history) => dispatch(FetchTest(testId, history)),
    LoadTestMcqs: (testId) => dispatch(LoadTestMcqs(testId)),
    LoadTestCandidates: (testId) => dispatch(LoadTestCandidates(testId)),
    CloseSnackbar: () => dispatch(CloseSnackbar()),
    OpenSnackbar: () => dispatch(OpenSnackbar()),
});
const tabs = [
    {key: 0, content: '<Button variant="container" color="primary">Page {index}</Button>'},
    {key: 1, content: <TestConsoleQuestions /> },
    {key: 2, content: getButton}
]
const getButton = (index) => {
    return 'abc'+index;
}
export default connect(mapStateToProps, mapDispatchToProps)(TestConsoleContainer);
const styles = {
    headerButton: {
        marginLeft: '10px'
    }
}