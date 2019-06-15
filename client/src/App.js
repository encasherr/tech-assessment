import React, { Component } from 'react';
// import logo from './logo.svg';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

import Shell from './components/Shell';
import './App.css';

import { Provider } from "react-redux";
import configureStore from "./store";
import config from './config';
import AuthHelper from './AuthHelper';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true,
      user: {},
      token: ''
    };
  }


  googleResponse = (response) => {
    console.log('response', response);
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    const options = {
        method: 'POST',
        body: tokenBlob,
        mode: 'cors',
        cache: 'default'
    };
    let url = config.adminApiUrl + 'auth/google';
    axios.getData(url, {
      headers: {
        access_token: response.accessToken
      }
    }).then((res) => {
      console.log('res',res);
      const token = res.headers['x-auth-token'];
      localStorage.setItem("auth-token", token);
      this.setState({
        isAuthenticated: true,
        user: res.data.displayName
      });
    });
    // axios.post(url, tokenBlob)
    //       .then(r => {
    //         console.log('internal server response', r);
    //         const token = r.headers.get('x-auth-token');
    //         r.json().then(user => {
    //             if (token) {
    //                 this.setState({
    //                   isAuthenticated: true, 
    //                   user, 
    //                   token
    //                 });
    //             }
    //         });
    //       });
  };
/*
client_id="350931387343-l9s3gs4fnmbj4rk4r4nfvh5siega0s5g.apps.googleusercontent.com",
client_secret="nMaeSsEr8e9-j26dstZ6VAJc"
*/
  render() {
    const { isAuthenticated } = this.state;
    return (
      <Provider store={configureStore()}>
      {/* {isAuthenticated && <div>Logged In</div>} */}
      {!isAuthenticated && 
      <GoogleLogin
                        clientId="350931387343-l9s3gs4fnmbj4rk4r4nfvh5siega0s5g.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.googleResponse}
                        onFailure={this.googleResponse}
                        cookiePolicy={'single_host_origin'}
                    />
      }
      {isAuthenticated && <Shell /> }
      </Provider>
    );
  }
}

export default App;
