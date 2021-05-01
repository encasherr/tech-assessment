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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class TestConsoleSettings extends Component {

    render = () => {
        let { currentTest, classes } = this.props;
        console.log('settings', currentTest);
        let emailSubject = (currentTest.test_meta && currentTest.test_meta.settings && currentTest.test_meta.settings.emailSubject) || '';
        let testVisibility = (currentTest && currentTest.test_meta.settings && currentTest.test_meta.settings.testVisibility) ? currentTest.test_meta.settings.testVisibility : '';
        let testSkill = (currentTest && currentTest.test_meta && currentTest.test_meta.skill) ? currentTest.test_meta.skill : '';
        let testCategory = (currentTest && currentTest.test_meta && currentTest.test_meta.category) ? currentTest.test_meta.category : '';
        let testDuration = (currentTest && currentTest.test_meta && currentTest.test_meta.duration) ? currentTest.test_meta.duration : '-';
        let experienceYears = (currentTest && currentTest.test_meta && currentTest.test_meta.experienceYears) ? currentTest.test_meta.experienceYears : '-';
        let createdOn = (currentTest && currentTest.test_meta && currentTest.test_meta.createdOn) ? getDateTime(currentTest.test_meta.createdOn) : '-';
        let createdBy = (currentTest && currentTest.user_meta && currentTest.user_meta.name) ? currentTest.user_meta.name : '-';
        let videoMonitoringRequired = (currentTest && currentTest.test_meta.settings && currentTest.test_meta.settings.videoMonitoringRequired) ? currentTest.test_meta.settings.videoMonitoringRequired : false;

        testSkill = testSkill || ((currentTest && currentTest.test_meta) ? currentTest.test_meta.subject : '');

        
        return (
            <form>
                {/* <Card>
                    <CardContent> */}
                        {/* <div className="row"> */}
                            {/* <div className="col-md-5"> */}
                                {/* <FormControl variant="outlined" style={styles.formControl}>
                                    <TextField
                                        id="outlined-name"
                                        label="Invitation Email Subject"
                                        value={emailSubject}
                                        onChange={(e) => this.props.onFieldChange(e.target.value, 'emailSubject')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl> */}
                                <div className="form-group row">
                                    <label className="col-md-5 col-form-label">Invite-Email Subject</label>
                                    <div className="col-md-7">
                                        <input  type="text" 
                                                className="form-control"
                                                value={emailSubject}
                                                onChange={(e) => this.props.onFieldChange(e.target.value, 'emailSubject')}
                                                />
                                    </div>
                                </div>
                            {/* </div>
                            <div className="row"> */}
                                {/* <FormControl variant="outlined" style={styles.formControl}>
                                    <TextField
                                        disabled
                                        id="outlined-name"
                                        label="Test Duration (Minutes)"
                                        value={testDuration}
                                        onChange={(e) => this.props.onFieldChange(e.target.value, 'duration')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl> */}
                                 <div className="form-group row">
                                    <label for="inputEmail3" className="col-md-5 col-form-label">Test Duration (Minutes)</label>
                                    <div className="col-md-7">
                                        <input  type="number" 
                                                className="form-control"
                                                value={testDuration}
                                                onChange={(e) => this.props.onFieldChange(e.target.value, 'duration')}
                                                />
                                    </div>
                                </div>
                            {/* </div> */}
                            {/* <div className="row"> */}
                                {/* <FormControl variant="outlined" style={styles.formControl}>
                                    <TextField
                                        disabled
                                        id="outlined-name"
                                        label="Skill"
                                        value={testSkill}
                                        onChange={(e) => this.props.onFieldChange(e.target.value, 'skill')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl> */}
                                 <div className="form-group row">
                                    <label for="inputEmail3" className="col-md-5 col-form-label">Skill</label>
                                    <div className="col-md-7">
                                        <input  type="text" 
                                                className="form-control"
                                                value={testSkill}
                                                onChange={(e) => this.props.onFieldChange(e.target.value, 'skill')}
                                                />
                                    </div>
                                </div>
                                 <div className="form-group row">
                                    <label for="inputEmail3" className="col-md-5 col-form-label">Category</label>
                                    <div className="col-md-7">
                                        <input  type="text" 
                                                className="form-control"
                                                value={testCategory}
                                                onChange={(e) => this.props.onFieldChange(e.target.value, 'category')}
                                                />
                                    </div>
                                </div>
                            {/* </div>
                            <div className="row"> */}
                                {/* <FormControl variant="outlined" style={styles.formControl}>
                                    <TextField
                                        disabled
                                        id="outlined-name"
                                        label="Experience (Years)"
                                        value={experienceYears}
                                        onChange={(e) => this.props.onFieldChange(e.target.value, 'experienceYears')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl> */}
                                 <div className="form-group row">
                                    <label for="inputEmail3" className="col-md-5 col-form-label">Experience (Years)</label>
                                    <div className="col-md-7">
                                        <input  type="number" 
                                                className="form-control"
                                                value={experienceYears}
                                                onChange={(e) => this.props.onFieldChange(e.target.value, 'experienceYears')}
                                                />
                                    </div>
                                </div>
                            {/* </div> */}
                            {/* </div> */}
                        {/* <div className="row mt-5"> */}
                            {/* <div className="col-md-3">
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
                            </div> */}
                            <div className="form-group row">
                                    <label for="inputEmail3" className="col-md-5 col-form-label">Test Visibility</label>
                                    <div className="col-md-7">
                                    <select class="form-control" 
                                        value={testVisibility}
                                        onChange={(e) => this.props.onFieldChange(e.target.value, 'testVisibility')}
                                        >
                                    {['Public', 'InvitedCandidates'].map((item, index) => {
                                    return <option key={index} value={item}>{item}</option>
                                    })}
                                    </select>
                                    </div>
                            </div>
                            {/* <div className="col-md-3">
                                <FormControl variant="outlined" style={styles.formControl}>
                                <FormControlLabel
                                    control={
                                    <Switch
                                        checked={videoMonitoringRequired}
                                        // onChange={handleChange}
                                        onChange={(e) => this.props.onFieldChange(e.target.checked, 'videoMonitoringRequired')}
                                        color="secondary"
                                    />
                                    }
                                    label="Video Monitoring Required"
                                />
                                </FormControl>
                            </div> */}
                            <div class="form-group row">
                                <label class="col-md-6 col-form-label form-check-label" >
                                Video Monitoring Required
                                </label>
                                <div className="col-md-6">
                                    <input class="form-check-input" type="checkbox" 
                                            checked={videoMonitoringRequired}
                                            onChange={(e) => this.props.onFieldChange(e.target.checked, 'videoMonitoringRequired')}
                                            />
                                </div>
                            </div>
                            <div className="col-md-3"></div>
                            <div className="col-md-3"></div>
                            
                        {/* </div> */}
                        <div className="font-italic text-right">
                            Created on {getDateTime(createdOn, true)} by {createdBy}
                        </div>
                    {/* </CardContent> */}
                    {/* <CardActions style={styles.actionButton}> */}
                        <Button variant="contained" size="large" color="primary"
                            onClick={() => this.props.onSubmitTestSettings()}>
                            Submit
                        </Button>
                    {/* </CardActions> */}
                {/* </Card> */}
            </form>
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