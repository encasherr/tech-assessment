import React from 'react';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Loading from '../../components/lib/LoadingComponent';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';


const AddOrgComponent = (props) => {
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
                        {!props.editMode && <AddIcon />}
                        {props.editMode && <EditIcon />}
                    </Avatar>
                    }
                    action={
                        <Button style={{display: display}} onClick={() => props.onAdd()}>Add New</Button>
                    }
                    title={props.editMode ? 
                            "Edit Organization" :
                            "Add Organization"} 
                            >
                </CardHeader>
                <CardContent>
                    <FormControl variant="outlined" style={styles.formControl}>
                        <TextField
                            id="outlined-name"
                            label="Name"
                            value={model.org_meta ? model.org_meta.name : ''}
                            onChange={(e) => props.onFieldChange(e.target.value, 'name', props.model)}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <br></br>
                    <FormControl variant="outlined" style={styles.formControl}>
                        <TextField
                            id="outlined-city"
                            label="City"
                            value={model.org_meta ? model.org_meta.city : ''}
                            onChange={(e) => props.onFieldChange(e.target.value, 'city', props.model)}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <br></br>
                    <br></br>
                </CardContent>
                <CardActions style={styles.actionButton}>
                    <Button variant="contained" size="large" color="primary" 
                                onClick={ () => props.onSubmit(props.model) }>
                        {props.editMode ? 'Update' : 'Submit'}
                    </Button>
                </CardActions>
            </form>}
        </Card>
    );
}
export default AddOrgComponent;
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