import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { FetchPublicTests, FetchMyRegisteredTests
        } from '../../actions/RegisteredTestActions';
import { RegisterForTest } from '../../actions/OpTests/OpTestActions';
import TestsTakenList from './TestsTakenList';
import LoadingComponent from '../../components/lib/LoadingComponent';
import RegisteredTestsList from './RegisteredTestList';
import RegisteredTestTab from './RegisteredTestTab';
import config from '../../config';

class TestsTakenContainer extends React.Component {
    
    componentDidMount = () => {
        this.reload();
    }

    reload = () => {
        this.props.FetchMyRegisteredTests();
        this.props.FetchPublicTests();
    }
    
    registerForTest = (model) => {
        this.props.RegisterForTest(model)
            .then(() => {
                this.reload();
            });
    }
    
    startRegisteredTest = (registrationId) => {
        let url = `${config.instance.getSiteUrl()}/startRegisteredTest/${registrationId}`;
        window.open(url, '_blank');
        //this.props.history.push('/startRegisteredTest/' + registrationId);
    }

    render = () => {
        let { upcomingTests, registeredTests } = this.props;
        console.log('registeredTests', registeredTests);
        if(registeredTests) {
            let testsTakenList = registeredTests.filter((item) => {
                return item.status === 'Completed';
            })
            let pendingTests = registeredTests.filter((item) => {
                return item.status === 'Registered' || item.status === 'InProgress';
            })

            return(
                <>
                <RegisteredTestTab
                            upcomingTests={upcomingTests} 
                            testsTakenList={testsTakenList} 
                            pendingTests={pendingTests}
                            registerForTest={(model) => this.registerForTest(model)}
                            startRegisteredTest={(registrationId) => this.startRegisteredTest(registrationId)}
                />
                        {/* <TestsTakenList 
                            testsTakenList={testsTakenList} 
                        />
                        <RegisteredTestsList
                            tests={pendingTests}
                            startRegisteredTest={(registrationId) => this.startRegisteredTest(registrationId)}
                        /> */}
                </>
            );
        }
        return (
            <LoadingComponent />
        )
    }
}
const mapStateToProps = state => ({
    ...state.registeredTestReducer
});
const mapDispatchToProps = dispatch => ({
    FetchMyRegisteredTests: () => dispatch(FetchMyRegisteredTests()),
    FetchPublicTests: () => dispatch(FetchPublicTests()),
    RegisterForTest: (model) => dispatch(RegisterForTest(model))
});
export default connect(mapStateToProps, mapDispatchToProps)(TestsTakenContainer);
const styles = {
    actionButton: {
        marginLeft: '80%'
    }
}