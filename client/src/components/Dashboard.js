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
                        <Card style={styles.card}>
                            <CardHeader title="Active Tests" style={styles.cardHeader}>
                            </CardHeader>
                            <CardContent>
                                <Typography variant="subtitle1">
                                    You have no active tests. Start Creating.
                                </Typography>
                            </CardContent>
                            <CardActions style={styles.cardAction}>
                                <Button variant="contained" size="small" color="primary">View All</Button>
                            </CardActions>
                            
                        </Card>
                    </Grid>
                    <Grid item xs={1} sm={1} />
                    <Grid item xs={5} sm={5}>
                        <Card style={styles.card}>
                            <CardHeader title="MCQ Library" style={styles.cardHeader}>
                            </CardHeader>
                            <CardContent>
                                <Typography variant="subtitle1">
                                    You have 10 MCQs in library. Keep adding.
                                </Typography>
                            </CardContent>
                            <CardActions style={styles.cardAction}>
                                <Button variant="contained" size="small" color="primary">Start Adding</Button>
                            </CardActions>
                            
                        </Card>
                    </Grid>
                    <br></br><br></br>
                    <Grid item xs={5} sm={5} style={{marginTop: '5%'}}>
                        <Card style={styles.card}>
                            <CardHeader title="Candidates" style={styles.cardHeader}>
                            </CardHeader>
                            <CardContent>
                                <Typography variant="subtitle1">
                                    Your 2 candidates are yet to take test.
                                </Typography>
                            </CardContent>
                            <CardActions style={styles.cardAction}>
                                <Button variant="contained" size="small" color="primary">Go to Tests</Button>
                            </CardActions>
                            
                        </Card>
                    </Grid>
                    <Grid item xs={1} sm={1} />
                    <Grid item xs={5} sm={5} style={{marginTop: '5%'}}>
                        <Card style={styles.card}>
                            <CardHeader title="Skills" style={styles.cardHeader}>
                            </CardHeader>
                            <CardContent>
                                <Typography variant="subtitle1">
                                    You have defined 25 skill sets for your hiring. Keep it updated.
                                </Typography>
                            </CardContent>
                            <CardActions style={styles.cardAction}>
                                <Button variant="contained" size="small" color="primary">View All</Button>
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
const styles = {
    card: {
        textAlign: 'center'
    },
    cardAction: {
        float: 'right'
    },
    cardHeader: {
        borderBottom: '1px solid #3f51b5',
        // backgroundColor: '#3f51b5',
        color: '#fff'
    }
}