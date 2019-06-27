import React, { Component } from 'react';
import { connect } from 'react-redux';
import {    FetchMcqs, 
            CloseSnackbar,
            OpenSnackbar, 
            BeginSearch, SearchMcq } from '../../actions/McqActions';
import { Link } from 'react-router-dom';
import { FormControl, Grid, Card, CardHeader, Button, CardContent, 
         List, ListItem, ListItemText, ListItemSecondaryAction,
         Checkbox } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AnswerOptions from './AnswerOptions';
import McqItem from '../../Containers/TestConsole/McqItem';

class McqList extends Component {

    componentDidMount = () => {
        this.props.FetchMcqs();
    }

    onAddMcqToTest = (mcqId) => {
        this.props.AddMcqToTest(mcqId);
    }

    render = () => {
        let { mcqs } = this.props;
        return (
            <Card>
                <CardHeader
                    action={
                        <div>
                            <Link to="/addMcq" >
                                <Button variant="contained" color="primary">Add Mcq</Button>
                            </Link>
                            <Link to="/bulkMcq" >
                                <Button variant="contained" color="primary">Bulk Upload Mcq</Button>
                            </Link>
                        </div>
                    }
                    title="MCQ List"
                    subheader="Multiple Choice Questions">
                </CardHeader>
                <CardContent>
                    <List dense={true}>
                        { mcqs && mcqs.length > 0 &&
                          mcqs.map((item, index) => {
                            return (
                                <McqItem    mcq={item} key={index}
                                            // onAddMcqToTest={() => this.props.onSelectMcq(item) } 
                                            isSelectable={false} />
                                // <ListItem divider={false} key={index} >
                                //     <ListItemText primary={`${item.question}`} 
                                //         secondary={`${item.category} - ${item.skill}`}/>
                                // </ListItem>
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
    // ...state.testConsoleReducer
});
const mapDispatchToProps = dispatch => ({
    FetchMcqs: () => dispatch(FetchMcqs()),
    CloseSnackbar: () => dispatch(CloseSnackbar()),
    OpenSnackbar: () => dispatch(OpenSnackbar()),
    BeginSearch: () => dispatch(BeginSearch()),
    SearchMcq: (searchTerm, mcqList) => dispatch(SearchMcq(searchTerm, mcqList)),
});
export default connect(mapStateToProps, mapDispatchToProps)(McqList);
const styles = {
    formControl: {
        width: '70%'
    }
}