import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import AuthHelper from '../../AuthHelper';
import RedirectFromAction from '../../actions/RedirectFromAction';
import config from '../../config';

/*
const PrivateRoute = ({ component: Component, authed, ...rest}) => {
    console.log('isauth', isAuthorized());
    return (
        <Route 
            {...rest}
            render={(props) => isAuthorized() === true
                ? <Component {...rest} {...props} />
                : <Redirect to={{pathname: '/login'}} />}
        />
    );
}

const isAuthorized = () => {
    let token = localStorage.getItem('auth-token');
    if(token) {
        return true;
    }
    return false;
}
*/

class PrivateRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isCheckingToken: true,
            isUserAuthorized: false
        }
        
        // this.componentDidMountDummy();

        config.instance.initialize()
            .then((res) => {
                console.log('config initialized in private ', res);
                if(res){
                    this.setState({
                        isCheckingToken: false,
                        isUserAuthorized: true
                    })
                }
            })
            .catch((err) => {
                // alert('err in shell');
                this.setState({
                    isCheckingToken: false,
                    isUserAuthorized: false
                })
            })
    }

    componentDidMountDummy = () => {
        let token = localStorage.getItem('auth-token');
        
        if(token) {
            validateToken(token)
                .then((res) => {
                    if(res === true) {
                        this.setState({
                            isCheckingToken: false,
                            isUserAuthorized: true
                        })
                    }
                    else {
                        this.setState({
                            isCheckingToken: false,
                            isUserAuthorized: false
                        })
                    }
                })
                .catch((err) => {
                    this.setState({
                        isCheckingToken: false,
                        isUserAuthorized: false
                    })
                })
        }   
    }

    render = () => {

        return (
            <Route 
                render={() => this.state.isUserAuthorized === true
                    ? <this.props.component {...this.props} />
                    : <Redirect to={{pathname: '/login'}} />}
            />
        )
    }
}

const validateToken = (token) => {
    return new Promise((resolve, reject) => {

        let domain = 'http://localhost:3001';
        let apiUrl = this.isdevEnv() ? domain : '';
        let url = apiUrl + '/api/validateUserToken';
        
        let options = {
            headers: {
            "x-access-token": token
            }
        };

        axios.get(url, options)
            .then((res) => {
                console.log('res', res);
                if(res.status === 401) {
                    console.log('in resolve not authorized error received');
                    reject(res);
                    return;
                }
                resolve(res);
            })
            .catch((err) => {
                console.log('err', err);
                if(err.data && err.data.message === 'Invalid token.') {
                    AuthHelper.LogOut();
                    // RedirectFromAction('userForbidden');
                    // AuthHelper.LogOut();
                    // RedirectFromAction('login');
                }
                reject(err);
            })
    })
}

const isdevEnv = () => {
    let locationHref = window.location.href;
    return (locationHref.indexOf('localhost:3000') > -1 ||
            locationHref.indexOf('localhost:3001') > -1);
}

export default PrivateRoute;