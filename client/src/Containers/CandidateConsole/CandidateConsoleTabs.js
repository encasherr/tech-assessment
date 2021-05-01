import React, { Component } from 'react';
import { AppBar, Tabs, Tab, Typography, Button,
    Toolbar, Link } from '@material-ui/core';
import { Link as InternalLink } from 'react-router-dom';

import CandidateResponseReport from './CandidateResponseReport';
import CandidateResponseDetail from './CandidateResponseDetails';
import CandidateRecording from './CandidateRecording';

class CandidateConsoleTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.selectedTabIndex || 1
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render = () => {
        let { value } = this.state;
        value = this.props.selectedTabIndex || value;
        let { candidateDetails, candidateResponses, responseRecordings, classes } = this.props;
        return(
        <div>
            {/* <InternalLink to={ {pathname: `${this.props.backLink}`, state: { responseId: this.props.responseId } } }>
                <Button >Back</Button>
            </InternalLink> */}
            <AppBar position="static">
                <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
                    <LinkTab label="Candidate Response Report" href="page1" />
                    <LinkTab label="Candidate Details" href="page2" />
                    <LinkTab label="Recording" href="page3" />
                </Tabs>
            </AppBar>
            {value === 0 && 
            <TabContainer>
                <CandidateResponseReport   
                    classes={classes}
                    responseId={this.props.responseId}
                    fetchCandidateResponseReport={this.props.FetchCandidateResponseReport}
                    candidateResponses={candidateResponses}
                /> 
            </TabContainer>}
            {value === 1 && 
            <TabContainer>
                <CandidateResponseDetail
                    classes={classes}
                    candidateId={this.props.candidateId}
                    fetchCandidateDetails={this.props.FetchCandidateDetails}
                    candidateDetails={candidateDetails}
                /> 
            </TabContainer>}
            {value === 2 && 
            <TabContainer>
                <CandidateRecording   
                    classes={classes}
                    responseId={this.props.responseId}
                    fetchRecordings={this.props.FetchRecordings}
                    responseRecordings={responseRecordings}
                /> 
            </TabContainer>}
        </div>
        );
    }
}

const TabContainer = (props) => {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
}

const LinkTab = (props) => {
    return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}
export default CandidateConsoleTabs;