import React, { Component } from 'react';
import { AppBar, Tabs, Tab, Typography, Button } from '@material-ui/core';
import TestConsoleQuestions from '../../Containers/TestConsole/TestConsoleQuestions';
import TestConsoleCandidates from '../../Containers/TestConsole/TestConsoleCandidates';
import TestConsoleSettings from '../../Containers/TestConsole/TestConsoleSettings';

class TabControl extends Component {
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
        let { tabs } = this.props;
        return(
        <div>
            <AppBar position="static">
            {/* <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
            {tabs.map((item, index) => {
                return (
                    <LinkTab label={"Page " + index} href={"page"+index} />
                )
            })}
            </Tabs> */}
                <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
                    <LinkTab label="Questions" href="page1" />
                    <LinkTab label="Candidates" href="page2" />
                    <LinkTab label="Settings" href="page3" />
                </Tabs>
            </AppBar>
            {/* {tabs.map((item, index) => {
            console.log(item.key + ' - ' + item.content);
            return (
                    item.key === value && <TabContainer>{item.content}</TabContainer>
                )
            })} */}
            {value === 0 && <TabContainer><TestConsoleQuestions /> </TabContainer>}
            {value === 1 && <TabContainer><TestConsoleCandidates /> </TabContainer>}
            {value === 2 && <TabContainer><TestConsoleSettings /> </TabContainer>}
        </div>
        );
    }
}

const TabContainer = (props) => {
    console.log(props.children);
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
}

const LinkTab = (props) => {
    return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}
export default TabControl;