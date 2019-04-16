import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddAnswerOption from './AddAnswerOption';

class AnswerOptions extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div>
                <AddAnswerOption />
                <br></br>
                Answer Option List
            </div>
        );
    }
}
export default AnswerOptions;