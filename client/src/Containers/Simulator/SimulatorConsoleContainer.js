import React from 'react';
import { connect } from 'react-redux';

class SimulatorConsoleContainer extends React.Component {

    render = () => {
        return (
        <div>
            Simulator
        </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state.simulatorConsoleReducer
});
const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SimulatorConsoleContainer);
