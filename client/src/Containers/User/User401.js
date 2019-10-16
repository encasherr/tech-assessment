import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import LoginComponent from '../../components/lib/LoginComponent';

const User401 = (props) => {

    return (
        <div>
            <Typography variant="h2">
                User Not Authorized
            </Typography>
            <div>
                <LoginComponent />
            </div>
        </div>
    )
}
export default User401;