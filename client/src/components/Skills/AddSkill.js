import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField'
import ReduxTextField from '@material-ui/core/TextField'
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
import { CardHeader, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Loading from '../lib/LoadingComponent';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { AddCategory } from '../../actions/CategoryActions';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import classnames from 'classnames';


const AddSkillComponent = (props) => {
    let { model } = props;
    let display = (props && props.editMode) ? 'block' : 'none';
    return (
        <Card style={{padding: "4%"}}>
        {!model && <Loading />} 
        {model &&    
            <form  noValidate autoComplete="off">
                <CardHeader 
                avatar={
                    <Avatar aria-label="Recipe" style={styles.avatar}>
                       <AddIcon />
                    </Avatar>
                    }
                    title="Add Skill">
                </CardHeader>
                <CardContent>
                    <FormControl variant="outlined" style={styles.formControl}>
                        <TextField
                            id="outlined-name"
                            label="Skill"
                            value={model.skill}
                            onChange={(e) => props.onFieldChange(e.target.value, 'skill', props.model)}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <br></br>
                </CardContent>
                <CardActions style={styles.actionButton}>
                    <Button variant="contained" size="large" color="primary" 
                                onClick={ () => props.onSubmit(props.model) }>
                        Submit
                    </Button>
                </CardActions>
            </form>}
        </Card>
    );
}
export default AddSkillComponent;
const styles={
    formControl: {
        width: '90%'
    },
    actionButton: {
        marginLeft: '70%'
    },
    avatar: {
        backgroundColor: '#555'
    }
}