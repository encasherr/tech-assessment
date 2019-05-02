import React from 'react';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import SelectCandidateExperience from './SelectCandidateExperience';
import LoadingComponent from '../lib/LoadingComponent';

const AddCandidate = (props) => {
        let { model } = props;

        const onSubmitExperience = (years, months) => {
            props.onFieldChange(years, 'experienceYears', props.model)
            props.onFieldChange(months, 'experienceMonths', props.model)
        }

        return (
            <Card>
            {!model && <LoadingComponent /> } 
            {model &&    
                <form  noValidate autoComplete="off">
                    <CardHeader avatar={
                        <Avatar aria-label="Recipe">
                        +
                        </Avatar>
                    }
                    title="Add Candidate">
                    </CardHeader>
                    <CardContent>
                    <FormControl variant="outlined" style={{width:"80%"}}>
                        <TextField
                            id="outlined-name"
                            label="Full Name"
                            className={styles.dense}
                            value={model.fullName}
                            onChange={(e) => props.onFieldChange(e.target.value, 'fullName', props.model)}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <br></br>
                    <FormControl variant="outlined" style={{width:"80%"}}>
                        <TextField
                            id="outlined-email"
                            label="Email"
                            className={styles.dense}
                            value={model.email}
                            onChange={(e) => props.onFieldChange(e.target.value, 'email', props.model)}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <br></br>
                    <FormControl variant="outlined" style={{width:"80%"}}>
                        <TextField
                            id="outlined-contactno"
                            label="Contact Number"
                            className={styles.dense}
                            value={model.contactno}
                            onChange={(e) => props.onFieldChange(e.target.value, 'contactno', props.model)}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <br></br>
                    <FormControl variant="outlined" style={{width:"80%"}}>
                        <SelectCandidateExperience onSubmitExperience={ (years, months) => onSubmitExperience(years, months) } />
                    </FormControl>
                    <br></br>
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
export default AddCandidate;