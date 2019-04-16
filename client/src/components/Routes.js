import React from 'react';
import McqComponent from './Mcq/McqList';
import AddMcqComponent from './Mcq/AddMcq';
import CategoriesComponent from './Categories/CategoryList';
import AddCategoryComponent from './Categories/AddCategory';
import CandidatesComponent from './Candidates/CandidateList';
import AddCandidateComponent from './Candidates/AddCandidate';
import DashboardComponent from './Dashboard';
import UsersComponent from './Users';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

const Routes = (props) => {
    return (
        <div>
            <Route exact path="/" component={DashboardComponent} />
            <Route path="/dashboard" component={DashboardComponent} />
            <Route path="/mcq" component={McqComponent} />
            <Route path="/addMcq" component={AddMcqComponent} />
            <Route path="/categories" component={CategoriesComponent} />
            <Route path="/addCategory" component={AddCategoryComponent} />
            <Route path="/candidates" component={CandidatesComponent} />
            <Route path="/addCandidate" component={AddCandidateComponent} />
            <Route path="/users" component={UsersComponent} />
        </div>
    );
}
export default Routes;