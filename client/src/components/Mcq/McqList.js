import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class McqList extends Component {
    render = () => {
        return (
            <div>
                McqComponent
                <Link to="/addMcq" >Add Mcq</Link>
            </div>
        );
    }
}

export default McqList;