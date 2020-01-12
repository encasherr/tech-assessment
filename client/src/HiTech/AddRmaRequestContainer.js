import React from 'react';
import { connect } from 'react-redux';
import AddRmaRequestComponent from './AddRmaRequest';
import RmaRequestList from './RmaRequestList';
import {    AddRmaRequest, FetchRmaRequests, 
            CloseSnackbar, CurrentRmaRequestFieldChange,
            ProductFieldChange, VendorDetailsFieldChange,
            AddProductToRma, InitializeRmaFields,
            OpenSnackbar } from './RmaRequestActions';
import Grid from '@material-ui/core/Grid';
import SnackbarComponent from '../components/lib/SnackbarComponent';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';

class AddRmaRequestContainer extends React.Component {

    componentDidMount = () => {
        this.reload();
    }

    reload = () => {
        this.props.InitializeRmaFields();
    }

    componentWillUpdate = () => {
        console.log('component updated');
        if(this.props.success_message) {
            console.log('this.props.success_message');
            this.props.history.push({
                pathname: '/rmaRequests'
            });
        }
    }

    componentWillReceiveProps = () => {
        console.log('component will receive props');
        if(this.props.success_message) {
            console.log('receive props this.props.success_message');
        }
    }

    render = () => {
        return(
            <div>
                {this.props.current_rma_request && 
                    <AddRmaRequestComponent 
                        onSubmit={ (model) => this.props.AddRmaRequest(model) }
                        model={this.props.current_rma_request}
                        onFieldChange={ (val, field, model) => this.props.CurrentRmaRequestFieldChange(val, field, model) } 
                        onVendorDetailsFieldChange={ (val, field, model) => this.props.VendorDetailsFieldChange(val, field, model) } 
                        onAddRmaProduct={(productItem, model) => this.props.AddProductToRma(productItem, model) }
                        onProductFieldChange={(val, field, model) => this.props.ProductFieldChange(val, field, model)}
                        />
                }
                {this.props.success_message && !this.props.saving && 
                    <SnackbarComponent 
                        openSnack={true} handleClose={() => this.props.CloseSnackbar()} 
                        snackMessage={"RMA request Saved Successfully!"} /> 
                }
                {this.props.saving && 
                    <SnackbarComponent 
                        openSnack={true} handleClose={() => this.props.CloseSnackbar()} 
                        snackMessage={"Saving..."} /> 
                }
            </div>
        );
    }
}
const mapStateToProps = state => ({
    ...state.rmaReducer
});
const mapDispatchToProps = dispatch => ({
    AddRmaRequest: (model) => dispatch(AddRmaRequest(model)),
    CloseSnackbar: () => dispatch(CloseSnackbar()),
    OpenSnackbar: () => dispatch(OpenSnackbar()),
    CurrentRmaRequestFieldChange: (val, field, model) => dispatch(CurrentRmaRequestFieldChange(val, field, model)),
    ProductFieldChange: (val, field, model) => dispatch(ProductFieldChange(val, field, model)),
    VendorDetailsFieldChange: (val, field, model) => dispatch(VendorDetailsFieldChange(val, field, model)),
    AddProductToRma: (productItem, model) => dispatch(AddProductToRma(productItem, model)),
    InitializeRmaFields: () => dispatch(InitializeRmaFields())
});
export default connect(mapStateToProps, mapDispatchToProps)(AddRmaRequestContainer);
const styles={
    fullWidth: {
        width: '100%',
        paddingLeft: '2%',
        paddingRight: '2%'
    },
    width50: {
        width: '50%',
        paddingLeft: '2%',
        paddingRight: '2%'
    },
    actionButton: {
        marginLeft: '70%'
    },
    avatar: {
        backgroundColor: '#555'
    }
}