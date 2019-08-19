import React, { Component } from 'react';
import { Typography, Card, CardHeader, CardContent, FormControl,
         FormControlLabel, FormLabel, FormGroup, Checkbox, CardActions,
         Button } from '@material-ui/core';
import { connect } from 'react-redux';
import AuthHelper from '../../AuthHelper';
import LoadingComponent from '../../components/lib/LoadingComponent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

class QuestionSimulatorConsoleContainer extends React.Component {
    constructor(props) {
        super(props);
        let userInfo = AuthHelper.GetUserInfo();
        console.log('userInfo', userInfo);
        this.state = {
            mcq: {},
            selectedAnswers : []
        };
    }

    handleAnswerSelect = (event, itemIndex) => {
        let { selectedAnswers } = this.state;
        if(selectedAnswers && selectedAnswers.indexOf(itemIndex) !== -1) {
            let tempAnswers = [];
            selectedAnswers.map((item, idx) => {
                tempAnswers.push(item);
            });
            tempAnswers.push(itemIndex);
            this.setState({
                selectedAnswers: tempAnswers
            })
        }
    }

    render = () => {
        let { model } = this.props;
        console.log('question simulator', model);
        let { mcq, selectedAnswers } = this.state;
        let qEntity = {};
        if(model && model.selectedMcqs && model.selectedMcqs.length > 0) {
            qEntity = model.selectedMcqs[0];
        }
        else {
            return (
                <LoadingComponent />
            )
        }
        let itemIndex = 0;
        return (
            <Card>
                <CardHeader 
                            title={qEntity.question}
                            subheader={qEntity.category}>
                </CardHeader>
                <CardContent>
                    <Typography variant="subtitle1">
                        {qEntity.description}
                    </Typography>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Options</FormLabel>
                        {qEntity.choices && qEntity.choices.length > 0 &&
                        <List component="nav" aria-label="main mailbox folders">
                            {qEntity.choices.map((choiceItem, choiceIndex) => {
                                return (
                                    <ListItem
                                    button
                                    selected={selectedAnswers.indexOf(choiceIndex) > -1}
                                    onClick={event => this.handleAnswerSelect(event, choiceIndex)}>
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={choiceItem.content} />
                                    </ListItem>
                                )
                            })}
                        </List>
                        }
                    </FormControl>
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="small">Previous</Button>
                    <Button variant="contained" size="small" color="primary">Next</Button>
                </CardActions>
            </Card>
        );
    }
}

// const mapStateToProps = state => ({
//     ...state.simulatorConsoleReducer
// });
// const mapDispatchToProps = dispatch => ({
//     // LoadExamSimulator: () => dispatch(LoadExamSimulator())
// });

// export default connect(mapStateToProps, mapDispatchToProps)(QuestionSimulatorConsoleContainer);
export default QuestionSimulatorConsoleContainer;