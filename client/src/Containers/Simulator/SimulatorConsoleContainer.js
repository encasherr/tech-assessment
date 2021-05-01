import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import QuestionSimulatorConsoleContainer from './QuestionSimulatorConsoleContainer';
import { LoadExamSimulator, ResponseChange, SubmitAnswers,
        GetInvitation,
        GoToPrevious, GoToNext } from '../../actions/QuestionSimulatorConsoleActions';
import LoadingComponent from '../../components/lib/LoadingComponent';
import { RecordingComponent } from '../../components/lib/RecordingComponent';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import config from '../../config';

class SimulatorConsoleContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deviceAccess: 'denied'
        }
    }
    componentDidMount = () => {
        config.instance.initialize();
        let { inviteid } = this.props.match.params;
        this.props.LoadExamSimulator(inviteid);
    }

    SetDeviceAccess = (access) => {
        this.setState({
            deviceAccess: access
        });
        // this.props.history.push('/testLanding/3');
    }

    render = () => {
        let { candidateTestObject, currentQuestion, status, classes } = this.props;
        let { deviceAccess } = this.state;

        console.log('sc-props', this.props);
        console.log('deviceAccess', deviceAccess);

        if(!candidateTestObject) {
            if(status) {
                return (
                    <div>
                        <div className="alert alert-info">
                            {status.message}
                        </div>
                        <br/>
                            <a href="#" onClick={() => window.close()} 
                            className="btn btn-secondary">Close and exit the test session</a>
                        
                    </div>
                )
            }
            return <LoadingComponent />
        }
        /*if(candidateTestObject &&
            candidateTestObject.response_meta && 
            candidateTestObject.response_meta.videoMonitoringRequired && 
            deviceAccess === 'denied') {
            return (
                <>
                    <RecordingComponent 
                        setDeviceAccess={(access) => this.SetDeviceAccess(access)}    
                    />
                </>
            )
        }*/
        return (
        <div>
            {
                candidateTestObject &&
                candidateTestObject.response_meta && 
                candidateTestObject.response_meta.videoMonitoringRequired &&
                <RecordingComponent   
                    responseId={candidateTestObject.id}
                    setDeviceAccess={(access) => this.SetDeviceAccess(access)}    
                />
            }
        {     
            (deviceAccess === 'granted' || 
            candidateTestObject &&
                candidateTestObject.response_meta && 
                !candidateTestObject.response_meta.videoMonitoringRequired) &&
            <QuestionSimulatorConsoleContainer 
                classes={classes}
                model={candidateTestObject}
                currentQuestion={currentQuestion} 
                onResponseChange={ (choiceKey) => this.props.ResponseChange(choiceKey, currentQuestion, candidateTestObject.response_meta.mcqs)}
                goToPrevious={() => this.props.GoToPrevious(currentQuestion, candidateTestObject.response_meta.mcqs)}
                goToNext={() => this.props.GoToNext(currentQuestion, candidateTestObject.response_meta.mcqs)}
                submitAnswers={() => this.props.SubmitAnswers(candidateTestObject)}/>
        }
        </div>
        );
    }
}


const mapStateToProps = state => ({
    ...state.questionSimulatorConsoleReducer
});
const mapDispatchToProps = dispatch => ({
    GetInvitation: (invitationId) => dispatch(GetInvitation(invitationId)),
    LoadExamSimulator: (invitationId) => dispatch(LoadExamSimulator(invitationId)),
    ResponseChange: (choiceKey, currentQuestion, mcqList) => dispatch(ResponseChange(choiceKey, currentQuestion, mcqList)),
    GoToPrevious: (currentQuestion, mcqs) => dispatch(GoToPrevious(currentQuestion, mcqs)),
    GoToNext: (currentQuestion, mcqs) => dispatch(GoToNext(currentQuestion, mcqs)),
    SubmitAnswers: (candidateTestObject) => dispatch(SubmitAnswers(candidateTestObject))
});
export default connect(mapStateToProps, mapDispatchToProps)(SimulatorConsoleContainer);
