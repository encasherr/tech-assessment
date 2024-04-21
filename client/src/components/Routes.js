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
import SimulatorRoute from './lib/SimulatorRoute';
import OpSignup from '../OnlinePortal/Home/OpSignup';
import OpLogin from '../OnlinePortal/Home/OpLogin';
import OpLoginSignup from '../OnlinePortal/Home/OpLoginSignup';
import OpEmailVerifiedSuccess from '../OnlinePortal/Home/OpEmailVerifiedSuccess';
import OpContent from '../OnlinePortal/Home/OpContent';
import TestLandingPage from './Simulator/TestLandingPage';
import OpShell from '../OnlinePortal/Home';
import OpTestContainer from '../OnlinePortal/Tests/OpTestContainer';
import OpTestConsole from '../OnlinePortal/Tests/OpTestConsole';
import GradeContainer from '../Containers/GradeContainer';
import TestsTakenContainer from '../Containers/TestsTaken/TestsTakenContainer';
import OpProfileContainer from '../OnlinePortal/Profile/OpProfileContainer';
import OnlinePortalLandingPage from '../OnlinePortal/lib/landingPage/OnlinePortalLandingPage';
import AboutPage from '../OnlinePortal/lib/landingPage/About';
import ServicesPage from '../OnlinePortal/lib/landingPage/Services';
import AcademicPage from '../OnlinePortal/lib/landingPage/Academic';
import PricingPage from '../OnlinePortal/lib/landingPage/Pricing';

const Routes = (props) => {
    return (
        <div>
            <Route exact path="/" component={OnlinePortalLandingPage} />
            {/* <Route path="/login" component={LocalLoginComponent} /> */}
            <Route path="/home" component={OnlinePortalLandingPage} />
            <Route path="/academic" component={AcademicPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/services" component={ServicesPage} />
            <Route path="/pricing" component={PricingPage} />
            <Route path="/login" component={OpLoginSignup} />
            <Route path="/signup" component={OpSignup} />
            <Route path="/unauthorizedUser" component={User401} />
            <Route path="/userForbidden" component={UserForbidden} />
            <Route path="/notFound" component={ResourceNotFound} />
            <PrivateRoute {...props} path="/professional" component={DashboardComponent} />
            <PrivateRoute {...props} path="/dashboard" component={DashboardComponent} />
            <PrivateRoute path="/tests" component={AdminTestContainer} />
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
            <PrivateRoute path="/users" component={UsersComponent} />
            {/* <Route path="/candidates" component={CandidateList} /> */}
            {/* <Route path="/addCandidate" component={CandidatesContainer} /> */}

            <Route path="/startTest/:inviteid" component={SimulatorConsoleContainer} />
            <Route path="/startRegisteredTest/:registrationId" component={SimulatorConsoleContainer} />
            <Route path="/testLanding/:inviteid" component={TestLandingPage} />
            <Route path="/simulatorShell/:inviteid" component={SimulatorShell} />

            {/* Routes for OP */}
            
            {/* <Route path="/emailVerified" component={OpEmailVerifiedSuccess} /> */}
            <Route path="/verifyUser/:userIv/:userContent" component={OpEmailVerifiedSuccess} />
            <PrivateRoute path="/opContent" component={OpContent} />
            <PrivateRoute path="/ophome" component={TestsTakenContainer} />
            <PrivateRoute path="/optests" component={OpTestContainer} />
            <PrivateRoute path="/opTestConsole" component={OpTestConsole} />
            <PrivateRoute path="/grades" component={GradeContainer} />
            <PrivateRoute path="/myTests" component={TestsTakenContainer} />
            <PrivateRoute path="/myProfile" component={OpProfileContainer} />


            {/* Routes for HiTech*/}
            <Route path="/rmaRequests" component={RmaRequestList} />
            <Route path="/createRma" component={AddRmaRequest} />
            <Route path="/viewRma" component={ViewRmaRequest} />

        </div>
    );
}

export default Routes;