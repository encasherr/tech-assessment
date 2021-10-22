import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Button, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import LoadingComponent from '../../components/lib/LoadingComponent';
import { KeyboardBackspace } from '@material-ui/icons';
// import OrgList from './OrgList';
// import AddOrgComponent from './AddOrg';
import { FetchCandidateResponseReport, 
        FetchCandidateDetails,
        FetchRecordings
        } from '../../actions/CandidateConsoleActions';
import CandidateConsoleTabs from './CandidateConsoleTabs';

class CandidateConsoleContainer extends React.Component {
    
    componentDidMount = () => {
        this.reload();
    }

    reload = () => {
        // this.props.FetchCandidateResponse();
    }

    onUpdateCandidateDetails = (model) => {
            // this.props.UpdateCandidateDetails(model)
            //         .then((res) => {
            //             this.props.FetchCandidateDetails();
            //         })
    }

    render = () => {
        let { candidateDetails, candidateResponses, classes } = this.props;
        let { state } = this.props.location;
        let responseId = state ? state.responseId : 0;
        let candidateId = state ? state.candidateId : 0;
        let backLink = state ? state.backLink : '/invitations';
        console.log(`responseId: ${responseId}, candidateId: ${candidateId}`);

        return(
            <Grid container spacing={16}>
                <Grid item xs={12} sm={12}>
                    <CandidateConsoleTabs
                        classes={classes}
                        backLink={backLink}
                        responseId={responseId}
                        candidateId={candidateId}
                        {...this.props}
                        />
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = state => ({
    ...state.candidateConsoleReducer
});
const mapDispatchToProps = dispatch => ({
    FetchCandidateResponseReport: (responseId, candidateId) => dispatch(FetchCandidateResponseReport(responseId, candidateId)),
    FetchCandidateDetails: (candidateId) => dispatch(FetchCandidateDetails(candidateId)),
    FetchRecordings: (responseId) => dispatch(FetchRecordings(responseId))
    // FetchOrgs: () => dispatch(FetchOrgs()),
    // AddOrg: (model) => dispatch(AddOrg(model)),
    // UpdateOrg: (model) => dispatch(UpdateOrg(model)),
    // SelectOrg: (model) => dispatch(SelectOrg(model)),
    // CurrentOrgFieldChange: (val, field, model) => dispatch(CurrentOrgFieldChange(val, field, model))
});
export default connect(mapStateToProps, mapDispatchToProps)(CandidateConsoleContainer);