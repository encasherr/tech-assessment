import React, { Component } from 'react';
import { Card, CardHeader, Button, IconButton } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import { Link } from 'react-router-dom/cjs/react-router-dom';

class TestConsoleQuestions extends Component {

    render = () => {
        return (
            <Card>
                <CardHeader action={
                    <Link to={{pathname: '/mcqs', state: {question: true} }} size="large" onClick={ () => this.props.history.push('/mcqs') }>
                        <AddBox color="secondary" size="large" />
                    {/* <Button variant="contained" color="primary">Add</Button> */}
                    </Link>
                }
                />
            </Card>
        );
    }
}
export default TestConsoleQuestions;