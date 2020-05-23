import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import SnackbarComponent from '../../components/lib/SnackbarComponent';
import { Button, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import LoadingComponent from '../../components/lib/LoadingComponent';
import SendTestInvite from './SendTestInvite';
import { KeyboardBackspace } from '@material-ui/icons';

import { SendInvite, InviteInfoFieldChange } from '../../actions/InviteConsoleActions';            
import { FetchTest, CloseSnackbar, OpenSnackbar } from '../../actions/TestConsoleActions';            

class InviteContainer extends React.Component {

    componentDidMount = () => {
        this.reload();
    }

    reload = () => {
        let { state } = this.props.location;
        console.log('reload: location state');
        console.log(state);
        if(state){
            if(state.testId){
                this.props.FetchTest(state.testId);
            }
        }
    }
    
    onSendInvite = () => {
        let { current_test, inviteInfo } = this.props;
        console.log('after send invite current_test', current_test);
        this.props.SendInvite(current_test, inviteInfo).then((res) => {
            this.props.history.push({
                pathname: '/testConsole', state: { testId: current_test.id }
            });
        });
    }

    render = () => {
        let { current_test, inviteInfo, inviteAdded } = this.props;
        console.log('invite console current_test', current_test);
        return (
            <Grid container spacing={16}>
                <Grid item xs={12} sm={12} md={8}>
                {!current_test && <LoadingComponent />}
                {current_test && current_test.test_meta &&
                <Card>
                    <CardHeader 
                        action={
                        <Button color="primary" size="large" variant="outlined"
                                onClick={() => this.props.history.goBack() }>
                            <KeyboardBackspace />
                        </Button>
                        }
                        title="Send Test Invites"
                        subheader={current_test.test_meta.testName}
                    />
                    <CardContent>
                        <SendTestInvite
                            // onSendInvite={(testInfo, inviteInfo) => this.onSendInvite(testInfo, inviteInfo) }
                            selectedMcqs={current_test.test_meta.selectedMcqs} 
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
    SendInvite: (inviteInfo, testModel) => dispatch(SendInvite(inviteInfo, testModel)),
    FetchTest: (testId) => dispatch(FetchTest(testId)),
    CloseSnackbar: () => dispatch(CloseSnackbar()),
    OpenSnackbar: () => dispatch(OpenSnackbar()),
    InviteInfoFieldChange: (val, field, inviteInfo) => dispatch(InviteInfoFieldChange(val, field, inviteInfo))
});
export default connect(mapStateToProps, mapDispatchToProps)(InviteContainer);
const styles = {
    actionButton: {
        marginLeft: '80%'
    }
}