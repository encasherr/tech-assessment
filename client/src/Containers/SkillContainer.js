import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddSkillComponent from '../components/Skills/AddSkill';
import SkillList from '../components/Skills/SkillList';
import {    AddSkill, FetchSkills,
            CloseSnackbar, CurrentSkillFieldChange,
            OpenSnackbar,
            BeginSearch, SearchSkill } from '../actions/SkillActions';
import Grid from '@material-ui/core/Grid';
import SnackbarComponent from '../components/lib/SnackbarComponent';

class SkillContainer extends React.Component {

    componentDidMount = () => {
        console.log('did mount');
        this.reload();
    }

    componentWillUpdate = () => {
     console.log('container updated');
        if(this.props.success_message !== '') {
            this.props.FetchSkills();
        }
    }

    componentWillReceiveProps = (newprops, oldprops) => {
        console.log('receiving props');
        console.log(newprops);
        if(newprops.success_message !== '') {
            this.props.FetchSkills();
            this.props.OpenSnackbar();
        }
    }

    reload = () => {
        this.props.FetchSkills();
    }

    render = () => {
        console.log('container render');
        console.log(this.props);
        let skills = [];
        if(this.props.search_enabled) {
            skills = this.props.filteredSkills;
        }
        else {
            skills = this.props.skillList;
        }
        return(
            <Grid container spacing={16}>
                <Grid item xs={12} sm={6}>
                    <AddSkillComponent 
                        onSubmit={ (model) => this.props.AddSkill(model, this.props.editMode) }
                        model={this.props.current_skill}
                        onAdd={() => this.reload()}
                        onFieldChange={ (val, field, model) => this.props.CurrentSkillFieldChange(val, field, model) } />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SkillList skills={skills} 
                        onSearchEnable={ () => this.props.BeginSearch() } 
                        searchEnabled={this.props.search_enabled}
                        searchTerm={this.props.search_term}
                        onSearchSkill={ (searchTerm) => this.props.SearchSkill(searchTerm, this.props.skillList) }/>
                </Grid>
                <SnackbarComponent 
                    openSnack={this.props.snack_open} handleClose={() => this.props.CloseSnackbar()} 
                    snackMessage={"Data Saved Successfully!"} 
                    /> 
            </Grid>
        );
    }
}
const mapStateToProps = state => ({
    ...state.skillReducer
});
const mapDispatchToProps = dispatch => ({
    AddSkill: (model, editMode) => dispatch(AddSkill(model, editMode)),
    FetchSkills: () => dispatch(FetchSkills()),
    CloseSnackbar: () => dispatch(CloseSnackbar()),
    OpenSnackbar: () => dispatch(OpenSnackbar()),
    BeginSearch: () => dispatch(BeginSearch()),
    SearchSkill: (searchTerm, categoryList) => dispatch(SearchSkill(searchTerm, categoryList)),
    CurrentSkillFieldChange: (val, field, model) => dispatch(CurrentSkillFieldChange(val, field, model))
});
export default connect(mapStateToProps, mapDispatchToProps)(SkillContainer);