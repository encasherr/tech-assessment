import React from 'react';
import { connect } from 'react-redux';
import { FetchPublicTests, FetchMyTests } from '../../actions/OpTests/OpTestActions';
import { AddTest, CurrentTestFieldChange } from '../../actions/AdminTestActions';
import { PublishTest } from '../../actions/TestConsoleActions';
import Grid from '@material-ui/core/Grid';
import { Button, Card, CardHeader, CardContent } from '@material-ui/core';
import TestList from '../../components/AdminTest/TestList';
import OpTestList from './OpTestList';
import OpAddTest from './OpAddTest';
import config from '../../config';
import { GetCurrentUserRole } from '../../common/HelperFunctions';
import OpMyTests from './OpMyTests';
import OpHeader from '../Home/OpHeader';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';


export const testListModes = {
    PublicTests: 'public-tests',
    MyTests: 'my-tests',
    MyInstituteTests: 'my-institute-tests'
}

class OpTestContainer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            activeTestList: testListModes.MyTests
        }
    }

    componentDidMount = () => {
        this.reload();
    }

    reload = () => {
        // this.props.FetchPublicTests();
        this.props.FetchMyTests();
    }
    
    showPublicTests = () => {
        this.props.FetchPublicTests();
        this.setState({
            activeTestList: testListModes.PublicTests
        })
    }

    showMyTests = () => {
        this.props.FetchMyTests();
        this.setState({
            activeTestList: testListModes.MyTests
        })
    }

    onAddTest = (model) => {
        model.test_meta.settings = {
            testVisibility: config.instance.TestVisibility.Public
        }
        this.props.AddTest(model, this.props.editMode, this.props.history)
                .then((res) => {
                    this.showMyTests();  
                });
    }

    render = () => {
        return(
            <Grid container spacing={16}>
                <Grid item xs={12} sm={12}>
                    {/* <OpHeader activeTestList={this.state.activeTestList} 
                            showMyTests={() => this.showMyTests()}
                            showPublicTests={() => this.showPublicTests()}/> */}
                    <Card>
                        <CardHeader action={
                            <OpAddTest 
                                onSubmit={ (model) => this.onAddTest(model) }
                                model={this.props.current_test}
                                skills={this.props.skills}
                                editMode={this.props.editMode}
                                onFieldChange={ (val, field, model) => this.props.CurrentTestFieldChange(val, field, model) } 
                                />
                            }
                            title="Tests" />
                        <CardContent>
                            {
                                this.state.activeTestList === testListModes.PublicTests &&
                                <OpTestList tests={this.props.tests} />
                            }
                            {
                                this.state.activeTestList === testListModes.MyTests &&
                                <OpMyTests tests={this.props.tests} />
                            }
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = state => ({
    ...state.adminTestReducer,
    ...state.userReducer
});
const mapDispatchToProps = dispatch => ({
    AddTest: (model, editMode) => dispatch(AddTest(model, editMode)),
    PublishTest: (model) => dispatch(PublishTest(model)),
    FetchPublicTests: () => dispatch(FetchPublicTests()),
    FetchMyTests: () => dispatch(FetchMyTests()),
    // CloseSnackbar: () => dispatch(CloseSnackbar()),
    // OpenSnackbar: () => dispatch(OpenSnackbar()),
    CurrentTestFieldChange: (val, field, model) => dispatch(CurrentTestFieldChange(val, field, model))
});
export default connect(mapStateToProps, mapDispatchToProps)(OpTestContainer);