import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import AuthHelper from '../../AuthHelper';

const OnlinePortalPrivateRoute = ({ component: Component, authed, ...rest}) => {

    return (
        <Route 
            {...rest}
            render={(props) => isAuthorized() === true
                ? <Component {...rest} {...props} />
                : <Redirect to={{pathname: '/op/login'}} />}
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
export default OnlinePortalPrivateRoute;