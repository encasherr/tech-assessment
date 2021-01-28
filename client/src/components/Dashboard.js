import React, { Component } from 'react';
import classNames from 'classnames';
import AuthHelper from '../AuthHelper';
import { connect } from 'react-redux';
import { SetUserInfo } from '../actions/UserActions';
import { FetchTestCount, FetchMcqCount, FetchInvitationCount,
    FetchRecentResponses } from '../actions/DashboardActions';
import { Card, CardHeader, CardContent, Typography, CardActions, Button, Grid, MuiThemeProvider,
Paper, Avatar, ListItemSecondaryAction } from '@material-ui/core';
import { Link as InternalLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
// import Box from '@material-ui/core/Box';
// import Box from '../components/lib/Box';
// import { ThemeProvider } from 'styled-components'
// import { bgcolor } from '@material-ui/system';
import { Book, Assessment, ViewQuilt, PermIdentity, Polymer, Airplay,
    SupervisorAccount, Work, Launch  } from '@material-ui/icons';
import * as css from '../../src/App.css';
import InviteList from '../Containers/InviteConsole/InviteList';
    // import { styled } from '@material-ui/core/styles';
    // import { compose, spacing, palette } from '@material-ui/system';
    // const Box = styled('div')(compose(spacing, palette));
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import LoadingComponent from '../components/lib/LoadingComponent';
import { BorderLinearProgressPrimary, BorderLinearProgressInfo, BorderLinearProgressSecondary,
    BorderLinearProgressSuccess, 
    BorderLinearProgressWarning} from './lib/ProgressBars';
import LocalLoginComponent from './lib/LocalLoginComponent';
import { primary } from './lib/ColorCodes';
import { getDateTime, sortDescending } from '../Utils';

const theme = {
    spacing: 4,
    palette: {
      primary: '#007bff',
    },
  };
class Dashboard extends Component {
    componentDidMount = () => {
        AuthHelper.SetHistory(this.props.history);
        this.props.FetchTestCount();
        this.props.FetchMcqCount();
        this.props.FetchInvitationCount();
        this.props.FetchRecentResponses();
    }
    
    
    render = () => {
        let { classes, testCount, mcqCount, invitationCount, recentResponses } = this.props;
        let totalCompletedCount = 0;
        console.log('props-ds', this.props);
        if(!classes){
            return (
                <div>
                    <Typography color="secondary" variant="h6">Token expired.</Typography>
                    
                    <Link color="inherit" href="/login" onClick={() => AuthHelper.LogOut()} >
                            Login
                    </Link>

                </div>
            )
        }
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
            <div>
                <Grid container spacing={32}>
                    <Grid item xs={3} sm={3}>
                        <Card className={classes.paletteBorderLeftSuccessMain}>
                            <CardContent>
                                <Grid container spacing={32}>
                                    <Grid item xs={3} sm={3} className={classes.verticalCenter}>
                                        <Avatar variant="square" className={classes.bgSuccessMain}>
                                            <Assessment />
                                        </Avatar>
                                    </Grid>
                                    {/* <Grid item xs={1} sm={1}></Grid> */}
                                    <Grid item xs={8} sm={8}>
                                        <div>
                                            <Typography variant="caption">Tests taken</Typography>
                                           <Typography variant="h3">{testCount}</Typography> Tests
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* <Grid item xs={1} sm={1} /> */}
                    <Grid item xs={3} sm={3}>
                        <Card className={classes.paletteBorderLeftPrimaryMain}>
                            <CardContent>
                                <Grid container spacing={32}>
                                    <Grid item xs={3} sm={3} className={classes.verticalCenter}>
                                        <Avatar variant="rounded" className={classes.bgSuccessMain}>
                                            <Assessment />
                                        </Avatar>
                                    </Grid>
                                    {/* <Grid item xs={1} sm={1}></Grid> */}
                                    <Grid item xs={8} sm={8}>
                                        <div>
                                            <Typography variant="caption">MCQ Library</Typography>
                                            <Typography variant="h3">{mcqCount}</Typography> 
                                            Questions
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* <Grid item xs={1} sm={1} /> */}
                    <Grid item xs={3} sm={3}>
                        <Card className={classes.paletteBorderLeftSecondaryMain}>
                            <CardContent>
                                <Grid container spacing={32}>
                                    <Grid item xs={3} sm={3} className={classes.verticalCenter}>
                                        <Avatar variant="rounded" className={classes.bgSuccessMain}>
                                            <Assessment />
                                        </Avatar>
                                    </Grid>
                                    {/* <Grid item xs={1} sm={1}></Grid> */}
                                    <Grid item xs={8} sm={8}>
                                        <div>
                                            <Typography variant="caption">Invitations</Typography>
                                            <Typography variant="h3">{invitationCount}</Typography>Candidates Invited
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* <Grid item xs={1} sm={1} /> */}
                    <Grid item xs={3} sm={3}>
                        <Card className={classes.paletteBorderLeftSecondaryMain}>
                            <CardContent>
                                <Grid container spacing={32}>
                                    <Grid item xs={3} sm={3} className={classes.verticalCenter}>
                                        <Avatar variant="rounded" className={classes.bgSuccessMain}>
                                            <Assessment />
                                        </Avatar>
                                    </Grid>
                                    {/* <Grid item xs={1} sm={1}></Grid> */}
                                    <Grid item xs={8} sm={8}>
                                        <div>
                                            <Typography variant="caption">Candidate Response</Typography>
                                            <Typography variant="h3">{totalCompletedCount}</Typography>Tests Completed
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    
                </Grid>
                <Grid container style={{marginTop: '5%'}}>
                    <Grid item xs={4} sm={4}>
                        <Card className={classNames(classes.paletteDashboardBox)}>
                            <CardHeader className={classes.paletteBorderBottomSuccessLight} title={<Typography variant="h6">Candidate Performance</Typography> }></CardHeader>
                            <CardContent className={classNames(classes.dashboardHeight)}>
                                <List>
                                    <ListItem>
                                        <ListItemText 
                                            primary={<div>
                                                <Typography variant="subtitle1">C#</Typography>
                                            <BorderLinearProgressPrimary variant="determinate" value={60} />
                                            </div>}
                                            secondary={<Typography variant="caption">% of candidates hired</Typography>} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={<div>
                                                <Typography variant="subtitle1">Data Analyst</Typography>
                                            <BorderLinearProgressWarning variant="determinate" value={40} />
                                            </div>}
                                                secondary={<Typography variant="caption">% of candidates hired</Typography>} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText 
                                            primary={<div>
                                                <Typography variant="subtitle1">Angular</Typography>
                                            <BorderLinearProgressInfo variant="determinate" value={80} />
                                            </div>}
                                            secondary={<Typography variant="caption">% of candidates hired</Typography>} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={<div>
                                                <Typography variant="subtitle1">Java</Typography>
                                            <BorderLinearProgressSuccess variant="determinate" value={50} />
                                            </div>}
                                            secondary={<Typography variant="caption">% of candidates hired</Typography>} />
                                    
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={1} sm={1}></Grid>
                    <Grid item xs={3} sm={3}>
                        {!recentResponses && <LoadingComponent /> }
                        {recentResponses && recentResponses.length === 0 && <Typography align="center" variant="subtitle1">No recent candidate actions </Typography> }
                        {completedTests && completedTests.length > 0 && 
                        <Card className={classNames(classes.paletteDashboardBox)}>
                            <CardHeader 
                                action={
                                    <InternalLink title="View All" to={ {pathname: "/invitations"} }>
                                        <Launch  variant="filled" color="primary" />
                                    </InternalLink>
                                        } 
                                className={classes.paletteBorderBottomSuccessLight} title={<Typography variant="h6">Completed Tests</Typography> }></CardHeader>
                            <CardContent className={classNames(classes.dashboardHeight)}>
                            <List>
                            <ListItem>
                                    <Grid container spacing={16}>
                                        <Grid item xs={6} sm={6}>
                                            <ListItemText primary="Candidate" />
                                        </Grid>
                                        <Grid item xs={6} sm={6}>
                                            <ListItemText primary="Completed" />
                                        </Grid>
                                        {/* <Grid item xs={2} sm={2}>
                                        </Grid> */}
                                    </Grid>
                            </ListItem>
                            {
                                completedTests.map((invitation, index) => {
                                // let candidateResponseStatusText = `${invitation.candidateName} completed test on ${invitation.completedOn}`;
                                // if(invitation.invitationStatus !== 'COMPLETED') {
                                //     candidateResponseStatusText = `${invitation.candidateName} yet to take test`;
                                // }
                                return(
                                <ListItem>
                                    <Grid container spacing={16}>
                                        <Grid item xs={6} sm={6}>
                                            <ListItemText secondary={invitation.candidateName} />
                                        </Grid>
                                        <Grid item xs={6} sm={6}>
                                            <ListItemText secondary={getDateTime(invitation.completedOn, true)} />
                                        </Grid>
                                        {/* <Grid item xs={2} sm={2}>
                                                <InternalLink to={ {pathname: "/invitations"} }>
                                                    <Launch variant="filled" color="primary" />
                                                </InternalLink>
                                        </Grid> */}
                                    </Grid>
                                </ListItem>
                                )
                            })}
                            </List>
                            </CardContent>
                        </Card>}
                    </Grid>
                    <Grid item xs={1} sm={1}></Grid>
                    <Grid item xs={3} sm={3}>
                        
                    {!recentResponses && <LoadingComponent /> }
                        {recentResponses && recentResponses.length === 0 && <Typography align="center" variant="subtitle1">No recent candidate actions </Typography> }
                        {pendingTests && pendingTests.length > 0 && 
                        <Card className={classNames(classes.paletteDashboardBox)}>
                            <CardHeader 
                                action={
                                    <InternalLink title="View All" to={ {pathname: "/invitations"} }>
                                        <Launch  variant="filled" color="primary" />
                                    </InternalLink>
                                        } 
                                className={classes.paletteBorderBottomSuccessLight} title={<Typography variant="h6">Pending Tests</Typography> }></CardHeader>
                            <CardContent className={classNames(classes.dashboardHeight)}>
                            <List>
                            <ListItem>
                                    <Grid container spacing={16}>
                                        <Grid item xs={6} sm={6}>
                                            <ListItemText primary="Candidate" />
                                        </Grid>
                                        <Grid item xs={6} sm={6}>
                                            <ListItemText primary="Invited" />
                                        </Grid>
                                        {/* <Grid item xs={2} sm={2}>
                                        </Grid> */}
                                    </Grid>
                            </ListItem>
                            {
                                pendingTests.map((invitation, index) => {
                                // let candidateResponseStatusText = `${invitation.candidateName} completed test on ${invitation.completedOn}`;
                                // if(invitation.invitationStatus !== 'COMPLETED') {
                                //     candidateResponseStatusText = `${invitation.candidateName} yet to take test`;
                                // }
                                return(
                                <ListItem>
                                    <Grid container spacing={16}>
                                        <Grid item xs={6} sm={6}>
                                            <ListItemText secondary={invitation.candidateName} />
                                        </Grid>
                                        <Grid item xs={6} sm={6}>
                                            <ListItemText secondary={getDateTime(invitation.invitedOn, true)} />
                                        </Grid>
                                        {/* <Grid item xs={2} sm={2}>
                                                <InternalLink to={ {pathname: "/invitations"} }>
                                                    <Launch variant="filled" color="primary" />
                                                </InternalLink>
                                        </Grid> */}
                                    </Grid>
                                </ListItem>
                                )
                            })}
                            </List>
                            </CardContent>
                        </Card>}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state.dashboardReducer
});
const mapDispatchToProps = dispatch => ({
    SetUserInfo: (userInfo) => dispatch(SetUserInfo(userInfo)),
    FetchTestCount: () => dispatch(FetchTestCount()),
    FetchMcqCount: () => dispatch(FetchMcqCount()),
    FetchInvitationCount: () => dispatch(FetchInvitationCount()),
    FetchRecentResponses: () => dispatch(FetchRecentResponses())
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const styles = {
    card: {
        textAlign: 'center'
    },
    cardAction: {
        float: 'right'
    },
    cardHeader: {
        borderBottom: '1px solid #3f51b5',
        color: '#fff'
    },
    alignCenter: {
        textAlign: 'center',
        height: '35px',
        lineHeight: '35px'
    }
}