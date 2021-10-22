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
import TestsTakenList from './TestsTakenList';
import RegisteredTestsList from './RegisteredTestList';
import StudentDashboard from '../../components/StudentDashboard';

const RegisteredTestTab = (props) => {
    return (
        <>
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a  class="nav-item nav-link active" id="nav-upcoming-tab" 
                        data-toggle="tab" href="#nav-upcoming" role="tab" aria-controls="nav-upcoming" aria-selected="true">
                           Upcoming
                    </a>
                    <a  class="nav-item nav-link" id="nav-home-tab" 
                        data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">
                           Active
                    </a>
                    <a  class="nav-item nav-link" id="nav-profile-tab" 
                        data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" 
                        aria-selected="false">
                            Completed
                    </a>
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-upcoming" role="tabpanel" 
                     aria-labelledby="nav-upcoming-tab">
                    <StudentDashboard {...props} />
                </div>
                <div class="tab-pane fade show" id="nav-home" role="tabpanel" 
                     aria-labelledby="nav-home-tab">
                    <RegisteredTestsList {...props} />
                </div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <TestsTakenList {...props} />
                </div>
            </div>
        </>
    );
}

export default RegisteredTestTab;

const styles = {
    avatar: {
        backgroundColor: '#555'
    },
    formControl: {
        width: '70%'
    }
}