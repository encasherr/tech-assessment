import React from 'react';
import { connect } from 'react-redux';
import AddRmaRequestComponent from './AddRmaRequest';
import RmaRequestList from './RmaRequestList';
import {    FetchRmaRequests, SelectRmaRequest, 
            CloseSnackbar, GoBackToAllRequests,
            OpenSnackbar } from './RmaRequestActions';
import Grid from '@material-ui/core/Grid';
import SnackbarComponent from '../components/lib/SnackbarComponent';
import { Link } from 'react-router-dom';
import ViewRmaRequest from './ViewRmaRequest';

class RmaRequestListContainer extends React.Component {

    componentDidMount = () => {
        console.log('did mount');
        this.reload();
    }

    componentWillUpdate = () => {
        if(this.props.success_message !== '') {
            this.props.FetchRmaRequests();
        }
    }

    reload = () => {
        this.props.FetchRmaRequests();
    }

    render = () => {
        let rmaRequests = [];
        rmaRequests = this.props.rmaRequests;
        if(rmaRequests)console.log('rmaRequests length', rmaRequests.length);
        return(
            <div>
                {this.props.selectedRmaRequestModel === null &&
                <RmaRequestList 
                    rmaRequests={rmaRequests}
                    onViewRma={(rmaRequest) => this.props.SelectRmaRequest(rmaRequest)} 
                />}
                {this.props.selectedRmaRequestModel &&
                <ViewRmaRequest
                    model={this.props.selectedRmaRequestModel}
                    onBackToAllRequests={() => this.props.GoBackToAllRequests()}
                />}
                <SnackbarComponent 
                    openSnack={this.props.snack_open} handleClose={() => this.props.CloseSnackbar()} 
                    snackMessage={"Data fetched Successfully!"} /> 
            </div>
        );
    }
}
const mapStateToProps = state => ({
    ...state.rmaReducer
});
const mapDispatchToProps = dispatch => ({
    FetchRmaRequests: () => dispatch(FetchRmaRequests()),
    SelectRmaRequest: (rmaRequest) => dispatch(SelectRmaRequest(rmaRequest)),
    GoBackToAllRequests: () => dispatch(GoBackToAllRequests()),
    CloseSnackbar: () => dispatch(CloseSnackbar()),
    OpenSnackbar: () => dispatch(OpenSnackbar()),
});
export default connect(mapStateToProps, mapDispatchToProps)(RmaRequestListContainer);