import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {    CloseSnackbar,
            OpenSnackbar } from '../../actions/TestConsoleActions';            
import { FetchInvitations, EvaluateResults } from '../../actions/InviteConsoleActions';            
import Grid from '@material-ui/core/Grid';
import SnackbarComponent from '../../components/lib/SnackbarComponent';
import { Button, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import LoadingComponent from '../../components/lib/LoadingComponent';
import InviteList from './InviteList';
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
        this.props.FetchInvitations();
    }

    render = () => {
        return(
            <Grid container spacing={16}>
                <Grid item xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader
                            title={`Invitations (${this.props.invitations ? this.props.invitations.length : 'loading..'})`} />
                        <CardContent>
                            <InviteList 
                                invitations={this.props.invitations}
                                evaluateResults={(responseId) => this.props.EvaluateResults(responseId) }/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = state => ({
    ...state.inviteConsoleReducer
});
const mapDispatchToProps = dispatch => ({
    CloseSnackbar: () => dispatch(CloseSnackbar()),
    OpenSnackbar: () => dispatch(OpenSnackbar()),
    FetchInvitations: () => dispatch(FetchInvitations()),
    EvaluateResults: (responseId) => dispatch(EvaluateResults(responseId))
});
export default connect(mapStateToProps, mapDispatchToProps)(InviteConsoleContainer);
const styles = {
    actionButton: {
        marginLeft: '80%'
    }
}