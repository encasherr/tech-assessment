import React from 'react';
import { connect } from 'react-redux';
import AddMcqComponent from '../components/Mcq/AddMcq';
import {    AddMcq, FetchMcqs, UpdateMcq, FetchCategories, FetchSkills, 
            CloseSnackbar, CurrentMcqFieldChange, CurrentAnswerFieldChange,
            OpenSnackbar, SelectMcq, AddAnswerChoice,
            BeginSearch, SearchMcq } from '../actions/McqActions';
import Grid from '@material-ui/core/Grid';
import SnackbarComponent from '../components/lib/SnackbarComponent';

class McqContainer extends React.Component {

    componentDidMount = () => {
        console.log('did mount');
        this.reload();
    }

    componentWillUpdate = () => {
     console.log('container updated');
        if(this.props.success_message !== '') {
            this.props.FetchCategories();
            // this.props.FetchMcqs();
        }
    }

    componentWillReceiveProps = (newprops, oldprops) => {
        console.log('receiving props');
        console.log(newprops);
        if(newprops.success_message !== '') {
            //this.props.FetchCategories();
            this.props.OpenSnackbar();
        }
    }

    reload = () => {
        this.props.FetchCategories();
        this.props.FetchSkills();
            // this.props.FetchMcqs();
    }

    render = () => {
        console.log('container render');
        console.log(this.props);
        // let categories = [];
        // if(this.props.search_enabled) {
        //     categories = this.props.filteredCategories;
        // }
        // else {
        //     categories = this.props.categoryList;
        // }
        return(
            <Grid container spacing={16}>
                <Grid item xs={12} sm={12}>
                    <AddMcqComponent 
                        onSubmit={ (model) => this.props.AddMcq(model, this.props.editMode) }
                        onAnswerAdd={ (model) => this.props.AddAnswerChoice(model, this.props.current_mcq) }
                        model={this.props.current_mcq}
                        categories={this.props.categories}
                        skills={this.props.skills}
                        currentAnswer={this.props.currentAnswer}
                        editMode={this.props.editMode}
                        onAdd={() => this.reload()}
                        onFieldChange={ (val, field, model) => this.props.CurrentMcqFieldChange(val, field, model) } 
                        onAnswerFieldChange={ (val, field, model) => this.props.CurrentAnswerFieldChange(val, field, model) } 
                        />
                    
                <SnackbarComponent 
                    openSnack={this.props.snack_open} handleClose={() => this.props.CloseSnackbar()} 
                    snackMessage={"Data Saved Successfully!"} 
                                    // "Category Updated Successfully" :    
                                    // "Category Added Successfully!"}
                    /> 
            </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = state => ({
    ...state.mcqReducer
});
const mapDispatchToProps = dispatch => ({
    AddMcq: (model, editMode) => dispatch(AddMcq(model, editMode)),
    AddAnswerChoice: (model, mcqModel) => dispatch(AddAnswerChoice(model, mcqModel)),
    UpdateMcq: (model) => dispatch(UpdateMcq(model)),
    SelectMcq: (model) => dispatch(SelectMcq(model)),
    FetchCategories: () => dispatch(FetchCategories()),
    FetchSkills: () => dispatch(FetchSkills()),
    FetchMcqs: () => dispatch(FetchMcqs()),
    CloseSnackbar: () => dispatch(CloseSnackbar()),
    OpenSnackbar: () => dispatch(OpenSnackbar()),
    BeginSearch: () => dispatch(BeginSearch()),
    SearchMcq: (searchTerm, mcqList) => dispatch(SearchMcq(searchTerm, mcqList)),
    CurrentMcqFieldChange: (val, field, model) => dispatch(CurrentMcqFieldChange(val, field, model)),
    CurrentAnswerFieldChange: (val, field, model) => dispatch(CurrentAnswerFieldChange(val, field, model))
});
export default connect(mapStateToProps, mapDispatchToProps)(McqContainer);