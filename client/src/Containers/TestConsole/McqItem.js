import React, { Component } from 'react';
import { Card, CardContent, CardActions, ListItem, ListItemText, 
        ListItemSecondaryAction, IconButton, Slide,
        Dialog, DialogTitle, DialogContent, Divider,
        Typography, 
        DialogActions,
        Button} from '@material-ui/core';
import { AddBox, Close, Remove, Edit, Delete } from '@material-ui/icons';
import AnswerOptions from '../../components/Mcq/AnswerOptions';

const Transition = (props) => {
    return <Slide direction="up" {...props} />
}

class McqItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        console.log('handle close');
        this.setState({ open: false });
    };

    handleDelete = () => {
        this.props.onDeleteMcq();
        this.setState({ open: false });
    }

    render = () => {
        let { mcq, isSelectable, isEditable } = this.props; 
        return (
            <div>
                
                <ListItem 
                    divider={true} 
                    onClick={this.handleClickOpen}
                    button={true}
                    >
                    <ListItemText primary={mcq.question} secondary={`${mcq.category} - ${mcq.skill}`}>
                    </ListItemText>
                    {isSelectable && 
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => this.props.onAddMcqToTest()}>
                            {!mcq.selected && 
                            <AddBox fontSize="large" color="secondary" />
                            }
                            {mcq.selected && 
                            <Remove fontSize="large" color="secondary" />
                            }
                        </IconButton>
                    </ListItemSecondaryAction>}
                    {isEditable && 
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => this.props.onEditClick(mcq)}>
                            <Edit fontSize="small" color="secondary" />
                        </IconButton>
                    </ListItemSecondaryAction>}
                </ListItem>
                <Dialog
                    TransitionComponent={Transition}
                    fullScreen
                    style={{left: '20%', right: '20%', top: '10%', bottom: '10%' }}
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle onClose={this.handleClose}>
                        <Typography variant="display1">
                            {mcq.question}
                        </Typography>
                        <IconButton onClick={this.handleClose} style={{right: '4%', top: '1%', position:'absolute'}}>
                            <Close />
                        </IconButton>
                    </DialogTitle>
                    <Divider />
                    <DialogContent style={{padding: '4%'}}>
                        <p>{mcq.description}</p>
                        <AnswerOptions choices={mcq.choices}/>
                    </DialogContent>
                    {isEditable &&
                    <DialogActions>
                        <Button variant="contained" color="secondary" onClick={this.handleDelete} >
                            Delete
                        </Button>
                    </DialogActions>
                    }
                </Dialog>
            </div>
        );  
    }
}
export default McqItem;