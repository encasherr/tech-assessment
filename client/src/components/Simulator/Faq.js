import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon  } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const Faq = (props) => {
    let instructions = [
        "This test has multiple choice questions",
        "Each question has one or more correct answers",
        "Please ensure you complete the test once you click on Start Test button",
        "To start the test, click on Start Test button",
        "Once you click on Start Test, remaining time will be displayed on top of screen",
        "To submit your all responses to questions, click on Submit button on top right",
        "Unless you click on Submit, your answers will not be submitted for evaluation, so just ensure you click on Submit before time elapses"
    ];
    return (
        <List>
            {instructions.map((instruction, index) => {
                return (
                <ListItem key={index}>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary={instruction} />
                </ListItem>
                )  
            })}
        </List>
    )
}
export default Faq;