import React, { Component } from 'react';
import config from '../../config';
import axios from 'axios';
import AuthHelper from '../../AuthHelper';
import { SetUserInfo } from '../../actions/UserActions';
import { connect } from 'react-redux';
import { CardContent, FormControl, TextField, CardActions, Button, CardHeader } from '@material-ui/core';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class LocalLoginComponent extends Component {
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
        //url = 'http://localhost:3001/api/local';
        let data = {
            emailId: this.state.emailId,
            password: this.state.password
        }
        this.setState({
            logInButtonText: 'Working...'
        })
        axios.post(url, data).then((res) => {
            const token = res.headers['x-auth-token'];
            if (token) {
                this.props.SetUserInfo(res).then((res) => {
                    this.props.history.push({
                        pathname: '/dashboard'
                    });
                })
            } else {
                this.setState({
                    errorMessage: 'Wrong Credentials. Please try again.'
                });
            }
        }).catch((err) => {
            this.setState({
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
        let userInfo = AuthHelper.GetUserInfo();
        let { errorMessage, logInButtonText } = this.state;
        console.log('userinfo in login', userInfo);
        return (
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
                    {userInfo === null &&
                        <form noValidate autoComplete="off" onSubmit={(e) => this.localHandler(e)}>
                            {/* <CardHeader title="Login"
                                subheader={errorMessage}
                            >
                            </CardHeader> */}
                            <CardContent>
                            <div className="row">
                                <h2 className="col-md-12 text-center">Login</h2>
                            </div>
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
                                    <button className="btn btn-primary btn-block" type="submit"
                                            // onClick={() => this.localHandler()}
                                            >
                                                {logInButtonText}
                                    </button>
                                    </div>
                            </CardContent>
                            {/* <CardActions>
                                <div className="row">
                                <div className="col-md-12">
                                <button className="w-100 btn btn-primary btn-block" type="submit" 
                                        // onClick={() => this.localHandler()}
                                        >
                                            LOG IN
                                </button>
                                </div>
                                </div>
                            </CardActions> */}
                        </form>
                    }
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    ...state.userReducer
});
const mapDispatchToProps = dispatch => ({
    SetUserInfo: (userInfo) => dispatch(SetUserInfo(userInfo)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LocalLoginComponent);
