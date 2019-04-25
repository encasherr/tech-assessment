import React, { Component } from 'react';
import { connect } from 'react-redux';
import {    FetchCandidates, 
            CloseSnackbar,
            OpenSnackbar, 
            BeginSearch, SearchCandidate } from '../../actions/CandidateActions';
import { Link } from 'react-router-dom';
import { FormControl, Grid, Card, CardHeader, Button, CardContent, List, ListItem } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class CandidateList extends Component {

    componentDidMount = () => {
        this.props.FetchCandidates();
    }

    render = () => {
        let { candidates } = this.props;
        return (
            <Card>
                <CardHeader
                    action={
                        <Link to="/addCandidate" >
                            <Button variant="contained" color="primary">Add Candidate</Button>
                        </Link>
                    }
                    title="Candidate List"
                    subheader={"For current recruiter"}>
                </CardHeader>
                <CardContent>
                    <List>
                        { candidates && candidates.length > 0 &&
                          candidates.map((item, index) => {
                            return (
                                <ListItem divider={false} key={index} >
                                    <ExpansionPanel style={{width:'100%'}}>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Grid container spacing={16}>
                                            <Grid item xs={6} sm={6}>
                                                <Typography variant="h6">{item.fullName}</Typography>
                                            </Grid>
                                            <Grid item xs={3} sm={3}>
                                                <Typography variant="subtitle1" >{item.email}</Typography>
                                            </Grid>
                                            <Grid item xs={2} sm={2}>
                                                <Typography variant="subtitle1" >
                                                    {item.experienceYears} years {item.experienceMonths} months
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <div style={styles.formControl}>
                                                {item.description && 
                                                    <FormControl variant="outlined" style={styles.formControl}>
                                                        <Typography variant="subtitle1">
                                                            No description
                                                        </Typography>
                                                    </FormControl>
                                                }
                                            </div>
                                        </ExpansionPanelDetails>
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
    ...state.candidateReducer
});
const mapDispatchToProps = dispatch => ({
    FetchCandidates: () => dispatch(FetchCandidates()),
    CloseSnackbar: () => dispatch(CloseSnackbar()),
    OpenSnackbar: () => dispatch(OpenSnackbar()),
    BeginSearch: () => dispatch(BeginSearch()),
    SearchCandidate: (searchTerm, candidateList) => dispatch(SearchCandidate(searchTerm, candidateList)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CandidateList);
const styles = {
    formControl: {
        width: '70%'
    }
}