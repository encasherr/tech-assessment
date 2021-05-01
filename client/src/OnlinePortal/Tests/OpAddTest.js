import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader, DialogContent, Dialog, DialogTitle, DialogActions, Divider } from '@material-ui/core';
import { MenuItem, OutlinedInput, Select, InputLabel, IconButton } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import LoadingComponent from '../../components/lib/LoadingComponent';
import { Close  } from '@material-ui/icons';
import config from '../../config';

class OpAddTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            grades: config.instance.Grades
        };
    }
        
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        console.log('handle close');
        this.setState({ open: false });
    };

    handleSubmit = () => {
      console.log('submit called');
      this.props.onSubmit(this.props.model);
      this.handleClose();
    }

    render = () => {
        let { model } = this.props;
        let { grades } = this.state;

        console.log('current_test');
        console.log(model);
        return (
            <div>
            {!model && <LoadingComponent /> } 
            {model && 
            <Card>   
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>Create Test</Button>
                
                <Dialog
                fullWidth={true}
                open={this.state.open}
                onClose={this.handleClose}
                >
                <DialogTitle onClose={this.handleClose}>Create a New Test</DialogTitle>
                <Divider />
                <DialogContent style={{padding: '4%'}}>
                    <form  noValidate autoComplete="off">
                            <FormControl variant="outlined" style={styles.formControl}>
                                <InputLabel htmlFor="outlined-grade">
                                    Grade
                                </InputLabel>
                                <Select
                                    onChange={(e) => this.props.onFieldChange(e.target.value, 'grade', this.props.model)}
                                    value={model.test_meta.grade}
                                    input={
                                    <OutlinedInput
                                        labelWidth={65}
                                        name="grade"
                                        id="outlined-grade"
                                    />
                                    }>
                                    <MenuItem value="">
                                    <em>None</em>
                                    </MenuItem>
                                    {grades && grades.length > 0 &&
                                        grades.map((gradeItem, index) => {
                                        return (
                                            <MenuItem key={index} value={gradeItem}>{gradeItem}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" style={styles.formControl}>
                                <TextField
                                    id="outlined-testname"
                                    label="Test Name"
                                    className={styles.dense}
                                    value={model.test_meta.testName}
                                    onChange={(e) => this.props.onFieldChange(e.target.value, 'testName', this.props.model)}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl variant="outlined" style={styles.formControl}>
                                <TextField
                                    id="outlined-subject"
                                    label="Subject"
                                    className={styles.dense}
                                    value={model.test_meta.subject}
                                    onChange={(e) => this.props.onFieldChange(e.target.value, 'subject', this.props.model)}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl variant="outlined" style={styles.formControl}>
                                <TextField
                                    id="outlined-duration"
                                    label="Test Duration (mins)"
                                    className={styles.dense}
                                    value={model.test_meta.duration}
                                    onChange={(e) => this.props.onFieldChange(e.target.value, 'duration', this.props.model)}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </FormControl>
                    </form>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button variant="contained" size="large" color="primary"
                                        onClick={ () => this.handleSubmit(this.props.model)}>
                            Create Test
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>}
        
            </div>
        );
    }
}
const styles = {
    formControl: {
        width: '80%',
        marginBottom: '4%'
    },
    avatar: {
        backgroundColor: '#555'
    }
};
export default OpAddTest;