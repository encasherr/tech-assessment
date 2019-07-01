import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {    FetchTest, AddMcqToTest, PublishTest, CloseSnackbar,
            OpenSnackbar } from '../../actions/TestConsoleActions';            
import {    SendInvite,
            InviteInfoFieldChange } from '../../actions/InviteConsoleActions';            
import Grid from '@material-ui/core/Grid';
import SnackbarComponent from '../../components/lib/SnackbarComponent';
import { Button, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import LoadingComponent from '../../components/lib/LoadingComponent';
import SendTestInvite from './SendTestInvite';
import { KeyboardBackspace } from '@material-ui/icons';

class InviteConsoleContainer extends React.Component {
    
    componentDidMount = () => {
        this.reload();
    }

    componentWillReceiveProps = (newprops, oldprops) => {
        if(newprops.success_message !== '' && newprops.success_message !== undefined) {
            // this.props.OpenSnackbar();
        }
        if(newprops.inviteAdded === 'yes') {
            this.props.history.push({
                pathname:  '/tests'
            });
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

    onSendInvite = () => {
        let { current_test, inviteInfo } = this.props;
        this.props.SendInvite(current_test, inviteInfo);
    }

    render = () => {
        let { current_test, inviteInfo, inviteAdded } = this.props;
        console.log('invite container: render');
        console.log(current_test);
        if(current_test && current_test.selectedMcqs) {
            console.log(current_test.selectedMcqs);
        }
        return(
            <Grid container spacing={16}>
                <Grid item xs={12} sm={12} md={8}>
                {!current_test && <LoadingComponent />}
                {current_test &&
                <Card>
                    <CardHeader 
                        action={
                        <Button color="primary" size="large" variant="outlined"
                                onClick={() => this.props.history.goBack() }>
                            <KeyboardBackspace />
                        </Button>
                        }
                        title="Send Test Invites"
                        subheader={current_test.testName}
                    />
                    <CardContent>
                        <SendTestInvite
                            // onSendInvite={(testInfo, inviteInfo) => this.onSendInvite(testInfo, inviteInfo) }
                            selectedMcqs={current_test.selectedMcqs} 
                            currentTest={current_test}
                            inviteInfo={inviteInfo}
                            onFieldChange={(val, field) => this.props.InviteInfoFieldChange(val, field, inviteInfo)}
                        />
                    </CardContent>
                    <CardActions style={styles.actionButton}>
                        <Button variant="contained" size="large" color="primary"
                                onClick={() => this.onSendInvite() }>
                            Send Invite
                        </Button>
                    </CardActions>
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
    InviteInfoFieldChange: (val, field, inviteInfo) => dispatch(InviteInfoFieldChange(val, field, inviteInfo))
});
export default connect(mapStateToProps, mapDispatchToProps)(InviteConsoleContainer);
const styles = {
    actionButton: {
        marginLeft: '80%'
    }
}