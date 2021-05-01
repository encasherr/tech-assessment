import React, { Component, useState } from 'react';
import classNames from 'classnames';
import { ListItem, List, ListItemText, Grid, Typography,
        Avatar, 
        ListItemAvatar,
        Button} from '@material-ui/core';
import { AccountBox } from '@material-ui/icons';
import { getDateTime, formatToDecimals } from '../../Utils';
import config from '../../config';

class CandidateRecording extends Component {

    componentDidMount = () => {
        this.props.fetchRecordings(this.props.responseId);
    }

    render = () => {
        let { classes, responseId, responseRecordings} = this.props;
        console.log('responseRecordings', responseRecordings);
        let baseApiUrl = `${config.instance.getCandidateApiUrl()}getRecording?`;
        
        if(responseRecordings && responseRecordings.length === 0) {
            return (
                <div className="alert alert-info">
                    No recordings found
                </div>
            )
        }
        
        return (
            <div className="card">
                <div className="card-body">
                    <div className="row">
                    {responseRecordings && responseRecordings.length > 0 &&
                    responseRecordings.map((recordingItem, index) => {
                        
                        return (   
                            <div className="col-md-3">
                                <video key={index} width="160" height="120" controls>
                                    <source src={`${baseApiUrl}fileName=${recordingItem}&responseId=${responseId}`}
                                        type="video/webm" />
                                </video>
                                <p class="card-text">
                                {recordingItem}
                                </p>
                            </div>
                        )}
                    )}
                    </div>
                </div>
            </div>
        )
    }
}
export default CandidateRecording;