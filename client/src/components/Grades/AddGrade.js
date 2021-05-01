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

const AddGradeComponent = (props) => {
    let { model } = props;
    let display = (props && props.editMode) ? 'block' : 'none';
    return (
        <Card>
        {!model && <Loading />} 
        {model &&    
            <form  noValidate autoComplete="off">
                <CardHeader 
                avatar={
                    <Avatar aria-label="Recipe" style={styles.avatar}>
                       <AddIcon />
                    </Avatar>
                    }
                    title="Add Class / Grade">
                </CardHeader>
                <CardContent>
                    <div className="row">
                        <div className="col-md-9">
                            <div className="form-group row">
                                <label className="col-md-4 col-form-label">Grade Name</label>
                                <div className="col-md-8">
                                    <input  type="text" 
                                            className="form-control"
                                            value={model.name}
                                            onChange={(e) => props.onFieldChange(e.target.value, 'name', props.model)}
                                            />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <button  className="btn btn-primary" type="button" 
                                        onClick={ () => props.onSubmit(props.model) }>
                                Submit
                            </button>
                        </div>
                    </div>
                </CardContent>
            </form>}
        </Card>
    );
}
export default AddGradeComponent;
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