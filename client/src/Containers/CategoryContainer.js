import React from 'react';
import { connect } from 'react-redux';
import AddCategoryComponent from '../components/Categories/AddCategory';
import CategoryList from '../components/Categories/CategoryList';
import {    AddCategory, FetchCategories, UpdateCategory, 
            CloseSnackbar, CurrentCategoryFieldChange,
            OpenSnackbar, SelectCategory,
            BeginSearch, SearchCategory } from '../actions/CategoryActions';
import Grid from '@material-ui/core/Grid';
import SnackbarComponent from '../components/lib/SnackbarComponent';

class CategoryContainer extends React.Component {

    componentDidMount = () => {
        console.log('did mount');
        this.reload();
    }

    componentWillUpdate = () => {
     console.log('container updated');
        if(this.props.success_message !== '') {
            this.props.FetchCategories();
        }
    }

    componentWillReceiveProps = (newprops, oldprops) => {
        console.log('receiving props');
        console.log(newprops);
        if(newprops.success_message !== '') {
            this.props.FetchCategories();
            this.props.OpenSnackbar();
        }
    }

    reload = () => {
        this.props.FetchCategories();
    }

    // shouldComponentUpdate = () => {
    //     console.log('should');
    //     return true;
    // }

    render = () => {
        console.log('container render');
        console.log(this.props);
        let categories = [];
        if(this.props.search_enabled) {
            categories = this.props.filteredCategories;
        }
        else {
            categories = this.props.categoryList;
        }
        return(
            <Grid container spacing={16}>
                <Grid item xs={12} sm={6}>
                    <AddCategoryComponent 
                        onSubmit={ (model) => this.props.AddCategory(model, this.props.editMode) }
                        model={this.props.current_category}
                        editMode={this.props.editMode}
                        onAdd={() => this.reload()}
                        onFieldChange={ (val, field, model) => this.props.CurrentCategoryFieldChange(val, field, model) } />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CategoryList categories={categories} 
                        onCategorySelect={ (item) => this.props.SelectCategory(item) } 
                        onSearchEnable={ () => this.props.BeginSearch() } 
                        searchEnabled={this.props.search_enabled}
                        searchTerm={this.props.search_term}
                        onSearchCategory={ (searchTerm) => this.props.SearchCategory(searchTerm, this.props.categoryList) }/>
                </Grid>
                <SnackbarComponent 
                    openSnack={this.props.snack_open} handleClose={() => this.props.CloseSnackbar()} 
                    snackMessage={"Data Saved Successfully!"} 
                                    // "Category Updated Successfully" :    
                                    // "Category Added Successfully!"}
                    /> 
            </Grid>
        );
    }
}
const mapStateToProps = state => ({
    ...state.categoryReducer
});
const mapDispatchToProps = dispatch => ({
    AddCategory: (model, editMode) => dispatch(AddCategory(model, editMode)),
    UpdateCategory: (model) => dispatch(UpdateCategory(model)),
    SelectCategory: (model) => dispatch(SelectCategory(model)),
    FetchCategories: () => dispatch(FetchCategories()),
    CloseSnackbar: () => dispatch(CloseSnackbar()),
    OpenSnackbar: () => dispatch(OpenSnackbar()),
    BeginSearch: () => dispatch(BeginSearch()),
    SearchCategory: (searchTerm, categoryList) => dispatch(SearchCategory(searchTerm, categoryList)),
    CurrentCategoryFieldChange: (val, field, model) => dispatch(CurrentCategoryFieldChange(val, field, model))
});
export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);