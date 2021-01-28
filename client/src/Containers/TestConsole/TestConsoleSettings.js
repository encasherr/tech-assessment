import React, { Component } from 'react';
import classNames from 'classnames';
import {
    Card, CardContent, CardActions, FormControl, TextField,
    Button,
    Typography
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getDateTime } from '../../Utils';

class TestConsoleSettings extends Component {

    render = () => {
        let { currentTest, classes } = this.props;
        console.log('settings', currentTest);
        let emailSubject = (currentTest.test_meta && currentTest.test_meta.settings && currentTest.test_meta.settings.emailSubject) || '';
        let testVisibility = (currentTest && currentTest.test_meta.settings && currentTest.test_meta.settings.testVisibility) ? currentTest.test_meta.settings.testVisibility : '';
        let testSkill = (currentTest && currentTest.test_meta && currentTest.test_meta.skill) ? currentTest.test_meta.skill : '-';
        let testDuration = (currentTest && currentTest.test_meta && currentTest.test_meta.duration) ? currentTest.test_meta.duration : '-';
        let experienceYears = (currentTest && currentTest.test_meta && currentTest.test_meta.experienceYears) ? currentTest.test_meta.experienceYears : '-';
        let createdOn = (currentTest && currentTest.test_meta && currentTest.test_meta.createdOn) ? getDateTime(currentTest.test_meta.createdOn) : '-';
        let createdBy = (currentTest && currentTest.user_meta && currentTest.user_meta.name) ? currentTest.user_meta.name : '-';

        return (
            <div>
                <Card>
                    <CardContent>
                        <div className="row">
                            <div className="col-md-3">
                                <FormControl variant="outlined" style={styles.formControl}>
                                    <TextField
                                        id="outlined-name"
                                        label="Invitation Email Subject"
                                        value={emailSubject}
                                        onChange={(e) => this.props.onFieldChange(e.target.value, 'emailSubject')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl>
                            </div>
                            <div className="col-md-3">
                                <FormControl variant="outlined" style={styles.formControl}>
                                    <TextField
                                        disabled
                                        id="outlined-name"
                                        label="Test Duration (Minutes)"
                                        value={testDuration}
                                        onChange={(e) => this.props.onFieldChange(e.target.value, 'duration')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl>
                            </div>
                            <div className="col-md-3">
                                <FormControl variant="outlined" style={styles.formControl}>
                                    <TextField
                                        disabled
                                        id="outlined-name"
                                        label="Skill"
                                        value={testSkill}
                                        onChange={(e) => this.props.onFieldChange(e.target.value, 'skill')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl>
                            </div>
                            <div className="col-md-3">
                                <FormControl variant="outlined" style={styles.formControl}>
                                    <TextField
                                        disabled
                                        id="outlined-name"
                                        label="Experience (Years)"
                                        value={experienceYears}
                                        onChange={(e) => this.props.onFieldChange(e.target.value, 'experienceYears')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl>
                            </div>
                            </div>
                        <div className="row mt-5">
                        <div className="col-md-3">
                                <FormControl variant="outlined" style={styles.formControl}>
                                    <InputLabel htmlFor="testVisibility">Test Visibility</InputLabel>
                                    <Select
                                    value={testVisibility}
                                    onChange={(e) => this.props.onFieldChange(e.target.value, 'testVisibility')}
                                    input={<Input id="testVisibility" />}
                                    >
                                    {['Public', 'InvitedCandidates'].map((item, index) => {
                                    return <MenuItem key={index} value={item}>{item}</MenuItem>
                                    })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-3"></div>
                            <div className="col-md-3"></div>
                            <div className="col-md-3">
                                <div className={classNames(classes.palettePrimaryDark, 'card')}>
                                    <div className="row card-body">
                                        <div className="col-md-5">
                                            <p className="font-weight-bold card-text">Created On: </p>
                                        </div>
                                        <div className="col-md-7">
                                            <p className="text-left">{createdOn}</p>
                                        </div>
                                        <div className="col-md-5">
                                            <p className="font-weight-bold card-text">Created By: </p>
                                        </div>
                                        <div className="col-md-7">
                                            <p className="text-left">{createdBy}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </CardContent>
                    <CardActions style={styles.actionButton}>
                        <Button variant="contained" size="large" color="primary"
                            onClick={() => this.props.onSubmitTestSettings()}>
                            Submit
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}
export default TestConsoleSettings;
const styles = {
    formControl: {
        width: '90%'
    },
    avatar: {
        backgroundColor: '#555'
    }
}