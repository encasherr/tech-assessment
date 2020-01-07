import React from 'react';
import { connect } from 'react-redux';
import AddRmaRequestComponent from './AddRmaRequest';
import RmaRequestList from './RmaRequestList';
import {    AddRmaRequest, FetchRmaRequests, 
            CloseSnackbar, CurrentRmaRequestFieldChange,
            OpenSnackbar } from './RmaRequestActions';
import Grid from '@material-ui/core/Grid';
import SnackbarComponent from '../components/lib/SnackbarComponent';

class RmaRequestContainer extends React.Component {

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
            <Grid container spacing={16}>
                <Grid item xs={12} sm={6}>
                    <AddRmaRequestComponent 
                        onSubmit={ (model) => this.props.AddRmaRequest(model) }
                        model={this.props.current_rma_request}
                        onFieldChange={ (val, field, model) => this.props.CurrentRmaRequestFieldChange(val, field, model) } />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RmaRequestList rmaRequests={rmaRequests} />
                </Grid>
                <SnackbarComponent 
                    openSnack={this.props.snack_open} handleClose={() => this.props.CloseSnackbar()} 
                    snackMessage={"Data Saved Successfully!"} /> 
            </Grid>
        );
    }
}
const mapStateToProps = state => ({
    ...state.rmaReducer
});
const mapDispatchToProps = dispatch => ({
    AddRmaRequest: (model) => dispatch(AddRmaRequest(model)),
    FetchRmaRequests: () => dispatch(FetchRmaRequests()),
    CloseSnackbar: () => dispatch(CloseSnackbar()),
    OpenSnackbar: () => dispatch(OpenSnackbar()),
    CurrentRmaRequestFieldChange: (val, field, model) => dispatch(CurrentRmaRequestFieldChange(val, field, model))
});
export default connect(mapStateToProps, mapDispatchToProps)(RmaRequestContainer);