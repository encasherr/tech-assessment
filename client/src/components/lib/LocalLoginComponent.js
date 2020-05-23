import React, { Component } from 'react';
import config from '../../config';
import axios from 'axios';
import AuthHelper from '../../AuthHelper';
import { SetUserInfo } from '../../actions/UserActions';
import { connect } from 'react-redux';
import { CardContent, FormControl, TextField, CardActions, Button, CardHeader } from '@material-ui/core';

class LocalLoginComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            emailId: '',
            password: '',
            errorMessage: ''
        };
    }

    componentDidMount = () => {
        config.instance.initialize();
    }

    localHandler = () => {
        let url = config.instance.getAdminApiUrl() + 'auth/local';
        //url = 'http://localhost:3001/api/local';
        let data = {
            emailId: this.state.emailId, 
            password: this.state.password
        }
        axios.post(url, data).then((res) => {
            const token = res.headers['x-auth-token'];
            if(token) {
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
        let { errorMessage } = this.state;
        console.log('userinfo in login', userInfo);
        return (
            <div>
                {userInfo === null && 
                <form  noValidate autoComplete="off">
                    <CardHeader title="Login"
                    subheader={errorMessage}
                    >
                    </CardHeader>
                    <CardContent>
                        <FormControl variant="outlined">
                            <TextField
                                label="Email Id"
                                value={this.state.emailId}
                                onChange={(e) => this.onEmailIdChange(e.target.value)}
                                margin="normal"
                                variant="outlined" />
                                
                            <TextField
                                label="Password"
                                type="password"
                                value={this.state.password}
                                onChange={(e) => this.onPasswordChange(e.target.value)}
                                margin="normal"
                                variant="outlined" />
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" size="large" color="primary"
                            onClick={() => this.localHandler()}>
                            Login
                        </Button>
                    </CardActions>
                </form>
                }
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
