import React, { useState, useEffect } from "react";
import config from '../../config';
import axios from 'axios';
import { CardContent, FormControl, TextField, CardActions, Button, CardHeader } from '@material-ui/core';

import { AddUser, CurrentUserFieldChange,
     } from '../../actions/UserActions';
import repository from '../../repository';

const OpInstituteSignup  = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupButtonText, setSignupButtonText] = useState('SIGN UP');
    const [signupStatus, setSignupStatus] = useState('');

    useEffect(() => {
        config.instance.initialize();
    }, []);

    const localHandler = (event) => {
        event.preventDefault()

        let data = {
            name: name,
            emailId: email,
            password: password,
            role: config.instance.Roles.Teacher
        }
        setSignupButtonText('Working..');
        let model ={
            user_meta: data
        };
        let url = config.instance.getCandidateApiUrl() + 'user';
        repository.saveData(url, model)
                .then((res) => {
                    setSignupStatus('success');
                })
                .catch((err) => {
                    setSignupStatus(err);
                    setSignupButtonText('SIGN UP')
                });
    
    }

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                    {signupStatus && signupStatus === 'success' &&
                        <div className="alert alert-success">
                            Submitted successfully. Please check your email id and complete the registration. 
                        </div>
                    }
                    {signupStatus !== '' && signupStatus !== 'success' &&
                        <div className="alert alert-danger">
                            Some error occurred. Please try after some time.
                        </div>
                    }
                    {signupStatus !== 'success' &&
                        <div className="card">
                        <div className="card-body">
                            <form noValidate autoComplete="off" onSubmit={(e) => localHandler(e)}>
                                {/* <div className="row">
                                    <h2 className="col-md-12 text-center">Sign Up</h2>
                                </div> */}
                                <div className="row">
                                    <FormControl variant="outlined" className="col-md-12" >
                                        <TextField
                                            id="outlined-name"
                                            label="Your Name / Institute Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </FormControl>
                                </div>
                                <div className="row">
                                    <FormControl className="col-md-12" variant="outlined">
                                        <TextField
                                            label="Email Id"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            margin="normal"
                                            variant="outlined"
                                            className="text-lg"
                                        />
                                    </FormControl>
                                </div>
                                <div className="row">
                                    <FormControl className="col-md-12" variant="outlined">
                                        <TextField
                                            label="Password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            margin="normal"
                                            variant="outlined" />
                                    </FormControl>
                                </div>
                                <div className="row mt-4">
                                    <button className="btn btn-primary btn-block" type="submit">
                                        {signupButtonText}
                                    </button>
                                </div>
                                </form>
                            </div>
                        </div>

                    }
                    </div>
                </div>
            </div>
        );
}
export default OpInstituteSignup;