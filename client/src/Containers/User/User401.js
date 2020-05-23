import React from 'react';
import { Typography } from '@material-ui/core';
import LoginComponent from '../../components/lib/LoginComponent';
import LocalLoginComponent from '../../components/lib/LocalLoginComponent';

const User401 = (props) => {

    return (
        <div>
            <Typography variant="h2">
                User Not Authorized
            </Typography>
            <div>
                {/* <LoginComponent /> */}
                <LocalLoginComponent />
            </div>
        </div>
    )
}
export default User401;