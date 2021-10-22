import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { CardHeader, CardContent, IconButton } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ListIcon from '@material-ui/icons/ViewHeadline';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField'
import Collapse from '@material-ui/core/Collapse';
import Remove from '@material-ui/icons/Remove';
import { formatToDecimals } from '../../Utils';

const RegisteredTestsList = (props) => {
        console.log('registeredTests',props.pendingTests);
        if(props.pendingTests && props.pendingTests.length === 0) {
            return(
                <div className="container mt-4">
                <Typography variant="h6" align="center">
                    No tests scheduled.
                </Typography>
                </div>
                )
        }
        return (
            <div className="card border-0">
                    <div className="card-body">
                        {props.pendingTests && props.pendingTests.map((testItem) => {
                            console.log('testitem: ', testItem);
                            return (
                                <div className="border-bottom">
                                    <div className="card-title text-center">
                                        {testItem.test_meta.testName}
                                    </div>
                                    <div className="row ml-4">
                                        <div className="col-md-3 font-weight-light">Grade</div>
                                        <div className="col-md-9">{testItem.test_meta.grade}</div>
                                    </div>
                                    <div className="row ml-4 mt-3">
                                        <div className="col-md-3 font-weight-light">Subject</div>
                                        <div className="col-md-9">{testItem.test_meta.subject}</div>
                                    </div>
                                    <div className="row ml-4 mt-3">
                                        <div className="col-md-3 font-weight-light">Questions</div>
                                        <div className="col-md-9">{testItem.test_meta.selectedMcqs.length}</div>
                                    </div>
                                    <div className="row ml-4 mt-3">
                                        <div className="col-md-3 font-weight-light">Duration</div>
                                        <div className="col-md-9">{testItem.test_meta.duration} Minutes</div>
                                    </div>
                                    {/* <div className="row">
                                        Created By: {testItem.user_meta.name}
                                    </div> */}
                                    <div className="mt-5 mb-4">
                                        {RegistrationButton(testItem, props.startRegisteredTest)}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                {/* </div> */}
            {/* </div> */}
        </div>
        );
}

const RegistrationButton = (testItem, startTestHandler) => {
    let st = new Date(`${testItem.scheduledStart}`);
        return (
            <>
                <div>
                    Scheduled for {`${st.getDate()}-${st.getMonth() + 1}-${st.getFullYear()} ${st.getHours()}:00`}
                </div>
                <hr />
                <div>
                    <button className="btn btn-primary"
                        onClick={() =>
                            startTestHandler(testItem.registrationId)
                        }>
                        Start
                    </button>
                </div>
            </>
        )
}

export default RegisteredTestsList;

const styles = {
    avatar: {
        backgroundColor: '#555'
    },
    formControl: {
        width: '70%'
    }
}