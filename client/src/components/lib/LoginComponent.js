import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import config from '../../config';
import axios from 'axios';
import AuthHelper from '../../AuthHelper';
import { SetUserInfo } from '../../actions/UserActions';
import { connect } from 'react-redux';

class LoginComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            errorMessage: ''
        };
    }
    googleResponse = (response) => {
        let url = config.instance.getAdminApiUrl() + 'auth/google';
        axios.get(url, {
          headers: {
            access_token: response.accessToken
          }
        }).then((res) => {
            console.log('res',res);
            const token = res.headers['x-auth-token'];
            if(token) {
                this.props.SetUserInfo(res);
                this.props.history.push({
                    pathname: '/dashboard'
                });
            } else {
                this.setState({
                    errorMessage: 'Wrong Credentials. Please try again.'
                });    
            }
        }).catch((err) => {
            if(this.props.history){ 
                this.props.history.push({
                    pathname: '/userForbidden'
                });
            }
        });
    }
    
    render = () => {
        return (
            <div style={styles.container}>
                {this.state.errorMessage && <div>{this.state.errorMessage}</div>}
                <GoogleLogin
                            clientId="350931387343-l9s3gs4fnmbj4rk4r4nfvh5siega0s5g.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.googleResponse}
                            onFailure={this.googleResponse}
                            cookiePolicy={'single_host_origin'}
                        />
            </div>
        );
    }
}
const styles = {
    container: {
        top: '20%',
        left: '25%'
    }
}
const mapStateToProps = state => ({
    ...state.userReducer
});
const mapDispatchToProps = dispatch => ({
    SetUserInfo: (userInfo) => dispatch(SetUserInfo(userInfo)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
