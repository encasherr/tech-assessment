import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authed, ...rest}) => {
    return (
        <Route 
            {...rest}
            render={(props) => isLoggedIn() === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login'}} />}
        />
    );
}
const isLoggedIn = () => {
    let token = localStorage.getItem('auth-token');
    if(token) {
        return true;
    }
    return false;
}
export default PrivateRoute;