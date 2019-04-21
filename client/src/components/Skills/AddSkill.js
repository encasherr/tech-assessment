import React from 'react';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Loading from '../lib/LoadingComponent';
import AddIcon from '@material-ui/icons/Add';

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