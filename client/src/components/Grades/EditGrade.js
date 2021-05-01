import React, { Component } from 'react';
import { Chip, Avatar } from '@material-ui/core';

const EditGrade = (props) => {

    console.log('props.current_subject', props.current_subject);
    return (
        <>
            <div className="card bg-default">
                <div className="card-header">
                    {props.grade_meta && props.grade_meta.name && 
                       <p><span className="font-weight-bold">Grade {props.grade_meta.name}</span> Subjects</p>
                    }
                    {!props.grade_meta && <p>Select Grade to View/Add Subjects</p>}
                </div>
                <div className="card-body">
                   
                            <div className="form-group row">
                                {/* <label className="col-md-3 col-form-label">Subject</label> */}
                                <div className="col-md-9">
                                    <input  type="text" 
                                            disabled={!(props.grade_meta && props.grade_meta.name)}
                                            className="form-control"
                                            value={props.current_subject && props.current_subject.subject ?
                                                props.current_subject.subject : ''}
                                            onChange={(e) => props.onFieldChange(e.target.value, 'subject')}
                                        />
                                </div>
                                <div className="col-md-3">
                                    <button  className="btn btn-primary btn-sm" type="button" 
                                                onClick={ () => props.onAddSubject(props.current_subject) }>
                                        Add
                                    </button>
                                </div>
                            </div>
                    <div className="row">
                        {props.grade_meta && props.grade_meta.subjects && props.grade_meta.subjects.length === 0 &&
                        <div className="alert alert-info">No subjects added yet for this class</div>
                        }
                        {props.grade_meta && props.grade_meta.subjects && props.grade_meta.subjects.length > 0 &&
                        props.grade_meta.subjects.map((subjectItem, index) => {
                            return (
                                <>
                                    <Chip label={subjectItem} key={index}
                                        style={styles.chip}
                                        avatar={
                                            <Avatar>
                                                {subjectItem ? subjectItem[0] : 'S'}
                                            </Avatar>   
                                        }/>
                                </>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

const styles = {
    chip: {
        margin: 10
    }
}
export default EditGrade;