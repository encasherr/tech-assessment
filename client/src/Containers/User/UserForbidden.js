import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import LoginComponent from '../../components/lib/LoginComponent';

const UserForbidden = (props) => {

    return (
        <div>
            <Typography variant="h6" >
                User Forbidden or User Not Found. 
            </Typography>
            <Typography variant="body1" >
                Please check with Admin if your emailId is added to user list. 
            </Typography>
            <div>
                <LoginComponent />
            </div>
        </div>
    )
}
export default UserForbidden;