import React from 'react';
import { Typography, Card, CardHeader, CardContent, FormControl,
         FormLabel, CardActions,
         Button, 
         Avatar} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
         
const Question = (props) => {
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
                            // selected={1 === 1}
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
}
export default Question;