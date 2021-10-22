import React, { Component } from 'react';
import { Dialog, DialogContent, DialogTitle,
    Divider, DialogActions, Card, CardHeader, Button, IconButton, CardContent, Slide, List, Typography } from '@material-ui/core';
import config from '../../config';
import axios from 'axios';
import McqItem from './McqItem';
import { Close, Add } from '@material-ui/icons';
import repository from '../../repository';

const Transition = (props) => {
    return <Slide direction="left" {...props} />
}

class McqSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            mcqList: [],
            error: ''
        };
    }

    componentDidMount = () => {
        let url = config.instance.getAdminApiUrl(); // + 'getAllMcqs';
        let  { grade, skill } = this.props;
        // let url = config.instance.getAdminApiUrl() + 'getMcqsBySkill' + `${this.props.skill ? '?skill=' + this.props.skill : ''}`;
        if(grade) { 
            url += `getMcqsByGrade?grade=${grade}`;
        }
        else {
            url += `getMcqsBySkill?skill=${skill}`;
        }
        repository.getData(url)
            .then((res) => {
                console.log('MCQ fetched');
                this.setState({
                    mcqList: res.data,
                    error: ''
                });
            })
            .catch((err) => {
                this.setState({
                    error: err
                });
            });
    }

    onSelectMcqItem = (mcqItem) => {
        this.props.onSelectMcq(mcqItem);
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        console.log('handle close');
        this.setState({ open: false });
    };

    render = () => {
        let { onAddMcqToTest, selectedMcqs } = this.props;
        let { mcqList } = this.state;
        if(selectedMcqs && selectedMcqs.length > 0) {
            selectedMcqs.map((item, index) => {
            })
        }
        return (
            <div>
            <Card>   
                <Button color="primary" onClick={this.handleClickOpen}><Add /></Button>
                <Dialog
                TransitionComponent={Transition}
                fullScreen
                style={{left: '20%'}}
                open={this.state.open}
                onClose={this.handleClose}
                >
                    <DialogTitle onClose={this.handleClose}>
                        <Typography variant="h6">
                            Select MCQ to Add ({mcqList ? mcqList.length : 0})
                        </Typography>
                        <IconButton onClick={this.handleClose} style={{right: '4%', top: '1%', position:'absolute'}}>
                            <Close />
                        </IconButton>
                    </DialogTitle>
                    <Divider />
                    <DialogContent style={{padding: '4%'}}>
                    <List>
                        {mcqList && mcqList.length > 0 &&
                        mcqList.map((item, index) => {
                            if(selectedMcqs && selectedMcqs.findIndex(mcq => {
                                return (mcq.id == item.id) || (mcq.id === item.id)
                            }) > -1) {
                                item.selected = true;
                            } else {
                                item.selected = false;
                            }
                            return (
                            <McqItem    mcqItem={item} key={index}
                                        onAddMcqToTest={() => this.props.onSelectMcq(item) } 
                                        isSelectable={true}
                                        isEditable={false} />
                            );
                        })}
                    </List>
                    </DialogContent>
                </Dialog>
            </Card>
        
            </div>

        )
    }
}
export default McqSelector;