import React, { Component } from 'react';
const OpTestList = (props) => {

    let { tests } = props;
    let upcomingExams = tests;

    return (
        <div className="container">
            <div className="row">
                {upcomingExams && upcomingExams.length > 0 &&
                    upcomingExams.map((upcomingExam) => {
                        return (
                    <div className="col-md-6 mt-3">
                        <div className="card">
                            <div className="card-header bg-secondary text-light">
                                <h5>{upcomingExam.test_meta.testName}</h5>
                            </div>
                            <div className="card-body">
                                <p>{upcomingExam.test_meta.skill}</p>
                                <div className="float-right">
                                    <button 
                                        onClick={(e) => props.onRegisterClick(e, upcomingExam.testId)}
                                        className="btn btn-sm btn-primary ">
                                        Register
                                    </button>
                                </div>
                            </div>
                            <div className="card-footer bg-light text-dark">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <span className="badge">{upcomingExam.test_meta.startsAt}</span>
                                        </div>
                                        <div className="col-md-6">
                                            <span className="badge">Duration:</span> <span className="badge">{upcomingExam.test_meta.duration}</span> mins
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                        );
                    })
                    }
            </div>
        </div>
    )
}
export default OpTestList;