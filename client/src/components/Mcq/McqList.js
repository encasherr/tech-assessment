import React, { Component } from 'react';
import { connect } from 'react-redux';
import {    FetchMcqs, DeleteMcq, BulkDeleteMcq,
            CloseSnackbar,
            OpenSnackbar, 
            BeginSearch, EndSearch, SearchMcq } from '../../actions/McqActions';
import { Link } from 'react-router-dom';
import { FormControl, Grid, Card, CardHeader, Button, CardContent, 
         List, ListItem, ListItemText, ListItemSecondaryAction,
         Checkbox, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import McqItem from '../../Containers/TestConsole/McqItem';
import SnackbarComponent from '../lib/SnackbarComponent';
import Fab from '@material-ui/core/Fab';
import { Add, Search } from '@material-ui/icons';
import LoadingComponent from '../lib/LoadingComponent';
import User401 from '../../Containers/User/User401';

import BaseComponent from '../lib/BaseComponent';

class McqList extends BaseComponent {

    constructor (props) {
       super(props);
       this.state = {
          selectedMcqs: []
       }
    }

    componentDidMount = () => {
        this.props.FetchMcqs();
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

    render = () => {
        let { mcqs, search_term, filteredCategories, search_enabled, error } = this.props;
        let { selectedMcqs } = this.state;
        let mcqToDisplay = filteredCategories ? filteredCategories : mcqs;
        if(!mcqToDisplay){
            return (
                <LoadingComponent />
            )
        }
        return (
            <Card>
                <CardHeader
                    action={
                        <div>
                            {selectedMcqs && selectedMcqs.length > 0 &&
                            <Button color="primary" onClick={() => this.bulkDeleteMcq()} size="small">
                                Delete
                            </Button>}
                            {!search_enabled &&
                            <Button color="primary" onClick={() => this.props.BeginSearch()} size="small">
                                <Search />
                            </Button>}
                            <Link to="/bulkMcq" >
                                <Button variant="contained" color="primary">Bulk Upload Mcq</Button>
                            </Link>
                        </div>
                    }
                    title="MCQ List"
                    subheader="Multiple Choice Questions">
                </CardHeader>
                <CardContent>
                    {search_enabled && 
                    <div>
                        <FormControl variant="outlined" style={styles.formControl}>
                                        <TextField
                                            id="outlined-name"
                                            label="Search"
                                            value={search_term}
                                            className={styles.dense}
                                            onChange={(e) => this.props.SearchMcq(e.target.value, mcqs)}
                                            margin="normal"
                                            variant="outlined"
                                        />
                        </FormControl>
                        <FormControl variant="outlined" style={{width: '10%', marginTop: '2%'}}>
                            <Button  color="primary" size="small" onClick={() => this.props.EndSearch()} >
                                Hide Search
                            </Button>
                        </FormControl>
                    </div>
                    }
                    {mcqToDisplay && 
                                    <Typography variant="caption">
                                        {mcqToDisplay.length} MCQs found
                                    </Typography>}
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

const mapStateToProps = state => ({
    ...state.mcqReducer,
});
const mapDispatchToProps = dispatch => ({
    FetchMcqs: () => dispatch(FetchMcqs()),
    DeleteMcq: (mcq) => dispatch(DeleteMcq(mcq)),
    BulkDeleteMcq: (mcqs) => dispatch(BulkDeleteMcq(mcqs)),
    CloseSnackbar: () => dispatch(CloseSnackbar()),
    OpenSnackbar: () => dispatch(OpenSnackbar()),
    BeginSearch: () => dispatch(BeginSearch()),
    EndSearch: () => dispatch(EndSearch()),
    SearchMcq: (searchTerm, mcqList) => dispatch(SearchMcq(searchTerm, mcqList)),
});
export default connect(mapStateToProps, mapDispatchToProps)(McqList);
const styles = {
    formControl: {
        width: '70%'
    }
}
