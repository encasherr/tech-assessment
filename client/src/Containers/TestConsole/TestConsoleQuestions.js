import React, { Component } from 'react';
import { Card, CardHeader, Button, IconButton, CardContent } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import SelectedMcqs from './SelectedMcqs';
import McqSelector from'./McqSelector';

class TestConsoleQuestions extends Component {

    render = () => {
        let { selectedMcqs, currentTest } = this.props;
        console.log('test console questions render');
        console.log(selectedMcqs);
        return (
            <Card>
                {currentTest && currentTest.status==='draft' &&
                <CardHeader action={
                    <McqSelector 
                        onSelectMcq={(mcqItem) => this.props.onSelectMcq(mcqItem)} 
                        selectedMcqs={selectedMcqs}
                        />
                }
                />
                }
                <CardContent>
                    <SelectedMcqs selectedMcqs={selectedMcqs} />
                </CardContent>
            </Card>
        );
    }
}
export default TestConsoleQuestions;