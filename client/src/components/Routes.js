import React from 'react';
import AddCategoryComponent from './Categories/AddCategory';
import AddCandidateComponent from './Candidates/AddCandidate';
import DashboardComponent from './Dashboard';
import UsersComponent from '../Containers/User/UserContainer';
import LoginComponent from './lib/LoginComponent';
import LocalLoginComponent from './lib/LocalLoginComponent';
import User401 from '../Containers/User/User401';
import UserForbidden from '../Containers/User/UserForbidden';
import ResourceNotFound from '../Containers/User/ResourceNotFound';
import { Route } from 'react-router-dom'
import CategoriesContainer from '../Containers/CategoryContainer';
import OrgContainer from '../Containers/Org/OrgContainer';
import SkillsContainer from '../Containers/SkillContainer';
import TestConsoleContainer from '../Containers/TestConsole/TestConsoleContainer';
import McqContainer from '../Containers/McqContainer';
import BulkMcq from '../components/Mcq/BulkUpload';
import CandidatesContainer from '../Containers/CandidateContainer';
import AdminTestContainer from '../Containers/AdminTestContainer';
import McqList from '../components/Mcq/McqList';
import CandidateList from '../components/Candidates/CandidateList';
import InviteConsoleContainer from '../Containers/InviteConsole/InviteConsoleContainer';
import InviteContainer from '../Containers/InviteConsole/InviteContainer';
import SimulatorConsoleContainer from '../Containers/Simulator/SimulatorConsoleContainer';
import SimulatorShell from '../Containers/Simulator/SimulatorShell';

import AddRmaRequest from '../HiTech/AddRmaRequestContainer';
import RmaRequestList from '../HiTech/RmaRequestListContainer';
import ViewRmaRequest from '../HiTech/ViewRmaRequest';

import PrivateRoute from '../components/lib/PrivateRoute';
import CandidateConsoleContainer from '../Containers/CandidateConsole/CandidateConsoleContainer';

const Routes = (props) => {
    return (
        <div>
            <PrivateRoute exact path="/" component={DashboardComponent} />
            <Route path="/login" component={LocalLoginComponent} />
            <Route path="/unauthorizedUser" component={User401} />
            <Route path="/userForbidden" component={UserForbidden} />
            <Route path="/notFound" component={ResourceNotFound} />
            <PrivateRoute {...props} path="/dashboard" component={DashboardComponent} />
            <PrivateRoute path="/tests" component={AdminTestContainer} />
            {/* <Route path="/testConsole" component={TestConsoleContainer} /> */}
            <PrivateRoute {...props} path="/testConsole" component={TestConsoleContainer} />
            <PrivateRoute {...props} path="/candidateConsole" component={CandidateConsoleContainer} />
            <PrivateRoute {...props} path="/inviteConsole" component={InviteContainer} />
            <PrivateRoute {...props} path="/invitations" component={InviteConsoleContainer} />
            <PrivateRoute path="/mcqs" component={McqList} />
            <PrivateRoute path="/addMcq" component={McqContainer} />
            <PrivateRoute path="/bulkMcq" component={BulkMcq} />
            <PrivateRoute path="/categories" component={CategoriesContainer} />
            <PrivateRoute path="/orgs" component={OrgContainer} />
            <PrivateRoute path="/skills" component={SkillsContainer} />
            <PrivateRoute path="/addCategory" component={AddCategoryComponent} />
            {/* <Route path="/candidates" component={CandidateList} /> */}
            {/* <Route path="/addCandidate" component={CandidatesContainer} /> */}
            <PrivateRoute path="/users" component={UsersComponent} />

            <Route path="/startTest/:inviteid" component={SimulatorConsoleContainer} />
            <Route path="/testLanding/:inviteid" component={SimulatorShell} />

            {/* Routes for HiTech*/}
            <Route path="/rmaRequests" component={RmaRequestList} />
            <Route path="/createRma" component={AddRmaRequest} />
            <Route path="/viewRma" component={ViewRmaRequest} />

        </div>
    );
}

export default Routes;