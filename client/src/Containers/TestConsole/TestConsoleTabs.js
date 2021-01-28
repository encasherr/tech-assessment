import React, { Component } from 'react';
import { AppBar, Tabs, Tab, Typography, Button } from '@material-ui/core';
import TestConsoleQuestions from './TestConsoleQuestions';
import TestConsoleCandidates from './TestConsoleCandidates';
import TestConsoleSettings from './TestConsoleSettings';

class TestConsoleTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.selectedTabIndex || 0
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render = () => {
        let { value } = this.state;
        value = this.props.selectedTabIndex || value;
        console.log('props.selectedTabIndex', value);
        let { tabs, selectedMcqs, currentTest, candidates } = this.props;
        return(
        <div>
            <AppBar position="static">
                <Tabs variant="fullWidth" value={value} 
                        onChange={this.handleChange}>
                    <LinkTab label="Questions" href="page1" />
                    <LinkTab label="Candidates" href="page2" />
                    <LinkTab label="Details" href="page3" />
                </Tabs>
            </AppBar>
            {value === 0 && 
            <TabContainer>
                <TestConsoleQuestions   
                            classes={this.props.classes}
                            selectedMcqs={selectedMcqs} 
                            onSelectMcq={ (mcqItem) => this.props.onAddMcqToTest(mcqItem) } 
                            onRemoveMcqFromTest={ (mcqItem) => this.props.onRemoveMcqFromTest(mcqItem) } 
                            currentTest={currentTest}
                            /> 
            </TabContainer>}
            {value === 1 && 
            <TabContainer>
                <TestConsoleCandidates 
                    candidates={candidates}
                /> 
            </TabContainer>}
            {value === 2 && 
            <TabContainer>
                <TestConsoleSettings
                        classes={this.props.classes}
                        currentTest={currentTest} 
                        onFieldChange={(val, field) => this.props.onSettingsFieldChange(val, field)}
                        onSubmitTestSettings={() => this.props.onSubmitTestSettings()} /> 
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
    return <Tab onClick={event => event.preventDefault()} {...props} />;
}
function a11yProps(index) {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`,
    };
  }
  
export default TestConsoleTabs;