import React, { Component, useState } from 'react';
import classNames from 'classnames';
import { ListItem, List, ListItemText, Grid, Typography,
        Avatar, 
        ListItemAvatar,
        Button} from '@material-ui/core';
import { AccountBox , Email, Call} from '@material-ui/icons';
import { getDateTime, formatToDecimals } from '../../Utils';

class CandidateResponseDetail extends Component {

    componentDidMount = () => {
        this.props.fetchCandidateDetails(this.props.candidateId);
    }

    render = () => {
        let { classes, candidateDetails} = this.props;
        console.log('candidateDetails', candidateDetails);
        if(candidateDetails && candidateDetails.length > 0 && candidateDetails[0].isRegistered) {
            return this.renderRegisteredCandidateDetails(candidateDetails);
        }
        else {
            return this.renderCandidateDetails(candidateDetails);
        }
    }

    
    renderRegisteredCandidateDetails = (candidateDetails) => {
        let registrations = candidateDetails ? candidateDetails : [];
        let basicDetails = (candidateDetails && candidateDetails.length > 0) ? candidateDetails[0].candidate_meta : {};
        let pendingRegistrations = [], completedRegistrations = [];
        registrations.forEach((registration) => {
            console.log('registration.status', registration.status);
            if(registration.status === 'Completed') {
                completedRegistrations.push(registration);
            }
            else {
                pendingRegistrations.push(registration);
            }
        })
        console.log('completedRegistrations', completedRegistrations);


        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="row mt-4">
                        <div className="font-weight-bold">
                        <AccountBox color="primary" /> {basicDetails.name}
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="font-weight-bold">
                            <Email color="primary"  /> {basicDetails.email}
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="font-weight-bold">
                        <Call color="primary"  /> {basicDetails.cellNumber ? basicDetails.cellNumber : ' - '}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-default">
                        <div className="card-header">
                            <p>Recent Test Performances</p>
                        </div>
                        {completedRegistrations && completedRegistrations.length > 0 &&
                        completedRegistrations.map((registration, index) => {
                            return (
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="text-bold">
                                            {registration.test_meta.testName}
                                            </div>
                                        </div>
                                        <div className="row">
                                            {registration.test_meta.skill}
                                        </div>
                                        <div className="row">
                                            {registration.test_meta.grade}
                                        </div>
                                        <div className="row">
                                            <div className="text-italic">
                                            {`${registration.status === 'Completed' ? 
                                                    'Completed on ' : ''}
                                                    ${getDateTime(registration.modified_on, true)} 
                                                `}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="font-weight-bold">
                                            {registration.evaluation_meta && `Scored ${formatToDecimals(registration.evaluation_meta.scorePercentage, 2)} %`}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-default">
                        <div className="card-header">
                            <p>Pending Tests</p>
                        </div>
                        {pendingRegistrations && pendingRegistrations.length === 0 &&
                                    <div className="card-body">
                                    <div className="alert alert-info">No Pending Registrations</div>
                                    </div>
                        }
                        {pendingRegistrations && pendingRegistrations.length > 0 &&
                        pendingRegistrations.map((registration, index) => {
                            return (
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="text-bold">
                                            {registration.test_meta.testName}
                                            </div>
                                        </div>
                                        <div className="row">
                                            {registration.test_meta.skill}
                                        </div>
                                        <div className="row">
                                            {registration.test_meta.grade}
                                        </div>
                                        <div className="row">
                                            <div className="text-light">
                                            {registration.evaluation_meta && formatToDecimals(registration.evaluation_meta.scorePercentage, 2)}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="text-italic">
                                            {`${registration.created_on ? 
                                                    'Registered on ' : ''}
                                                    ${getDateTime(registration.created_on, true)} 
                                                `}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        )


    }

    renderCandidateDetails = (candidateDetails) => {
        let invitations = candidateDetails ? candidateDetails : [];
        let basicDetails = (candidateDetails && candidateDetails.length > 0) ? candidateDetails[0].candidate_meta : {};
        let pendingInvitations = [], completedInvitations = [];
        invitations.forEach((invitation) => {
            console.log('invitation.invitation_meta.status', invitation.invitation_meta.status);
            if(invitation.invitation_meta.status === 'COMPLETED') {
                completedInvitations.push(invitation);
            }
            else {
                pendingInvitations.push(invitation);
            }
        })
        console.log('completedInvitations', completedInvitations);


        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="row mt-4">
                        <div className="font-weight-bold">
                        <AccountBox color="primary" /> {basicDetails.name}
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="font-weight-bold">
                            <Email color="primary"  /> {basicDetails.email}
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="font-weight-bold">
                        <Call color="primary"  /> {basicDetails.cellNumber ? basicDetails.cellNumber : ' - '}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-default">
                        <div className="card-header">
                            <p>Recent Test Performances</p>
                        </div>
                        {completedInvitations && completedInvitations.length > 0 &&
                        completedInvitations.map((invitation, index) => {
                            return (
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="text-bold">
                                            {invitation.test_meta.testName}
                                            </div>
                                        </div>
                                        <div className="row">
                                            {invitation.test_meta.skill}
                                        </div>
                                        <div className="row">
                                            <div className="text-italic">
                                            {`${invitation.invitation_meta.completedOn ? 
                                                    'Completed on ' : ''}
                                                    ${getDateTime(invitation.invitation_meta.completedOn, true)} 
                                                `}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="font-weight-bold">
                                            {invitation.response_meta && `Scored ${formatToDecimals(invitation.response_meta.scorePercentage, 2)} %`}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-default">
                        <div className="card-header">
                            <p>Pending Tests</p>
                        </div>
                        {pendingInvitations && pendingInvitations.length === 0 &&
                                    <div className="card-body">
                                    <div className="alert alert-info">No Pending Invitations</div>
                                    </div>
                        }
                        {pendingInvitations && pendingInvitations.length > 0 &&
                        pendingInvitations.map((invitation, index) => {
                            return (
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="text-bold">
                                            {invitation.test_meta.testName}
                                            </div>
                                        </div>
                                        <div className="row">
                                            {invitation.test_meta.skill}
                                        </div>
                                        <div className="row">
                                            <div className="text-light">
                                            {invitation.response_meta && formatToDecimals(invitation.response_meta.scorePercentage, 2)}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="text-italic">
                                            {`${invitation.invitation_meta.invitedOn ? 
                                                    'Completed on ' : ''}
                                                    ${getDateTime(invitation.invitation_meta.invitedOn, true)} 
                                                `}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        )


    }
}
export default CandidateResponseDetail;