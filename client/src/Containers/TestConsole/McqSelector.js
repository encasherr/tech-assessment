import React, { Component } from 'react';
import { Dialog, DialogContent, DialogTitle,
    Divider, DialogActions, Card, CardHeader, Button, IconButton, CardContent, Slide, List, Typography } from '@material-ui/core';
import config from '../../config';
import axios from 'axios';
import McqItem from './McqItem';
import { Close } from '@material-ui/icons';
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
            
        let url = config.adminApiUrl + 'getAllMcqs';
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
                // console.log(`selectedMcq: ${item.$loki}`);
            })
        }
        return (
            <div>
            <Card>   
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>Add Mcq To Test</Button>
                <Dialog
                TransitionComponent={Transition}
                fullScreen
                style={{left: '20%'}}
                open={this.state.open}
                onClose={this.handleClose}
                >
                    <DialogTitle onClose={this.handleClose}>
                        <Typography variant="title">
                            Select MCQ to Add
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
                            // console.log(`item: ${item.$loki}`);
                            if(selectedMcqs && selectedMcqs.findIndex(mcq => {
                                console.log(`${mcq.$loki} == ${item.$loki}, ${mcq.$loki == item.$loki}`);
                                return (mcq.$loki == item.$loki) || (mcq.$loki === item.$loki)
                            }) > -1) {
                                // console.log(`selected mcq: ${item.question}, total: ${mcqList.length}`);
                                item.selected = true;
                            } else {
                                // console.log(`selected mcq: ${item.$loki}, total: ${mcqList.length}`);
                                item.selected = false;
                            }
                            return (
                            <McqItem    mcq={item} key={index}
                                        onAddMcqToTest={() => this.props.onSelectMcq(item) } 
                                        isSelectable={true} />
                            );
                        })}
                    </List>
                    </DialogContent>
                        {/* <Divider />
                    <DialogActions>
                        <Button variant="contained" size="large" color="primary"
                                        onClick={ () => this.handleSubmit(this.props.model)}>
                            Create Test
                        </Button>
                    </DialogActions> */}
                </Dialog>
            </Card>
        
            </div>

        )
    }
}
export default McqSelector;