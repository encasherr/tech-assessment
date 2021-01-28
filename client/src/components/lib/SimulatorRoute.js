import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthHelper from '../../AuthHelper';

const SimulatorRoute = ({ component: Component, authed, ...rest}) => {
    console.log('rest0', rest);
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
export default SimulatorRoute;