import React from 'react';
import { connect } from 'react-redux';
import AddRmaRequestComponent from './AddRmaRequest';
import RmaRequestList from './RmaRequestList';
import {    FetchRmaRequests, 
            CloseSnackbar,
            OpenSnackbar } from './RmaRequestActions';
import Grid from '@material-ui/core/Grid';
import SnackbarComponent from '../components/lib/SnackbarComponent';
import { Link } from 'react-router-dom';

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
        return(
            <div>
                <Link to={ { pathname: "/rmaAdd" }}>
                    Add RMA Request
                </Link>
                <RmaRequestList rmaRequests={rmaRequests} />
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
    CloseSnackbar: () => dispatch(CloseSnackbar()),
    OpenSnackbar: () => dispatch(OpenSnackbar()),
});
export default connect(mapStateToProps, mapDispatchToProps)(RmaRequestListContainer);