import React, { Component } from 'react';
import { AppBar, Tabs, Tab, Typography, Button } from '@material-ui/core';
import TestConsoleQuestions from './TestConsoleQuestions';
import TestConsoleCandidates from './TestConsoleCandidates';
import TestConsoleSettings from './TestConsoleSettings';

class TestConsoleTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render = () => {
        let { value } = this.state;
        let { tabs, selectedMcqs, currentTest } = this.props;
        return(
        <div>
            <AppBar position="static">
                <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
                    <LinkTab label="Questions" href="page1" />
                    <LinkTab label="Candidates" href="page2" />
                    <LinkTab label="Settings" href="page3" />
                </Tabs>
            </AppBar>
            {value === 0 && 
            <TabContainer>
                <TestConsoleQuestions   
                            selectedMcqs={selectedMcqs} 
                            onSelectMcq={ (mcqItem) => this.props.onAddMcqToTest(mcqItem) } 
                            currentTest={currentTest}
                            /> 
            </TabContainer>}
            {value === 1 && <TabContainer><TestConsoleCandidates /> </TabContainer>}
            {value === 2 && <TabContainer><TestConsoleSettings /> </TabContainer>}
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
export default TestConsoleTabs;