import React, { useState, useEffect } from "react";
import config from '../../config';
import axios from 'axios';
import { CardContent, FormControl, TextField, 
    FormLabel, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';

import { AddUser, CurrentUserFieldChange,
     } from '../../actions/UserActions';
import repository from '../../repository';

import { SiteTitle, SellingCurrency } from '../lib/landingPage/CommonLayout'

const OpSignup  = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [membershipType, setMembershipType] = useState('');
    const [signupButtonText, setSignupButtonText] = useState('SIGN UP');
    const [signupStatus, setSignupStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        config.instance.initialize();
    }, []);

    const validateInputs = () => {
        let errors = [];
        if(!name) {
            errors.push('Name is required');
        }
        if(!email) {
            errors.push('Email is required');
        }
        if(!password) {
            errors.push('Password is required');
        }
        if(!userType) {
            errors.push('Select either Student or Professional')
        }
        if(!membershipType) {
            errors.push('Select Membership Type')
        }
        if(name && name.length < 5) {
            errors.push('Please enter valid name');
        }
        if(email && !/\S+@\S+\.\S+/.test(email)) {
            errors.push('Please enter valid email id');
        }
        if(password && password.length < 6) {
            errors.push('Password length should be at least 6');
        }
        return errors;
    }

    const localHandler = (event) => {
        event.preventDefault()
        let errors = validateInputs();
        if(errors && errors.length > 0) {
            setErrorMessage(errors.join('\n'));
            return;
        }
        let data = {
            name: name,
            emailId: email,
            password: password,
            role: userType,
            membershipType: membershipType
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
                <h1 className="logo me-auto text-center"><a href="/home">{SiteTitle}</a></h1>
                <div className="row mt-5">
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
                        <div className="container bg-light">

                            <div className="signup-section">
                                <div className="row">
                                    <div className="col-md-6 signup-form">

                                        <form noValidate autoComplete="off" onSubmit={(e) => localHandler(e)}>
                                            <div className="row">
                                                <FormControl variant="outlined" className="col-md-12" >
                                                    <TextField
                                                        id="outlined-name"
                                                        label="Full Name"
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
                                            <div className="row">
                                                <FormControl className="col-md-12" variant="outlined">
                                                    {/* <FormLabel component="legend">Pop quiz: Material-UI is...</FormLabel> */}
                                                    <RadioGroup aria-label="quiz" name="quiz" value={userType} 
                                                                onChange={(e) => setUserType(e.target.value)}>
                                                        <FormControlLabel value="student" control={<Radio />} label="Student" />
                                                        <FormControlLabel value="candidate" control={<Radio />} label="Professional" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                            <div className="row mt-4">
                                                <button className="btn btn-primary btn-block" type="submit">
                                                    {signupButtonText}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-6 membership-form">
                                        <FormControl className="col-md-12" variant="outlined">
                                            {/* <FormLabel component="legend">Pop quiz: Material-UI is...</FormLabel> */}
                                            {console.log('membership:', membershipType)}
                                            <RadioGroup aria-label="quiz" name="quiz" value={membershipType} 
                                                        onChange={(e) => console.log('changed') }>
                                                <FormControlLabel onClick={() => setMembershipType('basic')} className={`list-group-item ${membershipType==='basic' ? 'selected' : ''}`} value="basic" 
                                                    control={<div className="row">
                                                                {/* <div className="col-md-2"><Radio /></div> */}
                                                                <div className="col-md-12">
                                                            <h4>Basic</h4> 
                                                            <h5>Free Plan. No Charges. Free Forever.</h5>
                                                            <ul>
                                                                <li>25 Exams per month</li>
                                                                <li>3 Candidates</li>
                                                            </ul>
                                                            </div>
                                                            </div>} />
                                                <FormControlLabel onClick={() => setMembershipType('premium')} className={`list-group-item ${membershipType==='premium' ? 'selected' : ''}`} value="premium" 
                                                    control={<div className="row">
                                                                {/* <div className="col-md-2"><Radio /></div> */}
                                                                <div className="col-md-12">
                                                            <h4>Premium</h4> 
                                                            <h5><span dangerouslySetInnerHTML={{ __html: SellingCurrency }}></span>&nbsp;1000<span> / month</span></h5>
                                                            <ul>
                                                                <li>500 Exams per month</li>
                                                                <li>1000 Candidates</li>
                                                            </ul>
                                                            </div>
                                                            </div>} />
                                                <FormControlLabel onClick={() => setMembershipType('ultimate')} className={`list-group-item ${membershipType==='ultimate' ? 'selected' : ''}`} value="ultimate" 
                                                    control={<div className="row">
                                                                {/* <div className="col-md-2"><Radio /></div> */}
                                                                <div className="col-md-12">
                                                                <h4>Unlimited</h4> 
                                                            <h5><span dangerouslySetInnerHTML={{ __html: SellingCurrency }}></span>&nbsp;5000<span> / month</span></h5>
                                                            <ul>
                                                                <li>Unlimited Exams per month</li>
                                                                <li>Unlimited Candidates</li>
                                                            </ul>
                                                            </div>
                                                            </div>} />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                        <pre className="col-md-12 text-danger">{errorMessage}</pre>
                        </div>

                    }
                    </div>
                </div>
            </div>
        );
}
export default OpSignup;