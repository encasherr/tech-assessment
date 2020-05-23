import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { PersonAdd } from '@material-ui/icons';
import LoadingComponent from '../../components/lib/LoadingComponent';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';


const InviteList = (props) => {
    let { invitations } = props;
    console.log('invitations', invitations);
    return (
                <div>
                {!invitations && <LoadingComponent /> }
                {invitations && invitations.length === 0 && <Typography align="center" variant="subtitle1">No Invitations Found </Typography> }
                {invitations && invitations.length > 0 && 
                <Table>
                    <TableHead>
                    <TableRow>
                        <CustomTableCell>Test</CustomTableCell>
                        <CustomTableCell align="left">Candidate Name</CustomTableCell>
                        <CustomTableCell align="left">Status</CustomTableCell>
                        <CustomTableCell align="left">Invited On</CustomTableCell>
                        <CustomTableCell align="left">Completed On</CustomTableCell>
                        <CustomTableCell align="left">Results</CustomTableCell>
                        {/* <CustomTableCell align="left">Send Reminder</CustomTableCell> */}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {invitations.map((invitation, index) => (
                        <TableRow key={index}>
                            <CustomTableCell component="th" scope="row">
                                <Link to={ {pathname: "/testConsole", state: { testId: invitation.testId } }}>
                                    {invitation.testName}
                                </Link>
                            </CustomTableCell>
                            <CustomTableCell align="left">{invitation.candidateName}</CustomTableCell>
                            <CustomTableCell align="left">{invitation.invitationStatus}</CustomTableCell>
                            <CustomTableCell align="left">{invitation.invitedOn}</CustomTableCell>
                            <CustomTableCell align="left">{invitation.completedOn}</CustomTableCell>
                            <CustomTableCell align="left">
                                {
                                    invitation.result && 
                                        invitation.result.indexOf('CLEARED') > -1 &&
                                        <Typography color="primary">{invitation.result}</Typography>
                                }
                                {
                                    invitation.result && 
                                        invitation.result.indexOf('FAILED') > -1 &&
                                        <Typography color="secondary">{invitation.result}</Typography>
                                }
                                {
                                    invitation.invitationStatus &&
                                        invitation.invitationStatus.indexOf("INIT") > -1 &&
                                        <Typography>Not Taken</Typography>
                                }
                                {   
                                    !invitation.result &&
                                        (invitation.invitationStatus &&
                                        invitation.invitationStatus.indexOf("COMPLETED") > -1) &&
                                    <Button color="primary" size="small" variant="contained"
                                       onClick={() => props.evaluateResults(invitation.responseId)} >Evaluate</Button>    
                                }
                            </CustomTableCell>
                            {/* <CustomTableCell align="center" scope="row" component="th">
                                <Link to={ {pathname: "/inviteConsole", state: { testId: invitation.testId } }}>
                                    <PersonAdd />
                                </Link>
                            </CustomTableCell> */}
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                }
            </div>
        );
}
const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);
export default InviteList;