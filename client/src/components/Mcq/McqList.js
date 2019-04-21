import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddMcqComponent from './AddMcq';
import {    AddMcq, FetchMcqs, UpdateMcq, FetchCategories, FetchSkills, 
            CloseSnackbar, CurrentMcqFieldChange, CurrentAnswerFieldChange,
            OpenSnackbar, SelectMcq, AddAnswerChoice,
            BeginSearch, SearchMcq } from '../../actions/McqActions';
import { Link } from 'react-router-dom';
import { FormControl, Grid, Card, CardHeader, Button, CardContent, List, ListItem, ListItemText } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import AnswerOptions from './AnswerOptions';

class McqList extends Component {

    componentDidMount = () => {
        this.props.FetchMcqs();
    }

    render = () => {
        let { mcqs } = this.props;
        return (
            <Card>
                <CardHeader
                    action={
                        <Link to="/addMcq" >
                            <Button variant="contained" color="primary">Add Mcq</Button>
                        </Link>
                    }
                    title="MCQ List"
                    subheader="Multiple Choice Questions">
                </CardHeader>
                <CardContent>
                    <List>
                        { mcqs && mcqs.length > 0 &&
                          mcqs.map((item, index) => {
                            return (
                                <ListItem divider={false} key={index} >
                                    <ExpansionPanel style={{width:'100%'}}>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Grid container spacing={16}>
                                            <Grid item xs={6} sm={6}>
                                                <Typography variant="h6">{item.question}</Typography>
                                            </Grid>
                                            <Grid item xs={3} sm={3}>
                                                <Typography variant="subtitle1" >{item.category}</Typography>
                                            </Grid>
                                            <Grid item xs={3} sm={3}>
                                                <Typography variant="subtitle1" >{item.skill}</Typography>
                                            </Grid>
                                        </Grid>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <div style={styles.formControl}>
                                                {item.description && 
                                                    <FormControl variant="outlined" style={styles.formControl}>
                                                        <Typography variant="subtitle1">
                                                            {item.description}
                                                        </Typography>
                                                    </FormControl>
                                                }
                                                <AnswerOptions choices={item.choices} />
                                            </div>
                                        </ExpansionPanelDetails>
                                        {/* <Divider /> */}
                                        <ExpansionPanelActions>
                                        <Button variant="outlined" size="small" color="primary" >
                                            Edit
                                        </Button>
                                        </ExpansionPanelActions>
                                    </ExpansionPanel>
                                </ListItem>
                            )
                        } )}
                    </List>
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    ...state.mcqReducer
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