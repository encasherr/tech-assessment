import React from 'react';
import { Typography, Card, CardHeader, CardContent, FormControl,
         FormLabel, CardActions,
         Button, 
         Avatar,
         Badge} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Question = (props) => {
    console.log('q-props', props);
    const { model, selectedAnswers } = props;
    return (
        <div>
            <Typography variant="subtitle1">
                {/* {model.mcq.mcq_meta.description} */}
                <div
                    dangerouslySetInnerHTML={{
                        __html: model.mcq.mcq_meta.description
                    }}>
                </div>
            </Typography>
            <FormControl component="fieldset">
                <FormLabel component="legend">Options</FormLabel>
                {model.mcq.mcq_meta.choices && model.mcq.mcq_meta.choices.length > 0 &&
                <div className="list-group">
                    {model.mcq.mcq_meta.choices.map((choiceItem, choiceIndex) => {
                        return (
                            <div
                                onClick={event => props.onResponseChange(choiceItem.key)}
                                className={`noBorderRadius btn text-left list-group-item border-primary ${model.candidateResponse.responseKeys.indexOf(choiceItem.key) > -1 ? 'bg-warning' : ''}`}
                                >
                                    <div className="col-md-2">
                                            <Avatar className="bg-primary">
                                                {choiceItem.key}
                                            </Avatar>
                                            {/* <Badge color="secondary" badgeContent={choiceItem.key} /> */}
                                    </div>
                                    <div className="col-md-10">
                                        {/* {choiceItem.content} */}
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: choiceItem.content
                                            }}>
                                        </div>
                                    </div>
                            </div>
                        )
                    })}
                </div>
                }
            </FormControl>
        </div>
    );
}
/*      
const Question = (props) => {
    console.log('q-props', props);
    const { model, selectedAnswers } = props;
    return (
        <div>
            <Typography variant="subtitle1">
                {model.mcq.mcq_meta.description}
            </Typography>
            <FormControl component="fieldset">
                <FormLabel component="legend">Options</FormLabel>
                {model.mcq.mcq_meta.choices && model.mcq.mcq_meta.choices.length > 0 &&
                <List>
                    {model.mcq.mcq_meta.choices.map((choiceItem, choiceIndex) => {
                        return (
                            <ListItem
                            key={choiceIndex}
                            button
                            className="alert alert-primary"
                            selected={model.candidateResponse.responseKeys.indexOf(choiceItem.key) > -1}
                            onClick={event => props.onResponseChange(choiceItem.key)}>
                            <ListItemIcon>
                                <Avatar>
                                    {choiceItem.key}
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText primary={choiceItem.content} />
                            </ListItem>
                        )
                    })}
                </List>
                }
            </FormControl>
        </div>
    );
}*/
export default Question;
const styles = {
    noRadius: {
        borderLeftRadius: '0px ! important'
    }
}