import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { CardHeader } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import AnswerOptions from './AnswerOptions';
import AddAnswerOptionComponent from './AddAnswerOption';
import SelectExperience from './SelectExperience';
import LoadingComponent from '../lib/LoadingComponent';
import AddIcon from '@material-ui/icons/Add';

const AddMcq = (props) => {
        let { model } = props;

        return (
            <Card>
        {!model && <LoadingComponent />} 
        {model &&    
                        <form  noValidate autoComplete="off">
                            <CardHeader avatar={
                                <Avatar aria-label="Recipe" style={styles.avatar}>
                                    <AddIcon />
                                </Avatar>
                            }
                            title="Add MCQ"
                            subheader="Multiple Choice Question">
                            </CardHeader>
                            <CardContent>
                                <FormControl variant="outlined" style={{width:"50%"}}>
                                    <InputLabel htmlFor="outlined-category-simple">
                                        Category
                                    </InputLabel>
                                    <Select
                                        onChange={(e) => props.onFieldChange(e.target.value, 'category', props.model)}
                                        value={model.category}
                                        input={
                                        <OutlinedInput
                                            labelWidth={65}
                                            name="category"
                                            id="outlined-category-simple"
                                        />
                                        }>
                                        <MenuItem value="">
                                        <em>None</em>
                                        </MenuItem>
                                        {props.categories && props.categories.length > 0 &&
                                            props.categories.map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item.title}>{item.title}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <br></br>
                                <FormControl variant="outlined" style={{width:"80%"}}>
                                    <TextField
                                        id="outlined-name"
                                        label="Question"
                                        className={styles.dense}
                                        value={model.question}
                                        onChange={(e) => props.onFieldChange(e.target.value, 'question', props.model)}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl>
                                <br></br>
                                <FormControl variant="outlined" style={{width:"80%"}}>
                                    <TextField
                                        id="outlined-name"
                                        label="Description"
                                        multiline
                                        rows="4"
                                        className={styles.dense}
                                        onChange={(e) => props.onFieldChange(e.target.value, 'description', props.model)}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl>
                                <br></br>
                                <br></br>
                                <FormControl variant="outlined" style={{width:"50%"}}>
                                    <InputLabel
                                        htmlFor="outlined-skill-simple">
                                        Skill
                                    </InputLabel>
                                    <Select
                                        onChange={(e) => props.onFieldChange(e.target.value, 'skill', props.model)}
                                        value={model.skill}
                                        input={
                                        <OutlinedInput
                                            labelWidth={30}
                                            name="skill"
                                            id="outlined-skill-simple"
                                        />
                                        }>
                                        <MenuItem value="">
                                        <em>None</em>
                                        </MenuItem>
                                        {props.skills && props.skills.map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item.skill}>{item.skill}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <br></br>
                                <br></br>
                                <FormControl variant="outlined" style={{width:"50%"}}>
                                    <SelectExperience />
                                </FormControl>
                                <br></br>
                                <br></br>
                                <AddAnswerOptionComponent>
                                    {props}
                                </AddAnswerOptionComponent>
                            </CardContent>
                            <CardActions>
                            <Button variant="contained" size="large" color="primary" 
                                    onClick={ () => props.onSubmit(props.model)}>
                                Submit
                            </Button>
                            </CardActions>
                        </form>
        }
                    </Card>
                   
        );
}
const styles = theme => ({
    formControl: {
        width: '70%',
    },
    avatar: {
        backgroundColor: '#555'
    }
});
export default AddMcq;