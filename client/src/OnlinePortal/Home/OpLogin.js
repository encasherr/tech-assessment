import React, { Component } from "react";
// import { withRouter } from 'react-router-dom';
import config from '../../config';
import axios from 'axios';
import { CardContent, FormControl, TextField, CardActions, Button, CardHeader } from '@material-ui/core';
import { GetCurrentUserRole } from "../../common/HelperFunctions";
import AuthHelper from "../../AuthHelper";
import { connect } from 'react-redux';
import { SetUserInfo } from '../../actions/UserActions';

class OpLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            password: '',
            errorMessage: '',
            logInButtonText: 'LOG IN'
        };
    }

    componentDidMount = () => {
        config.instance.initialize();
    }

    localHandler = (event) => {
        event.preventDefault()

        let url = config.instance.getAdminApiUrl() + 'auth/local';
        let data = {
            emailId: this.state.emailId,
            password: this.state.password
        }
        this.setState({
            logInButtonText: 'Working...'
        })
        axios.post(url, data).then((res) => {
            const token = res.headers['x-auth-token'];
            console.log('login token', token);
            if (token) {
                this.props.SetUserInfo(res).then((res) => {
                    let userRole = GetCurrentUserRole();
                    console.log('user role', userRole);
                    if(userRole === 'admin' || userRole === 'orgadmin') {
                        if(this.props.history){
                            this.props.history.push({
                                pathname: '/dashboard'
                            });  
                        }
                    }
                    else if(userRole === config.instance.Roles.Student) {
                        this.props.history.push({
                            pathname: '/ophome'
                        });
                    }
                    else if(userRole === config.instance.Roles.Teacher) {
                        this.props.history.push({
                            pathname: '/dashboard'
                        });
                    }
                    else {
                        this.props.history.push({
                            pathname: '/ophome'
                        });
                    }
                })
            } else {
                this.setState({
                    logInButtonText: 'LOG IN',
                    errorMessage: 'Wrong Credentials. Please try again.'
                });
            }
        }).catch((err) => {
            this.setState({
                    logInButtonText: 'LOG IN',
                    errorMessage: 'Invalid Credentials. Please check entered email and enter correct password.'
            });
        });
    }

    onEmailIdChange = (value) => {
        this.setState({
            emailId: value
        });
    }

    onPasswordChange = (value) => {
        this.setState({
            password: value
        });
    }
    
    render = () => {
        let { errorMessage, logInButtonText } = this.state;
        return (
            <div>
                <div className="row">
                    {/* <div className="col-md-5">

                    </div> */}
                    <div className="col-md-12">
                        <form noValidate autoComplete="off" onSubmit={(e) => this.localHandler(e)}>
                            <div className="card">
                            <div className="card-body">
                                {/* <div className="row">
                                    <h2 className="col-md-12 text-center">Login</h2>
                                </div> */}
                                <div className="row">
                                    <FormControl className="col-md-12" variant="outlined">
                                        <TextField
                                            label="Email Id"
                                            value={this.state.emailId}
                                            onChange={(e) => this.onEmailIdChange(e.target.value)}
                                            margin="normal"
                                            variant="outlined"
                                            className="text-lg"
                                        />
                                    </FormControl>
                                </div>
                                <div className="row">
                                    <FormControl className="col-md-12" variant="outlined">
                                        <TextField
                                            label="Password"
                                            type="password"
                                            value={this.state.password}
                                            onChange={(e) => this.onPasswordChange(e.target.value)}
                                            margin="normal"
                                            variant="outlined" />
                                    </FormControl>
                                </div>
                                <div className="row mt-4">
                                    <button className="btn btn-primary btn-block" type="submit">
                                        {logInButtonText}
                                    </button>
                                </div>
                            </div>
                            </div>

                        </form>
                    </div>
                    <p className="col-md-12 text-center text-danger">{errorMessage}</p>
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(OpLogin);