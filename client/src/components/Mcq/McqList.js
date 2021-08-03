import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import {    FetchMcqs, DeleteMcq, BulkDeleteMcq,
            CloseSnackbar,
            OpenSnackbar, 
            BeginSearch, EndSearch, SearchMcq } from '../../actions/McqActions';

import { FetchCategories } from '../../actions/CategoryActions';
import { FetchSkills } from '../../actions/SkillActions';

import { Link } from 'react-router-dom';
import { FormControl, Grid, Card, CardHeader, Button, CardContent, 
         List, ListItem, ListItemText, ListItemSecondaryAction,
         Checkbox, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import McqItem from '../../Containers/TestConsole/McqItem';
import SnackbarComponent from '../lib/SnackbarComponent';
import Fab from '@material-ui/core/Fab';
import { Add, Search, ArrowUpward, Delete, Refresh } from '@material-ui/icons';
import LoadingComponent from '../lib/LoadingComponent';
import User401 from '../../Containers/User/User401';

import { Input, InputLabel, Select, MenuItem } from '@material-ui/core';


//import BaseComponent from '../lib/BaseComponent';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  

class McqList extends Component {

    constructor (props) {
       super(props);
       this.state = {
          selectedMcqs: [],
          selectedSkills: []
       }
    }

//     [personName, setPersonName] = useState([]);

//    handleChange = (event) => {
//     setPersonName(event.target.value);
//   };

//    handleChangeMultiple = (event) => {
//     const { options } = event.target;
//     const value = [];
//     for (let i = 0, l = options.length; i < l; i += 1) {
//       if (options[i].selected) {
//         value.push(options[i].value);
//       }
//     }
//     setPersonName(value);
//   };


    componentDidMount = () => {
        this.reload();
    }

    reload = () => {
        this.props.FetchMcqs();
        this.props.FetchCategories();
        this.props.FetchSkills();
    }

    onAddMcqToTest = (mcqId) => {
        this.props.AddMcqToTest(mcqId);
    }

    onEditClick = (mcq) => {
        this.props.history.push({
            pathname:  '/addMcq',
            state: {
                mcq: mcq
            }
        });
    }

    onDeleteMcq = (mcq) => {
        this.props.DeleteMcq(mcq);
    }

    bulkDeleteMcq = () => {
        let { selectedMcqs } = this.state;
        if(selectedMcqs && selectedMcqs.length > 0) {
            this.props.BulkDeleteMcq(selectedMcqs);
        }        
    }

    markForDeletion = (mcq) => {
        let { selectedMcqs } = this.state;
        let filteredMcqs = selectedMcqs.filter((item)=>{
            return item.id === mcq.id;
        });
        if(filteredMcqs && filteredMcqs.length > 0) {
        } else {
            selectedMcqs.push(mcq);
            this.setState({selectedMcqs});
        }
    }

    handleFilterChange = (e) => {
        let criteria = e.target.attributes.getNamedItem("data-criteria").value;
        console.log('criteria', criteria);
        switch(criteria) {
            case 'SKILL': {
                this.setState({
                    selectedSkills: e.target.value
                })
                break;
            }
            case 'CATEGORY': {
                
                break;
            }
            case 'QUEST_DESC': {
                break;
            }
        }
        console.log('e.target', e.target.value);
        let searchTerm = e.target.value;
        if(!searchTerm) {
            searchTerm = e.target.innerHTML;
            if(searchTerm && 
                searchTerm.toLowerCase() === 'programming' &&
                criteria === 'CATEGORY') {
                this.setState({
                    skillCriteriaEnabled: true
                })
            }
            else if (criteria === 'CATEGORY') {
                this.setState({
                    skillCriteriaEnabled: false
                })
            }
        }
        this.props.SearchMcq(criteria, searchTerm, this.props.mcqs);
    }

    clearFilters = () => {
        this.props.SearchMcq('ALL', '', this.props.mcqs);
        this.setState({
            skillCriteriaEnabled: false
        })
    }

    render = () => {
        let { mcqs, search_term, filteredCategories, search_enabled, error, 
            categoryList, skillList } = this.props;
        let { selectedMcqs } = this.state;
        let mcqToDisplay = filteredCategories ? filteredCategories : mcqs;
        if(!mcqToDisplay){
            return (
                <LoadingComponent />
            )
        }
        // search_enabled = true;
        console.log('categoryList', categoryList);
        console.log('skillList', skillList);
        let criteriaObj = { 
            categoryList, 
            skillList, 
            skillCriteriaEnabled: this.state.skillCriteriaEnabled,
            clearFilters: this.clearFilters
        };
        
        return (
            <Card>
                <CardHeader
                    action={
                        <div>
                            {selectedMcqs && selectedMcqs.length > 0 &&
                            <Link onClick={() => this.bulkDeleteMcq()} size="small" title="Delete Selected">
                                <Delete color="secondary" />
                            </Link>}
                            {/* {!search_enabled &&
                            <Button className={styles.hide} color="primary" onClick={() => this.props.BeginSearch()} size="small">
                                <Search />
                            </Button>} */}
                            <Button color="primary" onClick={() => this.reload()} size="small">
                                <Refresh color="secondary" />
                            </Button>
                            <Link to="/addMcq" title="Add New MCQ">
                                <Add color="secondary" />
                            </Link>
                            <Link to="/bulkMcq" title="Bulk Upload MCQs" >
                                <ArrowUpward color="secondary" />
                                {/* <Button variant="contained" color="primary">Bulk Upload Mcq</Button> */}
                            </Link>
                        </div>
                    }
                    title={`MCQ List (${mcqToDisplay.length})`}
                    subheader="Multiple Choice Questions">
                </CardHeader>
                <CardContent>
                    {renderFilters(criteriaObj, this.handleFilterChange)}
                    {search_enabled &&
                    <div>
                        <FormControl variant="outlined" style={styles.formControl}>
                            <TextField
                                id="outlined-name"
                                label="Search"
                                value={search_term}
                                className={styles.dense}
                                // onChange={(e) => this.props.SearchMcq(e.target.value, mcqs)}
                                onChange={this.handleFilterChange}
                                margin="normal"
                                variant="outlined"
                                inputProps={{ 'data-criteria': 'QUEST_OR_DESC' }}
                            />
                            <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
                            <Select
                                id="demo-mutiple-checkbox"
                                multiple
                                value={this.state.selectedSkills}
                                onChange={this.handleFilterChange}
                                inputProps={{ 'data-criteria': 'SKILL' }}
                                input={<Input />}
                                renderValue={(selected) => selected.join(', ')}
                                // MenuProps={MenuProps}
                                >
                                {skills.map((name) => (
                                    <MenuItem key={name} value={name}>
                                    <Checkbox checked={this.state.selectedSkills.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" style={{width: '10%', marginTop: '2%'}}>
                            <Button  color="primary" size="small" onClick={() => this.props.EndSearch()} >
                                Hide Search
                            </Button>
                        </FormControl>
                    </div>
                    }
                    {/* {mcqToDisplay && 
                                    <Typography variant="caption">
                                        {mcqToDisplay.length} MCQs
                                    </Typography>} */}
                    <Link to="/addMcq" >
                        <Fab color="primary" aria-label="Add" style={{right: 20, position: 'fixed', bottom: 20}}>
                            <Add />
                        </Fab>
                    </Link>
                    <List dense={true}>
                        { mcqToDisplay && mcqToDisplay.length > 0 &&
                          mcqToDisplay.map((item, index) => {
                            return (
                                <McqItem    mcqItem={item} key={index}
                                            onEditClick={(mcq) => this.onEditClick(item)}
                                            onDeleteMcq={() => this.onDeleteMcq(item)}
                                            markForDeletion={() => this.markForDeletion(item)}
                                            isSelectable={false} 
                                            isEditable={true} />
                            )
                        } )}
                    </List>
                </CardContent>
            </Card>
        );
    }
}

const renderFilters = (criteriaObj, handleFilterChange) => {
    // console.log('categories', criteriaObj);
    return (
        <>
            <>
                {criteriaObj.categoryList && criteriaObj.categoryList.length > 0 &&
                    <div className="row">
                        <div className="col-md-2 text-primary">Categories</div>
                        <div className="col-md-10">
                            {criteriaObj.categoryList.map((categoryItem, ix) => {
                                return (
                                        <button key={ix} type="button" className="ml-1 btn btn-secondary btn-sm" data-criteria='CATEGORY' onClick={handleFilterChange}>{categoryItem.category_meta.title}</button>
                                )
                            })}
                            <button type="button" className="ml-1 btn btn-warning btn-sm" data-criteria='CATEGORY' onClick={criteriaObj.clearFilters}>All</button>
                        </div>
                    </div>
                }
            </>
            <>
                    
                {criteriaObj.skillCriteriaEnabled && criteriaObj.skillList && criteriaObj.skillList.length > 0 &&
                    <div className="row mt-2">
                        <div className="col-md-2 text-primary">Skills</div>
                        <div className="col-md-10">
                            {criteriaObj.skillList.map((skillItem) => {
                                return (
                                        <button type="button" className="ml-1 btn btn-secondary btn-sm" data-criteria='SKILL' onClick={handleFilterChange}>{skillItem.skill_meta.skill}</button>
                                )
                            })}
                        </div>
                    </div>
                }

            </>
        </>
    )
}

const mapStateToProps = state => ({
    ...state.mcqReducer,
    ...state.categoryReducer,
    ...state.skillReducer
});
const mapDispatchToProps = dispatch => ({
    FetchMcqs: () => dispatch(FetchMcqs()),
    DeleteMcq: (mcq) => dispatch(DeleteMcq(mcq)),
    BulkDeleteMcq: (mcqs) => dispatch(BulkDeleteMcq(mcqs)),
    FetchCategories: () => dispatch(FetchCategories()),
    FetchSkills: () => dispatch(FetchSkills()),
    CloseSnackbar: () => dispatch(CloseSnackbar()),
    OpenSnackbar: () => dispatch(OpenSnackbar()),
    BeginSearch: () => dispatch(BeginSearch()),
    EndSearch: () => dispatch(EndSearch()),
    SearchMcq: (searchCriteria, searchTerm, mcqList) => dispatch(SearchMcq(searchCriteria, searchTerm, mcqList)),
});
export default connect(mapStateToProps, mapDispatchToProps)(McqList);
const styles = {
    formControl: {
        width: '70%'
    },
    hide: {
        display: 'none'
    }
}

const skills = [
    'JAVA',
    'ANGULAR',
    'REACT',
    'PLSQL',
    'DEVOPS'
]