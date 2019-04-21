import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import { Field } from 'redux-form';

class ReduxTextField extends React.Component {
    
    renderTextField = ({ input, label, fieldName }) => {

        return (
        <TextField
            id="outlined-name"
            label={label}
            className={styles.dense}
            value={value}
            onChange={(e) => this.handleChange(e, fieldName)}
            margin="normal"
            variant="outlined"
        />
        );
    }

    render = () => {
        
        return (
            <Field name={fieldName} component={this.renderTextField} label={label} />
        );
    }
}
export default ReduxTextField;