import React, { Component } from 'react';
import AdminTestContainer from '../../Containers/AdminTestContainer';
import OpTestContainer from '../Tests/OpTestContainer';

const OpContent = (props) => {

    return (
        <OpTestContainer {...props}/>
    )

    return (
        <div className="container">
            <div className="row">
                   {upcomingExams && upcomingExams.length > 0 &&
                    upcomingExams.map((upcomingExam) => {
                        return (
                    <div className="col-md-6 mt-3">
                        <div className="card">
                            <div className="card-header bg-secondary text-light">
                                <h5>{upcomingExam.name}</h5>
                            </div>
                            <div className="card-body">
                                <p>{upcomingExam.description}</p>
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
                                            <span className="badge">{upcomingExam.startsAt}</span>
                                        </div>
                                        <div className="col-md-6">
                                            <span className="badge">Duration:</span> <span className="badge">{upcomingExam.duration}</span> mins
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
    );
}
export default OpContent;

const upcomingExams = [
    {
        testId: 1,
        name: 'Science',
        description: 'Semester 2 exam chapters 14-20',
        startsAt: '2021-02-04 08:30',
        endsAt: '2021-02-04 10:30',
        duration: 120
    },
    {
        testId: 2,
        name: 'Science',
        description: 'Semester 2 exam chapters 14-20',
        startsAt: '2021-02-04 08:30',
        endsAt: '2021-02-04 10:30',
        duration: 120
    },
    {
        testId: 3,
        name: 'Science',
        description: 'Semester 2 exam chapters 14-20',
        startsAt: '2021-02-04 08:30',
        endsAt: '2021-02-04 10:30',
        duration: 120
    },
    {
        testId: 4,
        name: 'Science',
        description: 'Semester 2 exam chapters 14-20',
        startsAt: '2021-02-04 08:30',
        endsAt: '2021-02-04 10:30',
        duration: 120
    },
    {
        testId: 5,
        name: 'Science',
        description: 'Semester 2 exam chapters 14-20',
        startsAt: '2021-02-04 08:30',
        endsAt: '2021-02-04 10:30',
        duration: 120
    },
    {
        testId: 6,
        name: 'Science',
        description: 'Semester 2 exam chapters 14-20',
        startsAt: '2021-02-04 08:30',
        endsAt: '2021-02-04 10:30',
        duration: 120
    },
    {
        testId: 7,
        name: 'Science',
        description: 'Semester 2 exam chapters 14-20',
        startsAt: '2021-02-04 08:30',
        endsAt: '2021-02-04 10:30',
        duration: 120
    },
    {
        testId: 8,
        name: 'Science',
        description: 'Semester 2 exam chapters 14-20',
        startsAt: '2021-02-04 08:30',
        endsAt: '2021-02-04 10:30',
        duration: 120
    }
]