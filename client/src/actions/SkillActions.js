import axios from 'axios';
import config from '../config';

export const ADD_SKILL_BEGIN = 'ADD_SKILL_BEGIN';
export const ADD_SKILL_SUCCESS = 'ADD_SKILL_SUCCESS';
export const ADD_SKILL_FAIL = 'ADD_SKILL_FAIL';
export const SKILL_SEARCH_BEGIN = 'SKILL_SEARCH_BEGIN';
export const SKILL_SEARCH_SUCCESS = 'SKILL_SEARCH_SUCCESS';
export const CURRENT_SKILL_FIELD_CHANGE = 'CURRENT_SKILL_FIELD_CHANGE';
export const CURRENT_SKILL_FIELD_CHANGE_END = 'CURRENT_SKILL_FIELD_CHANGE_END';
export const FETCH_SKILLS_BEGIN = 'FETCH_SKILLS_BEGIN';
export const FETCH_SKILLS_SUCCESS = 'FETCH_SKILLS_SUCCESS';
export const FETCH_SKILLS_FAIL = 'FETCH_SKILLS_FAIL';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';

export const CurrentSkillFieldChange = (val, field, model) => dispatch => {
    switch(field)
    {
        case 'skill':
        {
            model.skill = val;
            dispatch({
                type: CURRENT_SKILL_FIELD_CHANGE,
                payload: model
            });
            break;
        }
    }
    dispatch({
        type: CURRENT_SKILL_FIELD_CHANGE_END
    });
}

export const AddSkill = (skillModel) => dispatch => {
    dispatch({
        type: ADD_SKILL_BEGIN
    });
    let url = config.adminApiUrl + 'skill';
    console.log('action model');
    console.log(skillModel);
    axios.post(url, skillModel)
        .then((res) => {
            console.log('skill saved: ' + res);
            dispatch({
                type: ADD_SKILL_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: ADD_SKILL_FAIL,
                payload: err
            });
        });

}

export const BeginSearch = () => dispatch => {
    dispatch({
        type: SKILL_SEARCH_BEGIN
    });
}

export const SearchSkill = (searchTerm, skillList) => dispatch => {
    console.log(`search term: ${searchTerm}, list length: ${skillList ? skillList.length : 0}`);
    if(skillList && skillList.length > 0) {
        let filteredSkills = skillList.filter((item) => {
            return (
                    item.skill &&
                    item.skill.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
                    );
        });
        if(filteredSkills && filteredSkills.length > 0) {
            dispatch({
                type: SKILL_SEARCH_SUCCESS,
                payload: {
                    filteredSkills,
                    searchTerm
                }
            });
        }
        else {
            dispatch({
                type: SKILL_SEARCH_SUCCESS,
                payload: {
                    filteredSkills: [],
                    searchTerm
                }
            });
        }
    }
    else {
        dispatch({
            type: SKILL_SEARCH_SUCCESS,
            payload: {
                filteredSkills: [],
                searchTerm
            }
        });
    }
}

export const FetchSkills = () => dispatch => {
    dispatch({
        type: FETCH_SKILLS_BEGIN
    });
    let url = config.adminApiUrl + 'getAllSkills';
    axios.get(url)
        .then((res) => {
            console.log('skills fetched');
            dispatch({
                type: FETCH_SKILLS_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_SKILLS_FAIL,
                payload: err
            });
        });
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
