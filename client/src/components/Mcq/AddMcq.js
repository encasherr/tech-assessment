import React from 'react';
import TextField from '@material-ui/core/TextField'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import AddAnswerOptionComponent from './AddAnswerOption';
import SelectExperience from './SelectExperience';
import LoadingComponent from '../lib/LoadingComponent';
import AddIcon from '@material-ui/icons/Add';
// import { withRouter } from 'react-router-dom';
import { KeyboardBackspace } from '@material-ui/icons';

const AddMcq = (props) => {
        let { model, editMode } = props;

        const onSubmitExperience = (min, max) => {
            console.log('add mcq handler for experience called');
            props.onFieldChange(min, 'minimumExperience', props.model)
            props.onFieldChange(max, 'maximumExperience', props.model)
        }

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
                            action={
                                <Button color="primary" size="large" variant="outlined"
                                        onClick={() => props.history.goBack() }>
                                    <KeyboardBackspace />
                                </Button>
                            }
                            title={editMode ? "Edit MCQ" : "Add MCQ"}
                            subheader="Multiple Choice Question">
                            </CardHeader>
                            <CardContent>
                                <FormControl variant="outlined" style={styles.formControl}>
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
                                <FormControl variant="outlined" style={styles.formControl}>
                                    <TextField
                                        id="outlined-name"
                                        label="Title"
                                        className={styles.dense}
                                        value={model.question}
                                        onChange={(e) => props.onFieldChange(e.target.value, 'question', props.model)}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl variant="outlined" style={styles.formControl}>
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
                                <FormControl variant="outlined" style={styles.formControl}>
                                    <SelectExperience 
                                        onSubmitExperience={ (min, max) => onSubmitExperience(min, max) } />
                                </FormControl>
                                <FormControl variant="outlined" style={styles.formControl}>
                                    <TextField
                                        id="outlined-name"
                                        label="Question Description"
                                        multiline
                                        rows="4"
                                        value={model.description}
                                        className={styles.dense}
                                        onChange={(e) => props.onFieldChange(e.target.value, 'description', props.model)}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl>
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
const styles = {
    formControl: {
        width: '70%',
        marginBottom: '1%'
    },
    avatar: {
        backgroundColor: '#555'
    }
};
export default AddMcq;