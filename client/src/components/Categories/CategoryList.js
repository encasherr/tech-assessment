import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CategoryList extends Component {
    render = () => {
        return (
            <div>
                Category List
                <Link to="/addCategory" >Add Category</Link>
            </div>
        );
    }
}

export default CategoryList;