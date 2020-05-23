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
        let { model, UserRoles } = props;

       
        return (
            <div>
            {!model && <LoadingComponent /> } 
            {model &&    
                <form  noValidate autoComplete="off">
                    <Grid container spacing={0}>
                            <Grid item xs={6} sm={6}>
                                <FormControl variant="standard">
                                   <Select
                                        onChange={(e) => props.onFieldChange(e.target.value, 'role', model)}
                                        value={model.user_meta.role}
                                        >
                                        <MenuItem value="">
                                        <em>None</em>
                                        </MenuItem>
                                        {UserRoles && UserRoles.length > 0 &&
                                            UserRoles.map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                            </Grid>
                    </Grid>
                    

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
export default EditUser;