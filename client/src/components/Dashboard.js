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
import { ThemeProvider } from 'styled-components'
import { bgcolor } from '@material-ui/system';
import { Book, Assessment, ViewQuilt, PermIdentity, Polymer, Airplay,
    SupervisorAccount, Work  } from '@material-ui/icons';
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
        console.log('props', this.props);
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
        return (
            <div>
                <Grid container>
                    <Grid item xs={2} sm={2}>
                        <Card className={classes.paletteBorderLeftSuccessMain}>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={3} sm={3} className={classes.verticalCenter}>
                                        <Avatar variant="rounded" className={classes.bgSuccessMain}>
                                            <Assessment />
                                        </Avatar>
                                    </Grid>
                                    <Grid item xs={1} sm={1}></Grid>
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
                    <Grid item xs={1} sm={1} />
                    <Grid item xs={2} sm={2}>
                        <Card className={classes.paletteBorderLeftPrimaryMain}>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={3} sm={3} className={classes.verticalCenter}>
                                        <Avatar variant="rounded" className={classes.bgPrimaryMain}>
                                            <Assessment />
                                        </Avatar>
                                    </Grid>
                                    <Grid item xs={1} sm={1}></Grid>
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
                    <Grid item xs={1} sm={1} />
                    <Grid item xs={2} sm={2}>
                        <Card className={classes.paletteBorderLeftSecondaryMain}>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={3} sm={3} className={classes.verticalCenter}>
                                        <Avatar variant="rounded" className={classes.bgSecondaryLight}>
                                            <Assessment />
                                        </Avatar>
                                    </Grid>
                                    <Grid item xs={1} sm={1}></Grid>
                                    <Grid item xs={8} sm={8}>
                                        <div>
                                            <Typography variant="caption">Invitations</Typography>
                                            <Typography variant="h3">{invitationCount}</Typography>Candidates invited
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={1} sm={1} />
                    <Grid item xs={2} sm={2}>
                        <Card className={classes.paletteBorderLeftSecondaryMain}>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={3} sm={3} className={classes.verticalCenter}>
                                        <Avatar variant="rounded" className={classes.bgSecondaryLight}>
                                            <Assessment />
                                        </Avatar>
                                    </Grid>
                                    <Grid item xs={1} sm={1}></Grid>
                                    <Grid item xs={8} sm={8}>
                                        <div>
                                            <Typography variant="caption">Invitations</Typography>
                                            <Typography variant="h3">{invitationCount}</Typography>Candidates invited
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    
                </Grid>
                <Grid container style={{marginTop: '5%'}}>
                    <Grid item xs={5} sm={5}>
                        <Card className={classes.paletteBorderLeftSuccessMain}>
                            <CardHeader className={classes.paletteBorderBottomSuccessLight} title={<Typography variant="subtitle2">Candidate Performance</Typography> }></CardHeader>
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
                                            <BorderLinearProgressSecondary variant="determinate" value={80} />
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
                    <Grid item xs={5} sm={5}>
                        {!recentResponses && <LoadingComponent /> }
                {recentResponses && recentResponses.length === 0 && <Typography align="center" variant="subtitle1">No recent candidate actions </Typography> }
                {recentResponses && recentResponses.length > 0 && 
                        <Card className={classes.paletteBorderLeftSuccessMain}>
                            <CardHeader className={classes.paletteBorderBottomSuccessLight} title={<Typography variant="subtitle2">Candidate Responses</Typography> }></CardHeader>
                            <CardContent className={classNames(classes.dashboardHeight)}>
                            {recentResponses.map((invitation, index) => {
                                let candidateResponseStatusText = `${invitation.candidateName} completed test on ${invitation.completedOn}`;
                                if(invitation.invitationStatus !== 'COMPLETED') {
                                    candidateResponseStatusText = `${invitation.candidateName} yet to take test`;
                                }
                                return(
                            <List key={index}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.bgSecondaryLight}>
                                            <PermIdentity />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={candidateResponseStatusText}
                                        // secondary={secondary ? 'Secondary text' : null}
                                    />
                                    <ListItemSecondaryAction>
                                        <InternalLink to={ {pathname: "/invitations"} }>
                                            <Button className={classes.bgPrimaryMain}>View</Button>
                                        </InternalLink>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>)
                            })}
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
    niceCard: {
        bgcolor: 'primary.main'
    },
    alignCenter: {
        textAlign: 'center',
        height: '35px',
        lineHeight: '35px'
    }
}