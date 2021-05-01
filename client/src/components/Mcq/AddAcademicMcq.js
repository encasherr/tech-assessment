import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import AddAnswerOptionComponent from './AddAnswerOption';
import LoadingComponent from '../lib/LoadingComponent';
// import { JForm } from 'jsonbasedui';

const AddAcademicMcq = (props) => {
    let { model, editMode } = props;

    return (
        <div className="card bg-default">
            <div className="card-header">
                Add MCQ
            </div>
            <div className="card-body">
                {/* {!model && <LoadingComponent />}  */}
                {/* <div className="row"> */}
                {model && model.mcq_meta &&   
                <form  noValidate autoComplete="off">
                    <div className="form-group row">
                        <label className="col-md-3 col-form-label">Category</label>
                        <div className="col-md-9">
                            <input  type="text" 
                                    className="form-control"
                                    disabled
                                    value={'Academic'}
                                />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 col-form-label">Topic</label>
                        <div className="col-md-9">
                            <input  type="text" 
                                    className="form-control"
                                    value={model.mcq_meta.question}
                                    onChange={(e) => props.onFieldChange(e.target.value, 'question', props.model)}
                                />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="inputEmail3" className="col-md-3 col-form-label">Skill</label>
                        <div className="col-md-9">
                        <select class="form-control" 
                                value={model.mcq_meta.skill}
                                onChange={(e) => props.onFieldChange(e.target.value, 'skill', props.model)}
                            >
                            {props.skills && props.skills.map((skillItem, index) => {
                                    let item = skillItem.skill_meta;
                                    return <option key={index} value={item.skill}>{item.skill}</option>
                            })}
                        </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 col-form-label">Question</label>
                        <div className="col-md-9">
                            <Editor
                                editorState={props.questionEditorState}
                                toolbarClassName="toolbar-class"
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                onEditorStateChange={props.onQuestionEditorStateChange}
                            />
                        </div>
                    </div>
                    <AddAnswerOptionComponent>
                        {props}
                    </AddAnswerOptionComponent>
                </form>
                }
                </div>
            {/* </div> */}
        </div>
    );
}

export default AddAcademicMcq;