import React, { Component } from 'react';
import AuthHelper from '../AuthHelper';
import { connect } from 'react-redux';
import { SetUserInfo } from '../actions/UserActions';
import { Card, CardHeader, CardContent, Typography, CardActions, Button, Grid } from '@material-ui/core';

class Dashboard extends Component {
    componentDidMount = () => {
        AuthHelper.SetHistory(this.props.history);
        // this.props.SetUserInfo(AuthHelper.GetUserInfo());
    }
    
    
    render = () => {
        return (
            <div>
                <Grid container>
                    <Grid item xs={5} sm={5}>
                        <Card>
                            <CardHeader title="Active Tests">
                            </CardHeader>
                            <CardContent>
                                <Typography variant="subtitle1">
                                    You have no active tests. Start Creating.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="large" color="inherit">View All</Button>
                            </CardActions>
                            
                        </Card>
                    </Grid>
                    <Grid item xs={2} sm={2} />
                    <Grid item xs={5} sm={5}>
                        <Card>
                            <CardHeader title="MCQ Library">
                            </CardHeader>
                            <CardContent>
                                <Typography variant="subtitle1">
                                    You have 10 MCQs in library. Keep adding.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="large" color="inherit">Start Adding</Button>
                            </CardActions>
                            
                        </Card>
                    </Grid>
                    <br></br><br></br>
                    <Grid item xs={5} sm={5} style={{marginTop: '5%'}}>
                        <Card>
                            <CardHeader title="Candidates">
                            </CardHeader>
                            <CardContent>
                                <Typography variant="subtitle1">
                                    Your 2 candidates are yet to take test.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="large" color="inherit">Go to Tests</Button>
                            </CardActions>
                            
                        </Card>
                    </Grid>
                    <Grid item xs={2} sm={2} />
                    <Grid item xs={5} sm={5} style={{marginTop: '5%'}}>
                        <Card>
                            <CardHeader title="Skills">
                            </CardHeader>
                            <CardContent>
                                <Typography variant="subtitle1">
                                    You have defined 25 skill sets for your hiring. Keep it updated.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="large" color="inherit">View All</Button>
                            </CardActions>
                            
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state.userReducer
});
const mapDispatchToProps = dispatch => ({
    SetUserInfo: (userInfo) => dispatch(SetUserInfo(userInfo)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);