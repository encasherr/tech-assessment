import React from 'react';
import { connect } from 'react-redux';
import QuestionSimulatorConsoleContainer from './QuestionSimulatorConsoleContainer';
import { LoadExamSimulator } from '../../actions/QuestionSimulatorConsoleActions';
import LoadingComponent from '../../components/lib/LoadingComponent';

class SimulatorConsoleContainer extends React.Component {

    componentDidMount = () => {
        this.props.LoadExamSimulator();
    }

    render = () => {
        let { candidateTestObject } = this.props;
        console.log('test simulator', this.props);
        if(!candidateTestObject) {
            return <LoadingComponent />
        }
        return (
        <div>
            <QuestionSimulatorConsoleContainer model={candidateTestObject.data} />
        </div>
        );
    }
}


const mapStateToProps = state => ({
    ...state.questionSimulatorConsoleReducer
});
const mapDispatchToProps = dispatch => ({
    LoadExamSimulator: () => dispatch(LoadExamSimulator())
});
export default connect(mapStateToProps, mapDispatchToProps)(SimulatorConsoleContainer);
