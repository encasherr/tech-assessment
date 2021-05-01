import axios from 'axios';
import config from '../config';
import repository from '../repository';

export const ADD_GRADE_SUCCESS = 'ADD_GRADE_SUCCESS';
export const ADD_GRADE_FAIL = 'ADD_GRADE_FAIL';
export const UPDATE_GRADE_SUCCESS = 'UPDATE_GRADE_SUCCESS';
export const UPDATE_GRADE_FAIL = 'UPDATE_GRADE_FAIL';
export const CURRENT_GRADE_FIELD_CHANGE = 'CURRENT_GRADE_FIELD_CHANGE';
export const FETCH_GRADES_SUCCESS = 'FETCH_GRADES_SUCCESS';
export const FETCH_GRADES_FAIL = 'FETCH_GRADES_FAIL';
export const SELECT_CURRENT_GRADE = 'SELECT_CURRENT_GRADE';
export const CURRENT_SUBJECT_CHANGE = 'CURRENT_SUBJECT_CHANGE';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';

export const SelectCurrentGrade = (current_grade) => dispatch => {
    console.log('select grade', current_grade);
    dispatch({
        type: SELECT_CURRENT_GRADE,
        payload: current_grade
    });
}

export const CurrentSubjectChange = (val, model) => dispatch => {
    model.subject = val;
    dispatch({
        type: CURRENT_SUBJECT_CHANGE,
        payload: model
    })
    console.log('subject model', model);
}

export const CurrentGradeFieldChange = (val, field, model) => dispatch => {
    
    if(!model.grade_meta) {
        model.grade_meta = {};
    }
    switch(field)
    {
        case 'name':
        {
            model.grade_meta.name = val;
            dispatch({
                type: CURRENT_GRADE_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'addsubject':
        {
            if(!model.grade_meta.subjects) {
                model.grade_meta.subjects = [];
            }
            else {
                let alreadyExistSubject = model.grade_meta.subjects.filter((sub) => {
                    return sub === val;
                })
                if(!(alreadyExistSubject && alreadyExistSubject.length > 0)){
                    model.grade_meta.subjects.push(val);
                }
            }
            model.subject = val;
            console.log('grade model', model);
            dispatch({
                type: CURRENT_GRADE_FIELD_CHANGE,
                payload: model
            });
            break;
        }
    }
}

export const AddGrade = (classModel) => dispatch => {
    return new Promise((resolve, reject) => {
        let url = config.instance.getAdminApiUrl() + 'grade';
        repository.saveData(url, classModel)
            .then((res) => {
                dispatch({
                    type: ADD_GRADE_SUCCESS,
                    payload: res.data
                });
                resolve(true);
            })
            .catch((err) => {
                dispatch({
                    type: ADD_GRADE_FAIL,
                    payload: err
                });
                reject(err);
            });
    })
}

export const UpdateGrade = (subjectModel, gradeModel) => dispatch => {
    return new Promise((resolve, reject) => {
        let url = config.instance.getAdminApiUrl() + 'grade';

        if(!gradeModel.grade_meta.subjects) {
            gradeModel.grade_meta.subjects = [];
        }
        else {
            let alreadyExistSubject = gradeModel.grade_meta.subjects.filter((sub) => {
                return sub === subjectModel.subject;
            })
            if(!(alreadyExistSubject && alreadyExistSubject.length > 0)){
                gradeModel.grade_meta.subjects.push(subjectModel.subject);
            }
        }

        repository.updateData(url, gradeModel)
            .then((res) => {
                dispatch({
                    type: UPDATE_GRADE_SUCCESS,
                    payload: res.data
                });
                resolve(true);
            })
            .catch((err) => {
                dispatch({
                    type: UPDATE_GRADE_FAIL,
                    payload: err
                });
                reject(err);
            });
    })
}

export const FetchGrades = () => dispatch => {
    return new Promise((resolve, reject) => {
        let url = config.instance.getAdminApiUrl() + 'getAllGrades';
        repository.getData(url)
            .then((res) => {
                dispatch({
                    type: FETCH_GRADES_SUCCESS,
                    payload: res.data
                });
                resolve(res.data[0]);
            })
            .catch((err) => {
                dispatch({
                    type: FETCH_GRADES_FAIL,
                    payload: err
                });
                reject(err);
            });

    })
}

export const CloseSnackbar = () => dispatch => {
    dispatch({
        type: CLOSE_SNACKBAR
    });
}
export const OpenSnackbar = () => dispatch => {
    dispatch({
        type: OPEN_SNACKBAR
    });
}
