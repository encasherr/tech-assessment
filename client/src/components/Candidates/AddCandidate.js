import React from 'react';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

class AddCandidate extends React.Component {

    render = () => {
 
        return (
            <Card style={{padding: "4%"}}>
                <form  noValidate autoComplete="off">
                    <CardHeader avatar={
                        <Avatar aria-label="Recipe">
                        +
                        </Avatar>
                    }
                    title="Add Candidate">
                    </CardHeader>
                    <CardContent>
                    <FormControl variant="outlined" style={{width:"30%"}}>
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
                    <FormControl variant="outlined" style={{width:"30%"}}>
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
                    </CardContent>
                    <CardActions>
                    <Button variant="contained" size="large" color="primary">
                        Submit
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
export default AddCandidate;