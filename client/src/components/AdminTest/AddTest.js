import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader, DialogContent, Dialog, DialogTitle, DialogActions, Divider } from '@material-ui/core';
import { MenuItem, OutlinedInput, Select, InputLabel, IconButton } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import SelectCandidateExperience from '../Candidates/SelectCandidateExperience';
import LoadingComponent from '../lib/LoadingComponent';
import { Close  } from '@material-ui/icons';

class AddTest extends Component {

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

    handleSubmit = () => {
      console.log('submit called');
      this.props.onSubmit(this.props.model);
      this.handleClose();
    }
    
    onSubmitExperience = (years, months) => {
        this.props.onFieldChange(years, 'experienceLevel', this.props.model)
    }

    render = () => {
        let { model } = this.props;
        console.log('current_test');
        console.log(model);
        return (
            <div>
            {!model && <LoadingComponent /> } 
            {model && 
            <Card>   
                    <Button variant="contained" color="primary" onClick={this.handleClickOpen}>Create Test</Button>
                
                <Dialog
                fullWidth={true}
                open={this.state.open}
                onClose={this.handleClose}
                >
                <DialogTitle onClose={this.handleClose}>Create a New Test</DialogTitle>
                <Divider />
                <DialogContent style={{padding: '4%'}}>
                    <form  noValidate autoComplete="off">
                            <FormControl variant="outlined" style={styles.formControl}>
                                <InputLabel htmlFor="outlined-skill-simple">
                                    Skill
                                </InputLabel>
                                <Select
                                    onChange={(e) => this.props.onFieldChange(e.target.value, 'skill', this.props.model)}
                                    value={model.test_meta.skill}
                                    input={
                                    <OutlinedInput
                                        labelWidth={65}
                                        name="skill"
                                        id="outlined-skill-simple"
                                    />
                                    }>
                                    <MenuItem value="">
                                    <em>None</em>
                                    </MenuItem>
                                    {this.props.skills && this.props.skills.length > 0 &&
                                        this.props.skills.map((skillItem, index) => {
                                            let item = skillItem.skill_meta;
                                        return (
                                            <MenuItem key={index} value={item.skill}>{item.skill}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" style={styles.formControl}>
                                <TextField
                                    id="outlined-testname"
                                    label="Test Name"
                                    className={styles.dense}
                                    value={model.test_meta.testName}
                                    onChange={(e) => this.props.onFieldChange(e.target.value, 'testName', this.props.model)}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl variant="outlined" style={styles.formControl}>
                                <TextField
                                    id="outlined-email"
                                    label="Test Duration (mins)"
                                    className={styles.dense}
                                    value={model.test_meta.duration}
                                    onChange={(e) => this.props.onFieldChange(e.target.value, 'duration', this.props.model)}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl variant="outlined" style={styles.formControl}>
                                <SelectCandidateExperience 
                                        isTestAdmin={true}
                                        onSubmitExperience={ (years, months) => this.onSubmitExperience(years, months) } />
                            </FormControl>
                    </form>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button variant="contained" size="large" color="primary"
                                        onClick={ () => this.handleSubmit(this.props.model)}>
                            Create Test
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>}
        
            </div>
        );
    }
}
const styles = {
    formControl: {
        width: '80%',
        marginBottom: '4%'
    },
    avatar: {
        backgroundColor: '#555'
    }
};
export default AddTest;