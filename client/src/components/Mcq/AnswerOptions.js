import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';

const AnswerOptions = (props) => {
        return (
            <div>
                <Typography variant="caption">Choices</Typography>
                <List dense={true}>
                        {props.choices && props.choices.length > 0
                        && props.choices.map((item, index) => {
                            return(
                            <ListItem key={index}
                                divider={true}
                                button={true} onClick={ () => props.onChoiceSelect(item) }
                            >
                            <ListItemText
                                primary={item.content}
                                secondary={item.isCorrect ? 'Correct' : 'Wrong'}
                                />
                            </ListItem>)
                        })}
                        
                </List>

            </div>
        );
}
export default AnswerOptions;