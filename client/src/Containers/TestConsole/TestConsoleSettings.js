import React, { Component } from 'react';
import {
    Card, CardContent, CardActions, FormControl, TextField,
    Button
} from '@material-ui/core';

class TestConsoleSettings extends Component {

    render = () => {
        let { currentTest } = this.props;
        console.log('settings', currentTest);
        let emailSubject = (currentTest.test_meta && currentTest.test_meta.settings && currentTest.test_meta.settings.emailSubject) || '';
        return (
            <div>
                <Card>
                    <CardContent>
                        <FormControl variant="outlined" style={styles.formControl}>
                            <TextField
                                id="outlined-name"
                                label="Invitation Email Subject"
                                value={emailSubject}
                                onChange={(e) => this.props.onFieldChange(e.target.value, 'emailSubject')}
                                margin="normal"
                                variant="outlined"
                            />
                        </FormControl>
                    </CardContent>
                    <CardActions style={styles.actionButton}>
                        <Button variant="contained" size="large" color="primary"
                            onClick={() => this.props.onSubmitTestSettings()}>
                            Submit
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}
export default TestConsoleSettings;
const styles = {
    formControl: {
        width: '90%'
    },
    avatar: {
        backgroundColor: '#555'
    }
}