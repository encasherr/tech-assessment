import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const years = [
    0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
];
const months = [
    0,1,2,3,4,5,6,7,8,9,10,11
];

class SelectCandidateExperience extends Component{

    state = {
        open: false,
        min: '',
    };
    constructor(props) {
      super(props);
      this.state = {
        open: false,
        years: 0,
        months: 0
      };
    }

      handleChange = name => event => {
        switch(name)
        {
          case 'years':
          {
            this.setState({
              years: event.target.value
            });
            break;
          }
          case 'months':
          {
            this.setState({
              months: event.target.value
            });
            break;
          }
          default:{}
        }
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = () => {
      this.handleClose();
      this.props.onSubmitExperience(this.state.years, this.state.months);
    }

    render = () => {
    return (
        <div>
        <Button variant="outlined" onClick={this.handleClickOpen}>Experience: {this.state.years} - {this.state.months}</Button>
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
              <FormControl style={styles.formControl} variant="outlined" >
                <InputLabel htmlFor="years-simple">Years</InputLabel>
                <Select
                  value={this.state.years}
                  onChange={this.handleChange('years')}
                  input={<Input id="years-simple" />}
                >
                {years.map((item, index) => {
                  return <MenuItem key={index} value={item}>{item}</MenuItem>
                })}
                </Select>
              </FormControl>
              <FormControl style={styles.formControl} variant="outlined" >
                <InputLabel htmlFor="months-simple">Months</InputLabel>
                <Select
                  value={this.state.months}
                  onChange={this.handleChange('months')}
                  input={<Input id="months-simple" />}
                >
                {months.map((item, index) => {
                  return <MenuItem key={index} value={item}>{item}</MenuItem>
                })}
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
    }
}
const styles = {
    
      formControl: {
        width:"45%", 
        marginLeft:"5%"
      }
    
};
export default SelectCandidateExperience;