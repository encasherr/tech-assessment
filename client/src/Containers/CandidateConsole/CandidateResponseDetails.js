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
        let basicDetails = (candidateDetails && candidateDetails.length > 0) ? candidateDetails[0].candidate_meta : {};
        let invitations = candidateDetails ? candidateDetails : [];
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




        return (
            <div>
            <Grid container spacing={16}>
                <Grid item xs={4} sm={4}>

                    {basicDetails && 
                    <List 
                    // className={classNames(classes.palettePrimaryDark, classes.profileBox)}
                    >
                        <ListItem>
                            <Grid container spacing={16}>
                                <Grid item xs={4} sm={4} />
                                <Grid item xs={4} sm={4}>
                                    <AccountBox color="action"
                                    //  className={classes.squareIcon}
                                     />
                                </Grid>
                                <Grid item xs={4} sm={4} />
                            </Grid>
                        </ListItem>
                        <ListItem 
                        // className={classes.paletteBorderBottomListItem}
                        >
                            <Grid container spacing={16}>
                                <Grid item xs={4} sm={4}>
                                    <Typography 
                                        // className={classes.fontBlackPrimary}
                                    >Name</Typography>
                                </Grid>
                                <Grid item xs={4} sm={4}>
                                    <Typography 
                                        // className={classes.fontBlackSecondary}
                                    >{basicDetails.name}</Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} />
                            </Grid>
                        </ListItem>
                        <ListItem 
                            // className={classes.paletteBorderBottomListItem}
                            >
                            <Grid container spacing={16}>
                                <Grid item xs={4} sm={4}>
                                    <Typography 
                                        // className={classes.fontBlackPrimary}
                                        >Email</Typography>
                                </Grid>
                                <Grid item xs={4} sm={4}>
                                    <Typography 
                                        // className={classes.fontBlackSecondary}
                                        >{basicDetails.email}</Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} />
                            </Grid>
                        </ListItem>
                        <ListItem >
                            <Grid container spacing={16}>
                                <Grid item xs={4} sm={4}>
                                    <Typography 
                                        // className={classes.fontBlackPrimary}
                                        >Cell</Typography>
                                </Grid>
                                <Grid item xs={4} sm={4}>
                                    <Typography 
                                        // className={classes.fontBlackSecondary}
                                        >{basicDetails.cellNumber ? basicDetails.cellNumber : '-'}</Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} />
                            </Grid>
                        </ListItem>
                    </List>}   
                </Grid>
            
                <Grid item xs={4} sm={4}>

                    {/* <List 
                         className={classNames(classes.palettePrimaryDark, classes.profileBox)}
                        > */}
                        {/* <ListItem>
                            <ListItemText
                                primary={<Typography align="center" 
                                            // className={classes.fontSubHeading}
                                            >Recent Test Performances</Typography>} />
                        </ListItem> */}
                        {/* <ListItem 
                            // className={classes.paletteBorderBottomListItem}
                            >
                            <Grid container spacing={16}>
                                <Grid item xs={3} sm={3}>
                                    <Typography 
                                        // className={classes.fontBlackPrimary}
                                        >Test</Typography>
                                </Grid>
                                <Grid item xs={4} sm={4}>
                                    <Typography 
                                        // className={classes.fontBlackPrimary}
                                        >Skill</Typography>
                                </Grid>
                                <Grid item xs={2} sm={2}>
                                    <Typography 
                                        // className={classes.fontBlackPrimary}
                                        >Score (%)</Typography>
                                </Grid>
                                <Grid item xs={3} sm={3}>
                                    <Typography 
                                        // className={classes.fontBlackPrimary}
                                        >Taken On</Typography>
                                </Grid>
                            </Grid>
                        </ListItem> */}
                        
                        <div className="card bg-default">
                                    <div className="card-header">
                                        <p>Recent Test Performances</p>
                                    </div>
                        {completedInvitations && completedInvitations.length > 0 &&
                        completedInvitations.map((invitation, index) => {
                            // let cssListItem = index < completedInvitations.length-1 ? classNames(classes.paletteBorderBottomListItem) : '';
                            return (
                                <div>
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
                                            {`${invitation.invitation_meta.completedOn ? 
                                                    'Completed on ' : ''}
                                                    ${getDateTime(invitation.invitation_meta.completedOn, true)} 
                                                `}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                            return (
                            <ListItem 
                                // className={cssListItem}
                                >
                                <Grid container spacing={16}>
                                    <Grid item xs={3} sm={3}>
                                        <Typography 
                                            // className={classes.fontBlackSecondary}
                                            >{invitation.test_meta.testName}</Typography>
                                    </Grid>
                                    <Grid item xs={4} sm={4}>
                                        <Typography 
                                            // className={classes.fontBlackSecondary}
                                            >{invitation.test_meta.skill}</Typography>
                                    </Grid>
                                    <Grid item xs={2} sm={2}>
                                        <Typography 
                                            // className={classes.fontBlackSecondary}
                                            >
                                         {invitation.response_meta && formatToDecimals(invitation.response_meta.scorePercentage, 2)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3}>
                                        <Typography 
                                            // className={classes.fontBlackSecondary}
                                            >{getDateTime(invitation.invitation_meta.completedOn)}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            )
                        })}
                    {/* </List>    */}
                    </div>
                </Grid>
            
                <Grid item xs={4} sm={4}>

                     <List 
                        // className={classNames(classes.palettePrimaryDark, classes.profileBox)}
                        >
                        <ListItem>
                            <ListItemText
                                primary={<Typography align="center" 
                                // className={classes.fontSubHeading}
                                >Pending Tests</Typography>} />
                        </ListItem>
                        <ListItem 
                            // className={classes.paletteBorderBottomListItem}
                            >
                            <Grid container spacing={16}>
                                <Grid item xs={3} sm={3}>
                                    <Typography 
                                        // className={classes.fontBlackPrimary}
                                        >Test</Typography>
                                </Grid>
                                <Grid item xs={4} sm={4}>
                                    <Typography 
                                        // className={classes.fontBlackPrimary}
                                        >Skill</Typography>
                                </Grid>
                                <Grid item xs={3} sm={3}>
                                    <Typography 
                                        // className={classes.fontBlackPrimary}
                                        >Invited On</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        {pendingInvitations && pendingInvitations.length === 0 &&
                        <ListItem>
                            <ListItemText primary={<Typography align="center">No Pending Invitations</Typography>} />
                        </ListItem>}
                        {pendingInvitations && pendingInvitations.length > 0 &&
                        pendingInvitations.map((invitation, index) => {
                            // let cssListItem = index < pendingInvitations.length-1 ? classNames(classes.paletteBorderBottomListItem) : '';
                            return (
                            <ListItem 
                                // className={cssListItem}
                                >
                                <Grid container spacing={16}>
                                    <Grid item xs={3} sm={3}>
                                        <Typography 
                                            // className={classes.fontBlackSecondary}
                                            >{invitation.test_meta.testName}</Typography>
                                    </Grid>
                                    <Grid item xs={4} sm={4}>
                                        <Typography 
                                            // className={classes.fontBlackSecondary}
                                            >{invitation.test_meta.skill}</Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3}>
                                        <Typography 
                                            // className={classes.fontBlackSecondary}
                                            >{getDateTime(invitation.invitation_meta.completedOn)}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            )
                        })}
                    </List>      
                </Grid>

            </Grid>
                
            </div>
        )
    }
}
export default CandidateResponseDetail;