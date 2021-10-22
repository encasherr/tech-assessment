import React from'react';
import config from '../../config';
import repository from '../../repository';
import { CardContent, FormControl, TextField, CardActions, Button, CardHeader } from '@material-ui/core';
import SnackbarComponent from '../../components/lib/SnackbarComponent';

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            password: '',
            errorMessage: '',
            submitButtonText: 'Submit',
            snackOpen: false,
            snackMessage: ''
        };
    }

    resetFields = () => {
        this.setState({
            currentPassword: '',
            password: '',
            errorMessage: '',
            submitButtonText: 'Submit'
        });
    }
    
    localHandler = (event) => {
        event.preventDefault()

        let url = config.instance.getAdminApiUrl() + 'changePassword';
        let data = {
            currentPassword: this.state.currentPassword,
            password: this.state.password
        }
        this.setState({
            submitButtonText: 'Working...'
        })
        repository.saveData(url, data)
        // axios.post(url, data)
        .then((res) => {
            console.log('password change status', res);
            if (res) {
                this.resetFields();
                this.setState({
                    snackOpen: true,
                    snackMessage: 'Password changed successfully'
                })
            } else {
                this.setState({
                    submitButtonText: 'Submit',
                    errorMessage: 'Wrong Credentials. Please try again.'
                });
            }
        }).catch((err) => {
            this.setState({
                    submitButtonText: 'Submit',
                    errorMessage: err.data
            });
        });
    }

    onCurrentPasswordChange = (value) => {
        this.setState({
            currentPassword: value
        });
    }

    onPasswordChange = (value) => {
        this.setState({
            password: value
        });
    }

    render = () => {
        let { errorMessage, submitButtonText } = this.state;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <form noValidate autoComplete="off" onSubmit={(e) => this.localHandler(e)}>
                            <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <FormControl className="col-md-12" variant="outlined">
                                        <TextField
                                            label="Current Password"
                                            type="password"
                                            value={this.state.currentPassword}
                                            onChange={(e) => this.onCurrentPasswordChange(e.target.value)}
                                            margin="normal"
                                            variant="outlined"
                                            className="text-lg"
                                        />
                                    </FormControl>
                                </div>
                                <div className="row">
                                    <FormControl className="col-md-12" variant="outlined">
                                        <TextField
                                            label="New Password"
                                            type="password"
                                            value={this.state.password}
                                            onChange={(e) => this.onPasswordChange(e.target.value)}
                                            margin="normal"
                                            variant="outlined" />
                                    </FormControl>
                                </div>
                                <div className="row mt-4">
                                    <button className="btn btn-primary btn-block" type="submit">
                                        {submitButtonText}
                                    </button>
                                </div>
                            </div>
                            </div>

                        </form>
                    </div>
                    <p className="col-md-12 text-center text-danger">{errorMessage}</p>
                </div>
                <SnackbarComponent 
                    openSnack={this.state.snackOpen} handleClose={() => this.setState({snackOpen: false})}
                    snackMessage={this.state.snackMessage} 
                    /> 
            </div>
        )
    }
}

export default ChangePassword;