import React from 'react';
import AddCategoryComponent from './Categories/AddCategory';
import AddCandidateComponent from './Candidates/AddCandidate';
import DashboardComponent from './Dashboard';
// import UsersComponent from './Users';
import UsersComponent from '../Containers/User/UserContainer';
import LoginComponent from './lib/LoginComponent';
import User401 from '../Containers/User/User401';
import UserForbidden from '../Containers/User/UserForbidden';
import { Route } from 'react-router-dom'
import CategoriesContainer from '../Containers/CategoryContainer';
import SkillsContainer from '../Containers/SkillContainer';
import TestConsoleContainer from '../Containers/TestConsole/TestConsoleContainer';
import McqContainer from '../Containers/McqContainer';
import BulkMcq from '../components/Mcq/BulkUpload';
import CandidatesContainer from '../Containers/CandidateContainer';
import AdminTestContainer from '../Containers/AdminTestContainer';
import McqList from '../components/Mcq/McqList';
import CandidateList from '../components/Candidates/CandidateList';
import InviteConsoleContainer from '../Containers/InviteConsole/InviteConsoleContainer';
import PrivateRoute from '../components/lib/PrivateRoute';

const Routes = (props) => {
    return (
        <div>
            <PrivateRoute exact path="/" component={DashboardComponent} />
            <Route path="/login" component={LoginComponent} />
            <Route path="/unauthorizedUser" component={User401} />
            <Route path="/userForbidden" component={UserForbidden} />
            <PrivateRoute path="/dashboard" component={DashboardComponent} />
            <PrivateRoute path="/tests" component={AdminTestContainer} />
            {/* <Route path="/testConsole" component={TestConsoleContainer} /> */}
            <PrivateRoute path="/testConsole" component={TestConsoleContainer} />
            <PrivateRoute path="/inviteConsole" component={InviteConsoleContainer} />
            <PrivateRoute path="/mcqs" component={McqList} />
            <PrivateRoute path="/addMcq" component={McqContainer} />
            <PrivateRoute path="/bulkMcq" component={BulkMcq} />
            <PrivateRoute path="/categories" component={CategoriesContainer} />
            <PrivateRoute path="/skills" component={SkillsContainer} />
            <PrivateRoute path="/addCategory" component={AddCategoryComponent} />
            {/* <Route path="/candidates" component={CandidateList} /> */}
            {/* <Route path="/addCandidate" component={CandidatesContainer} /> */}
            <PrivateRoute path="/users" component={UsersComponent} />
        </div>
    );
}
export default Routes;