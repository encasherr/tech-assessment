import React from 'react';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { Card, Grid } from '@material-ui/core';
import { MenuItem, OutlinedInput, Select, InputLabel, IconButton } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import LoadingComponent from '../../components/lib/LoadingComponent';
import AuthHelper from '../../AuthHelper';

const EditUser = (props) => {
        let { model } = props;

        // const onSubmitExperience = (years, months) => {
        //     props.onFieldChange(years, 'experienceYears', props.model)
        //     props.onFieldChange(months, 'experienceMonths', props.model)
        // }

        return (
            <div>
            {!model && <LoadingComponent /> } 
            {model &&    
                <form  noValidate autoComplete="off">
                    {/* <CardHeader avatar={
                        <Avatar aria-label="Recipe">
                        +
                        </Avatar>
                    }
                    title="Edit User">
                    </CardHeader> */}
                    {/* <CardContent> */}
                    <Grid container spacing={0}>
                            <Grid item xs={6} sm={6}>
                                <FormControl variant="standard">
                                    {/* <InputLabel htmlFor="outlined-role-simple">
                                        Role
                                    </InputLabel> */}
                                    <Select
                                        onChange={(e) => props.onFieldChange(e.target.value, 'role', model)}
                                        value={model.role}
                                        >
                                        <MenuItem value="">
                                        <em>None</em>
                                        </MenuItem>
                                        {AuthHelper.UserRoles() && AuthHelper.UserRoles().length > 0 &&
                                            AuthHelper.UserRoles().map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <Button variant="contained" size="small" color="primary" 
                                        onClick={ () => props.onUpdateUser(props.model)}>
                                    Update
                                </Button>
                            </Grid>
                    </Grid>
                    
                    {/* <br></br>
                    <FormControl variant="outlined" style={{width:"80%"}}>
                        <TextField
                            id="outlined-email"
                            label="Email"
                            className={styles.dense}
                            value={model.emailId}
                            onChange={(e) => props.onFieldChange(e.target.value, 'email', props.model)}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <br></br> */}
                    {/* </CardContent> */}
                    {/* <CardActions>
                    <Button variant="contained" size="small" color="primary" style={{marginLeft: '70%'}}
                                    onClick={ () => props.onUpdateUser(props.model)}>
                        Update
                    </Button>
                    </CardActions> */}
                </form>
            }
            </div>
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
// const UserRoles = [ "guest", "recruiter", "candidate", "admin" ];
export default EditUser;