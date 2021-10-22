import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { CardHeader, CardContent, IconButton } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ListIcon from '@material-ui/icons/ViewHeadline';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField'
import Collapse from '@material-ui/core/Collapse';
import Remove from '@material-ui/icons/Remove';
import { formatToDecimals, getDateTime } from '../../Utils';

const TestsTakenList = (props) => {
        console.log('testTakenList',props.testsTakenList);
        if(!props.testsTakenList || props.testsTakenList.length === 0) {
            return(
                <div className="container mt-4">
                <Typography variant="h6" align="center">
                    You have not taken tests yet.
                </Typography>
                </div>
                )
        }
        return (
            <div className="card border-0">
                    <div className="card-body">
                
                        {props.testsTakenList && props.testsTakenList.length > 0
                        && props.testsTakenList.map((testsTakenItem, index) => {
                            //let item = JSON.parse(testsTakenItem);
                            // let evaluationMeta = JSON.parse(testsTakenItem.evaluation_meta);
                            let evaluationMeta = testsTakenItem.evaluation_meta;
                            return(
                            <div className="border-bottom">
                                <div className="card-title text-center">
                                    {testsTakenItem.testName}
                                </div>
                                <div className="row ml-4">
                                        <div className="col-md-3 font-weight-light">Score</div>
                                        <div className="col-md-9">{formatToDecimals(evaluationMeta.scorePercentage,2)}%</div>
                                </div>
                                <div className="row ml-4 mt-3">
                                        <div className="col-md-3 font-weight-light">Taken On</div>
                                        <div className="col-md-9">{getDateTime(testsTakenItem.modifiedOn)}</div>
                                </div>
                                <div className="row ml-4 mt-3 mb-4">
                                        <div className="col-md-3 font-weight-light">Result</div>
                                        <div className="col-md-9">{evaluationMeta.result}</div>
                                </div>
                            </div>
                            )
                        })}
            </div>
            </div>
                
        );
}

export default TestsTakenList;

const styles = {
    avatar: {
        backgroundColor: '#555'
    },
    formControl: {
        width: '70%'
    }
}