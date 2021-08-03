import React, { Component } from 'react';
import { Book, Assessment, ViewQuilt, PermIdentity, Polymer, Airplay,
    SupervisorAccount, Work, Launch  } from '@material-ui/icons';
import LoadingComponent from '../components/lib/LoadingComponent';
import { getDateTime, sortDescending } from '../Utils';
import { Link as InternalLink } from 'react-router-dom';

const StudentDashboard = (props) => {

    return (
        <div className="container">
           <div className="">
                {/* <StatisticsPanel {...props}/> */}
                <TestsToTake {...props} />
           </div>
           <div className="mt-4">
             <div className="row">
                <div className="col-md-6" style={styles.dashboardPanel}>
                    {/* <RecentResponses {...props} /> */}
                </div>
                <div className="col-md-6" style={styles.dashboardPanel}>
                    {/* <PendingInvitations {...props} /> */}
                </div>
             </div>
           </div>
        </div>
    )
}

const TestsToTake = (props) => {
    return (
        <div className="row">
            <div className="col-md-10">
                <div className="card">
                    <div className="card-header bg-secondary text-light">
                        <h4>Tests to take - {props.tests ? props.tests.length : 0}</h4>
                    </div>
                    <div className="list-group">
                        {props.tests && props.tests.map((testItem) => {
                            console.log('testitem: ', testItem);
                            return (
                                <div className="list-group-item">
                                    <div className="row text-center">
                                        {testItem.test_meta.testName}
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            Grade: {testItem.test_meta.grade}
                                        </div>
                                        <div className="col-md-3">
                                            Subject: {testItem.test_meta.subject}
                                        </div>
                                        <div className="col-md-6">
                                            Created By: {testItem.user_meta.name}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button className="btn btn-primary" 
                                                onClick={() => 
                                                    props.registerForTest(testItem.id)
                                                }>
                                                    Register
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

const StatisticsPanel = (props) => {
    return (
        <div className="row">
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title text-center"><Assessment color="primary" />  Tests </h5>
                        <p className="card-text text-center font-weight-bold">{props.testCount}</p>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title text-center"><Assessment color="primary" />  MCQ Library</h5>
                        <p className="card-text text-center font-weight-bold">{props.mcqCount}</p>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title text-center"><Assessment color="primary" />  Invited</h5>
                        <p className="card-text text-center font-weight-bold">{props.invitationCount}</p>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title text-center"><Assessment color="primary" />  Completed</h5>
                        <p className="card-text text-center font-weight-bold">{props.totalCompletedCount}</p>
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
                    {!props.completedTests && <LoadingComponent /> }
                    {props.recentResponses && props.recentResponses.length === 0 && <div className="alert alert-info">No recent candidate actions </div> }
                    {props.completedTests && props.completedTests.length > 0 &&
                        props.completedTests.map((invitation, index) => {
                            return (
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
                                            <Launch  variant="filled" color="primary" />
                                        </InternalLink>
                                    </div>
                                </div>
                            )
                        })
                    }
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
                {!props.pendingTests && <LoadingComponent /> }
                {props.pendingTests && props.pendingTests.length === 0 && <div className="alert alert-info">No recent candidate actions </div> }
                {props.pendingTests && props.pendingTests.length > 0 &&
                    props.pendingTests.map((invitation, index) => {
                        return (
                            <div className="text-dark">
                                {invitation.candidateName} invited on <span className="font-italic">{getDateTime(invitation.invitedOn, true)}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
                    
    </>
    )
}

const styles = {
    dashboardPanel: {
        minHeight: '300px'
    }
}

export default StudentDashboard;