import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CandidateList extends Component {
    render = () => {
        return (
            <div>
                Candidate List
                <Link to="/addCandidate" >Add Candidate</Link>
            </div>
        );
    }
}

export default CandidateList;