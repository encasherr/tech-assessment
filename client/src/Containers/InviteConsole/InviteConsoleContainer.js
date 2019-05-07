import React from 'react';
import { connect } from 'react-redux';
// import AddTestComponent from '../components/AdminTest/AddTest';
import {    FetchTest, AddMcqToTest, PublishTest, CloseSnackbar,
            OpenSnackbar } from '../../actions/TestConsoleActions';            
import {    SendInvite } from '../../actions/InviteConsoleActions';            
import Grid from '@material-ui/core/Grid';
import SnackbarComponent from '../../components/lib/SnackbarComponent';
// import TestConsoleTabs from './TestConsoleTabs';
import { Button, Card, CardHeader } from '@material-ui/core';
// import TestConsoleQuestions from './TestConsoleQuestions';
import LoadingComponent from '../../components/lib/LoadingComponent';
import SendTestInvite from './SendTestInvite';

class InviteConsoleContainer extends React.Component {
    
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
        if(state){
            this.props.FetchTest(state.testId);
        }
    }

    onSendInvite = (testInfo, inviteInfo) => {
        this.props.SendInvite(testInfo, inviteInfo);
    }

    render = () => {
        let { current_test } = this.props;
        console.log('invite container: render');
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
                    <CardHeader 
                        title="Send Test Invites"
                        subheader={current_test.testName}
                    />
                    <SendTestInvite
                        onSendInvite={(testInfo, inviteInfo) => this.onSendInvite(testInfo, inviteInfo) }
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
    ...state.inviteConsoleReducer
});
const mapDispatchToProps = dispatch => ({
    // AddTest: (model, editMode) => dispatch(AddTest(model, editMode)),
    // UpdateTest: (model) => dispatch(UpdateTest(model)),
    // FetchSkills: () => dispatch(FetchSkills()),
    SendInvite: (inviteInfo, testModel) => dispatch(SendInvite(inviteInfo, testModel)),
    // PublishTest: (testModel) => dispatch(PublishTest(testModel)),
    FetchTest: (testId) => dispatch(FetchTest(testId)),
    CloseSnackbar: () => dispatch(CloseSnackbar()),
    OpenSnackbar: () => dispatch(OpenSnackbar()),
    // CurrentInviteFieldChange: (val, field, model) => dispatch(CurrentInviteFieldChange(val, field, model))
});
export default connect(mapStateToProps, mapDispatchToProps)(InviteConsoleContainer);