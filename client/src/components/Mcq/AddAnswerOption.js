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

class AddAnswerOption extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (ctl) => {

    }

    render = () => {
 
        return (
            <Card style={{padding: "4%"}}>
                <form  noValidate autoComplete="off">
                    <CardHeader avatar={
                        <Avatar aria-label="Recipe">
                        +
                        </Avatar>
                    }
                    title="Add Answer Option">
                    </CardHeader>
                    <CardContent>
                    <FormControl variant="outlined" style={{width:"30%"}}>
                    <TextField
                        id="outlined-name"
                        label="Option Text"
                        className={styles.dense}
                        value=""
                        onChange={this.handleChange('title')}
                        margin="normal"
                        variant="outlined"
                    />
                    </FormControl>
                    <br></br>
                    </CardContent>
                    <CardActions>
                    <Button variant="contained" size="large" color="primary">
                        Add
                    </Button>
                    </CardActions>
                </form>
            </Card>
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
export default AddAnswerOption;