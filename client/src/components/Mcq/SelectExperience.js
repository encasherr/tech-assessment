import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const experienceLevel = [
    0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
];

class SelectExperience extends Component{

    state = {
        open: false,
        age: '',
    };

    handleChange = name => event => {
        this.setState({ [name]: Number(event.target.value) });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    render = () => {
    return (
        <div>
        <Button variant="outlined" onClick={this.handleClickOpen}>Select Experience Level</Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Select Experience Level</DialogTitle>
          <DialogContent>
            <form >
                <br></br>
                <br></br>
              <FormControl style={styles.formControl} variant="outlined" style={{width:"45%", marginLeft:"5%"}}>
                <InputLabel htmlFor="age-native-simple">Minimum</InputLabel>
                <Select
                  value={this.state.age}
                  onChange={this.handleChange('age')}
                  input={<Input id="age-native-simple" />}
                >
                {experienceLevel.map((item, index) => {
                  return <MenuItem key={index} value={item}>{item}</MenuItem>
                })}
                  {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>
              <FormControl style={styles.formControl} variant="outlined" style={{width:"45%", marginLeft:"5%"}}>
                <InputLabel htmlFor="age-simple">Maximum</InputLabel>
                <Select
                  value={this.state.age}
                  onChange={this.handleChange('age')}
                  input={<Input id="age-simple" />}
                >
                {experienceLevel.map((item, index) => {
                  return <MenuItem key={index} value={item}>{item}</MenuItem>
                })}
                  {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
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
export default SelectExperience;