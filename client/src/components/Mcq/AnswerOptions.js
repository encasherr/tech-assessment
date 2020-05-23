import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Typography, Avatar } from '@material-ui/core';

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
                                button={false} onClick={ () => props.onChoiceSelect && props.onChoiceSelect(item) }
                            >
                            <ListItemIcon>
                                <Avatar>
                                    {item.key}
                                </Avatar>
                            </ListItemIcon>
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