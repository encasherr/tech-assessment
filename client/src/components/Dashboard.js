import React, { Component } from 'react';
import AuthHelper from '../AuthHelper';
import { connect } from 'react-redux';
import { SetUserInfo } from '../actions/UserActions';
import { Card, CardHeader, CardContent, Typography, CardActions, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    componentDidMount = () => {
        AuthHelper.SetHistory(this.props.history);
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
                                <Link to="/testConsole" >
                                    <Button size="small" variant="contained" color="primary">Add New</Button>
                                </Link>
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
                                <Link to="/addMcq" >
                                    <Button size="small" variant="contained" color="primary">Add New</Button>
                                </Link>
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
                                <Link to="/tests" >
                                    <Button size="small" variant="contained" color="primary">View</Button>
                                </Link>
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
                                    25 skills in your library
                                </Typography>
                            </CardContent>
                            <CardActions style={styles.cardAction}>
                                <Link to="/skills" >
                                    <Button size="small" variant="contained" color="primary">View</Button>
                                </Link>
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
        color: '#fff'
    }
}