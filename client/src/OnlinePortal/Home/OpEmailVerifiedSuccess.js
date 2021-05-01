import React, { Component } from 'react';
import { Link } from '@material-ui/core';
import AuthHelper from '../../AuthHelper';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const OpEmailVerifiedSuccess = () => {
    return (
        <div>
            <div className="alert alert-success text-center">
                Email Id is verifed successfully. You can use your credentials to log in now. 
            </div>
            
            <div className="">
                <div className="text-center">
                    {/* <div className="card"> */}
                        {/* <div className="card-body"> */}
                            <Link color="inherit" href="/login" onClick={() => AuthHelper.LogOut()} >
                                LOG IN
                            </Link>
                        {/* </div> */}
                    {/* </div> */}
                </div>
            </div>

        </div>
    )
}
export default OpEmailVerifiedSuccess;