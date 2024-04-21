import React, { Component } from "react";
import { Book, Assessment, ViewQuilt, PermIdentity, Polymer, Airplay,
    SupervisorAccount, Work, Launch, Dehaze  } from '@material-ui/icons';
import LoadingComponent from '../components/lib/LoadingComponent';
import { getDateTime, sortDescending } from '../Utils';
import { Link as InternalLink } from 'react-router-dom';
import { ListItem, ListItemText } from '@material-ui/core';
import AuthHelper from "../AuthHelper";

class OrgAdminDashboard extends Component {

    componentDidMount = () => {
        AuthHelper.SetHistory(this.props.history);
        this.props.fetchTestCount();
        this.props.fetchMcqCount();
        this.props.fetchInvitationCount();
        this.props.fetchRecentResponses();
    }

    render = () => {
        let { classes, testCount, mcqCount, invitationCount, 
            recentResponses } = this.props;
            let totalCompletedCount = 0;
            console.log('props-ds', this.props);
            
            let completedTests = []; 
            let pendingTests = [];
            if(recentResponses && recentResponses.length) {
                recentResponses.forEach((invitation, index) => {
                    if(invitation.invitationStatus !== 'COMPLETED') {
                        pendingTests.push(invitation);
                    }
                    else {
                        completedTests.push(invitation);
                    }
                })
                
                if(completedTests) {
                    totalCompletedCount = completedTests.length;
                    // completedTests = completedTests.sort().slice(0, 5);
                    completedTests = sortDescending(completedTests, 'completedOn');
                    completedTests = completedTests.slice(0, 5);
                }
                if(pendingTests) {
                    pendingTests = sortDescending(pendingTests, 'invitedOn');
                    pendingTests = pendingTests.sort().slice(0, 5);
                }
            }
            return (
        <>
            <div className="container">
                <div className="">
                    <StatisticsPanel {...this.props}/>
                </div>
                <div className="mt-4">
                    <div className="row">
                        <div className="col-md-6" style={styles.dashboardPanel}>
                            <RecentResponses {...this.props} />
                        </div>
                        <div className="col-md-6" style={styles.dashboardPanel}>
                            <PendingInvitations {...this.props} />
                        </div>
                    </div>
                </div>
            </div>
        </>
            )
    }
    
}

const StatisticsPanel = (props) => {
    return (
        <div className="row">
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                    <InternalLink style={styles.customLink} to="/tests">
                        <h5 className="card-title text-center"><Assessment color="primary" />  Tests </h5>
                        <p className="card-text text-center font-weight-bold">{props.testCount}</p>
                    </InternalLink>
                        
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <InternalLink style={styles.customLink} to="/mcqs">
                            <h5 className="card-title text-center"><Assessment color="primary" />  MCQ Library</h5>
                            <p className="card-text text-center font-weight-bold">{props.mcqCount}</p>
                        </InternalLink>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <InternalLink style={styles.customLink} to="/invitations">
                            <h5 className="card-title text-center"><Assessment color="primary" />  Invited</h5>
                            <p className="card-text text-center font-weight-bold">{props.invitationCount}</p>
                        </InternalLink>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <InternalLink style={styles.customLink} to="/invitations">
                            <h5 className="card-title text-center"><Assessment color="primary" />  Completed</h5>
                            <p className="card-text text-center font-weight-bold">{props.totalCompletedCount}</p>
                        </InternalLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

const RecentResponses = (props) => {
    return (
        <>
            <div className="card h-100">
                <div className="card-header">
                    <p>Completed Tests</p>

                </div>
                <div className="card-body">
                    <div className="list-group">
                    {!props.completedTests && <LoadingComponent /> }
                    {props.completedTests && props.completedTests.length === 0 && <div className="alert alert-info">No recent candidate actions </div> }
                    {props.completedTests && props.completedTests.length > 0 &&
                        props.completedTests.map((invitation, index) => {
                            return (
                                <div className="list-group-item">
                                <div className="row">
                                    <div className="col-md-10">
                                        {invitation.candidateName} completed test on &nbsp;
                                        <span className="font-italic">{getDateTime(invitation.completedOn, true)}</span>
                                    </div>
                                    <div className="col-md-2">
                                        <InternalLink className="text-small" title="View All" 
                                            // to={ {pathname: "/invitations"} }
                                            to={ {pathname: "/candidateConsole", state: { responseId: invitation.responseId,
                                                candidateId: invitation.candidateId, backLink: 'invitations' } }}
                                            >
                                            <Dehaze  variant="filled" color="primary" />
                                        </InternalLink>
                                    </div>
                                </div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
                        
        </>
    )
}

const PendingInvitations = (props) => {
    return (
    <>
        <div className="card h-100">
            <div className="card-header">
                <p>Invitations Sent</p>
            </div>
            <div className="card-body">
                <div className="list-group">
                {!props.pendingTests && <LoadingComponent /> }
                {props.pendingTests && props.pendingTests.length === 0 && <div className="alert alert-info">No candidates invited recently</div> }
                {props.pendingTests && props.pendingTests.length > 0 &&
                    props.pendingTests.map((invitation, index) => {
                        return (
                            <div className="list-group-item">
                                <div className="text-dark">
                                    {invitation.candidateName} invited on <span className="font-italic">{getDateTime(invitation.invitedOn, true)}</span>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
                    
    </>
    )
}

const styles = {
    dashboardPanel: {
        minHeight: '300px'
    },
    customLink: {
        color: '#000',
        textDecoration: 'none'
    }
}

export default OrgAdminDashboard