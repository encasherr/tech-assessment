import React, { Component } from 'react';
import { connect } from 'react-redux';
import {    FetchMcqs, DeleteMcq,
            CloseSnackbar,
            OpenSnackbar, 
            BeginSearch, EndSearch, SearchMcq } from '../../actions/McqActions';
import { Link } from 'react-router-dom';
import { FormControl, Grid, Card, CardHeader, Button, CardContent, 
         List, ListItem, ListItemText, ListItemSecondaryAction,
         Checkbox, TextField } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AnswerOptions from './AnswerOptions';
import McqItem from '../../Containers/TestConsole/McqItem';
import SnackbarComponent from '../lib/SnackbarComponent';
import Fab from '@material-ui/core/Fab';
import { Add, Search, Cancel } from '@material-ui/icons';

class McqList extends Component {

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
        // this.props.FetchMcqs();
    }

    bulkDeleteMcq = () => {
        let { selectedMcqs } = this.state;
        if(selectedMcqs && selectedMcqs.length > 0) {
            console.log('deleting mcqs', selectedMcqs);
            selectedMcqs.map((item, index) => {
                this.onDeleteMcq(item);
            });
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
        let { mcqs, search_term, filteredCategories, search_enabled } = this.props;
        let { selectedMcqs } = this.state;
        let mcqToDisplay = filteredCategories ? filteredCategories : mcqs;
        return (
            <Card>
                <CardHeader
                    action={
                        <div>
                            {selectedMcqs && selectedMcqs.length > 0 &&
                            <Button color="primary" onClick={() => this.props.BeginSearch()} size="small">
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
                                <McqItem    mcq={item} key={index}
                                            onEditClick={(mcq) => this.onEditClick(mcq)}
                                            onDeleteMcq={() => this.onDeleteMcq(item)}
                                            markForDeletion={(mcq) => this.markForDeletion(mcq)}
                                            isSelectable={false} 
                                            isEditable={true} />
                            )
                        } )}
                    </List>
                    <SnackbarComponent 
                        openSnack={this.props.snack_open} handleClose={() => this.props.CloseSnackbar()} 
                        snackMessage={this.props.success_message}
                        />
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    ...state.mcqReducer,
    // ...state.testConsoleReducer
});
const mapDispatchToProps = dispatch => ({
    FetchMcqs: () => dispatch(FetchMcqs()),
    DeleteMcq: (mcq) => dispatch(DeleteMcq(mcq)),
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
