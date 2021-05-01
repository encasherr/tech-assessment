import React from 'react';

import Home from '../Home';

import OnlinePortalPrivateRoute from './OnlinePortalPrivateRoute';

const OnlinePortalRoutes = (props) => {
    return (
        <div>
            <OnlinePortalPrivateRoute path="/home" component={Home} />
        </div>
    );
}

export default OnlinePortalRoutes;