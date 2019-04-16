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
import SelectExperience from './SelectExperience';

class AddMcq extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (ctl) => {

    }

    render = () => {
 
        return (
            <Grid container spacing={0}>
                <Grid item xs={6} sm={6}>

                    <Card style={{padding: "2%"}}>
                        <form  noValidate autoComplete="off">
                            <CardHeader avatar={
                                <Avatar aria-label="Recipe">
                                +
                                </Avatar>
                            }
                            title="Add MCQ"
                            subheader="Multiple Choice Question">
                            </CardHeader>
                            <CardContent>
                            <FormControl variant="outlined" style={{width:"80%"}}>
                            <TextField
                                id="outlined-name"
                                label="Title"
                                className={styles.dense}
                                value=""
                                onChange={this.handleChange('title')}
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
                                onChange={this.handleChange('description')}
                                margin="normal"
                                variant="outlined"
                            />
                            </FormControl>
                            <br></br>
                            <br></br>
                            <FormControl variant="outlined" style={{width:"50%"}}>
                                <InputLabel
                                    ref={ref => {
                                    this.InputLabelRef = ref;
                                    }}
                                    
                                    htmlFor="outlined-age-simple"
                                >
                                    Category
                                </InputLabel>
                                <Select
                                    onChange={this.handleChange}
                                    input={
                                    <OutlinedInput
                                        name="age"
                                        id="outlined-age-simple"
                                    />
                                    }
                                >
                                    <MenuItem value="">
                                    <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <br></br>
                            <br></br>
                            <FormControl variant="outlined" style={{width:"50%"}}>
                            <SelectExperience />
                            </FormControl>
                            </CardContent>
                            <CardActions>
                            <Button variant="contained" size="large" color="primary">
                                Submit
                            </Button>
                            </CardActions>
                        </form>
                    </Card>

                </Grid>
                <Grid item xs={6} sm={6}>

                    <AnswerOptions />
                    
                </Grid>
            </Grid>
        );
    }
}
const styles = theme => ({
    container: {
    //   display: 'flex',
    //   flexWrap: 'wrap',
    //   flex: 2
    padding: "20%"
    },
    textField: {
    //   marginLeft: theme.spacing.unit,
    //   marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: "16px",
      marginLeft: "30px"
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      formControl: {
        width: 320,
      },
      selectEmpty: {
        marginTop: theme.spacing.unit * 2,
      },
});
export default AddMcq;