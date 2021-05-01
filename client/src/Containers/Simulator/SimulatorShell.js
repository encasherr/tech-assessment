import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import config from '../../config';
import axios from 'axios';
import AuthHelper from '../../AuthHelper';
import { Grid } from '@material-ui/core';

import { SetUserInfo } from '../../actions/UserActions';

import Faq from '../../components/Simulator/Faq';
import WelcomeCandidate from '../../components/Simulator/WelcomeCandidate';

// const useStyles = makeStyles(theme => ({
const classes = {
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 2,
    },
    title: {
        flexGrow: 1,
    },
};

class SimulatorShell extends Component {

    localHandler = (invitationId) => {
        let url = config.instance.getCandidateApiUrl() + 'auth/local';
        let data = {
            invitationId: invitationId
        }
        axios.post(url, data).then((res) => {
            const token = res.headers['x-auth-token'];
            if (token) {
                this.props.SetUserInfo(res)
                    .then((result) => {
                        this.props.history.push('/startTest/' + invitationId);
                    })
            } else {
                this.setState({
                    errorMessage: 'Candidate not registered. Please try again after some time. If this continues, please check with your recruiter.'
                });
            }
        }).catch((err) => {
            if (this.props.history) {
                this.props.history.push({
                    pathname: '/userForbidden'
                });
            }
        });
    }

    render = () => {
        let { inviteid } = this.props.match.params;

        if (inviteid) {
            return (
                <div>
                    <Grid container spacing={16}>
                        <Grid item xs={12} sm={12} md={6}>
                            <WelcomeCandidate />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Faq />
                            <Button type="button" variant="contained"
                                color="primary" size="large" onClick={() => this.localHandler(inviteid)}>Start Test</Button>
                        </Grid>
                    </Grid>
                </div>
            );
        }
        else {
            return (
                <div>
                    Page you are trying to open could not be found. Please check with your recruiter.
          </div>
            )
        }
    }
}


const mapStateToProps = state => ({
    ...state.userReducer
});
const mapDispatchToProps = dispatch => ({
    SetUserInfo: (userInfo) => dispatch(SetUserInfo(userInfo)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SimulatorShell);