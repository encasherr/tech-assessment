import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import QuestionSimulatorConsoleContainer from './QuestionSimulatorConsoleContainer';
import { LoadExamSimulator, ResponseChange, SubmitAnswers,
        GetInvitation,
        GoToPrevious, GoToNext } from '../../actions/QuestionSimulatorConsoleActions';
import LoadingComponent from '../../components/lib/LoadingComponent';

class SimulatorConsoleContainer extends React.Component {

    componentDidMount = () => {
        let { inviteid } = this.props.match.params;
        this.props.LoadExamSimulator(inviteid);
    }

    handle = () => {
        this.props.history.push('/testLanding/3');
    }

    render = () => {
        let { candidateTestObject, currentQuestion, status } = this.props;

        if(!candidateTestObject) {
            if(status) {
                return (
                    <div>
                        {status.message}
                    </div>
                )
            }
            return <LoadingComponent />
        }
        return (
        <div>
        {    <QuestionSimulatorConsoleContainer 
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
