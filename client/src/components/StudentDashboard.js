import React, { Component } from 'react';
import {
    Book, Assessment, ViewQuilt, PermIdentity, Polymer, Airplay,
    SupervisorAccount, Work, Launch
} from '@material-ui/icons';
import LoadingComponent from '../components/lib/LoadingComponent';
import { getDateTime, getNextAvailableTimeSlots, sortDescending } from '../Utils';
import { Link as InternalLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const StudentDashboard = (props) => {
    if (props.upcomingTests) {
        let upcomingTests = props.upcomingTests;
        if(upcomingTests.length === 0) {
            return(
                <div className="container mt-4">
                <Typography variant="h6" align="center">
                    No upcoming tests.
                </Typography>
                </div>
                )
        }
        return (
            <div className="">
                <div className="">
                    <TestsList
                      title="Upcoming Tests" 
                      tests={upcomingTests}
                      registerForTest={props.registerForTest} 
                    />
                </div>
                {/* <div className="mt-4">
                    <TestsList
                      title="Registered Tests" 
                      tests={registeredTests}
                      startRegisteredTest={props.startRegisteredTest}
                    />
                </div> */}
            </div>
        )
    }
    return(
        <LoadingComponent />
    )
}

const TestsList = (props) => {
    return (
        <div className="card border-0">
                    <div className="card-body">
                        {props.tests && props.tests.map((testItem) => {
                            console.log('testitem: ', testItem);
                            return (
                                <div className="border-bottom">
                                    <div className="card-title text-center">
                                        <h5>{testItem.test_meta.testName}</h5>
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
                                    <div className="row ml-4 mt-3">
                                        <div className="col-md-3 font-weight-light">Created By</div>
                                        <div className="col-md-9">{testItem.user_meta.name}</div>
                                    </div>
                                    <div className="mt-5 mb-4">
                                        {RegistrationButton(testItem, props.registerForTest, props.startRegisteredTest)}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
         </div>
    )
}

const RegistrationButton = (testItem, registerForTestHandler, startTestHandler) => {
    if (testItem.registrationStatus && testItem.registrationStatus === "Registered") {
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
    if (testItem.registrationStatus && testItem.registrationStatus === "Completed") {
        let st = new Date(testItem.modifiedOn);
        return (
            <>
                <div>
                    Test Completed on {st.getFullYear()} - {st.getMonth() + 1} - {st.getDate()}
                </div>
            </>
        )
    }
    return (
        <>
        <div className="card text-secondary">
            <div className="card-body text-center">
            <div>Register by selecting your preferable time slot to start this test</div>
            {availableSlots().map((slot) => {
                let model = { testId: testItem.id, scheduledStart: slot };
                return (
                        <button className="btn btn-secondary mt-3 ml-3"
                            onClick={() =>
                                registerForTestHandler(model)
                            }>
                            {slot}
                        </button>
                )
            })}
            </div>
        </div>
        </>
    )
}

const availableSlots = () => {
    return getNextAvailableTimeSlots();
}

const styles = {
    dashboardPanel: {
        minHeight: '300px'
    }
}

export default StudentDashboard;