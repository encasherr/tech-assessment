import React from 'react';
import { Typography } from '@material-ui/core';
// import LoginComponent from '../../components/lib/LoginComponent';
// import LocalLoginComponent from '../../components/lib/LocalLoginComponent';

const UserForbidden = (props) => {

    return (
        <div>
            <Typography variant="h6" >
                User Forbidden or User Not Found. 
            </Typography>
            <Typography variant="subtitle1" >
                Please check with Admin if your emailId is added to user list. 
            </Typography>
            <div>
                {/* <LoginComponent /> */}
                {/* <LocalLoginComponent /> */}
            </div>
        </div>
    )
}
export default UserForbidden;