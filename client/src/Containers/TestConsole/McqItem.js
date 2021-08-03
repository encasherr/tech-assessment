import React, { Component } from 'react';
import { Card, CardContent, CardActions, ListItem, ListItemText, 
        ListItemSecondaryAction, IconButton, Slide,
        Dialog, DialogTitle, DialogContent, Divider,
        Typography, 
        DialogActions,
        Button,
        Checkbox} from '@material-ui/core';
import { AddBox, Close, Remove, Edit, Delete } from '@material-ui/icons';
import AnswerOptions from '../../components/Mcq/AnswerOptions';
import { EscapeSpecialCharacters } from '../../common/HelperFunctions';

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

    handleChange = (mcq) => {
        console.log('selected', mcq);
        this.props.markForDeletion(mcq);
    }

    render = () => {
        let { mcqItem, isSelectable, isEditable, 
                isDeletable, isChecked } = this.props;
        let mcq = mcqItem ? mcqItem.mcq_meta : null; 
        // console.log(`mcq: ${JSON.parse(mcq)}`);
        let questionOrderIndex = '';
        if(mcqItem && mcqItem.questionOrderIndex) {
            questionOrderIndex = `${mcqItem.questionOrderIndex + 1}`;
        }

        return (
            <div>
            
            {mcq && 
                <ListItem 
                    divider={true} 
                    onClick={this.handleClickOpen}
                    button={true}
                    >
                    <ListItemText 
                        primary={ mcq.question ? mcq.question : mcq.description }
                        secondary={ 
                            `Q ${questionOrderIndex}: ${mcq.category} - ${mcq.skill ? mcq.skill : `${mcq.grade} Chapter No:${mcq.chapterNo}` } ` } >
                    </ListItemText>
                    {isSelectable && 
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => this.props.onAddMcqToTest()}>
                            {!mcq.selected && 
                            <AddBox fontSize="large" color="secondary" />
                            }
                        </IconButton>
                    </ListItemSecondaryAction>}
                    {isDeletable &&
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => this.props.onRemoveMcqFromTest()}>
                            <Remove fontSize="large" color="secondary" />
                        </IconButton>
                    </ListItemSecondaryAction>}
                    {isEditable && 
                    <ListItemSecondaryAction>
                        <Checkbox checked={isChecked} onChange={() => this.handleChange(mcq)} value="checkedA" />
                        <IconButton onClick={() => this.props.onEditClick(mcq)}>
                            <Edit fontSize="small" color="secondary" />
                        </IconButton>
                    </ListItemSecondaryAction>}
                </ListItem>
            }
            {mcq &&
                <Dialog
                    TransitionComponent={Transition}
                    fullScreen
                    style={{left: '20%', right: '20%', top: '10%', bottom: '10%' }}
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle onClose={this.handleClose}>
                        <Typography variant="caption">
                            {mcq.question}
                        </Typography>
                        <Typography variant="caption">
                            {`${mcq.category} - ${mcq.skill}`}
                        </Typography>
                        <IconButton onClick={this.handleClose} style={{right: '4%', top: '1%', position:'absolute'}}>
                            <Close />
                        </IconButton>
                    </DialogTitle>
                    <Divider />
                    <DialogContent style={{padding: '4%'}}>
                        {/* <p>{this.htmlDecode(mcq.description)}</p> */}
                        <div
                            dangerouslySetInnerHTML={{
                                __html: EscapeSpecialCharacters(mcq.description)
                            }}>
                        </div>
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
            }
            </div>
                
        );  
    }
}
export default McqItem;