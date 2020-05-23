import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Button, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import LoadingComponent from '../../components/lib/LoadingComponent';
import { KeyboardBackspace } from '@material-ui/icons';
import OrgList from './OrgList';
import AddOrgComponent from './AddOrg';
import {    AddOrg, FetchOrgs, UpdateOrg, 
            CurrentOrgFieldChange,
            SelectOrg, DeleteOrg
        } from '../../actions/OrgActions';

class OrgContainer extends React.Component {
    
    componentDidMount = () => {
        this.reload();
    }

    reload = () => {
        this.props.FetchOrgs();
    }

    onAddOrg = (model) => {
        if(this.props.editMode) {
            this.props.UpdateOrg(model)
                    .then((res) => {
                        this.reload();
                    })
        }
        else {
            this.props.AddOrg(model)
                    .then((res) => {
                        this.reload();
                    })
        }
    }

    render = () => {
        let { orgList, current_org } = this.props;
        console.log('current_org', current_org);

        return(
            <Grid container spacing={16}>
                <Grid item xs={12} sm={6}>
                    <AddOrgComponent
                        onSubmit={ (model) => this.onAddOrg(model) }
                        model={current_org}
                        editMode={this.props.editMode}
                        onAdd={() => this.reload()}
                        onFieldChange={ (val, field, model) => this.props.CurrentOrgFieldChange(val, field, model) } />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <OrgList 
                        orgs={orgList} 
                        onOrgSelect={ (item) => this.props.SelectOrg(item) } 
                        />
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = state => ({
    ...state.orgReducer
});
const mapDispatchToProps = dispatch => ({
    FetchOrgs: () => dispatch(FetchOrgs()),
    AddOrg: (model) => dispatch(AddOrg(model)),
    UpdateOrg: (model) => dispatch(UpdateOrg(model)),
    SelectOrg: (model) => dispatch(SelectOrg(model)),
    CurrentOrgFieldChange: (val, field, model) => dispatch(CurrentOrgFieldChange(val, field, model))
});
export default connect(mapStateToProps, mapDispatchToProps)(OrgContainer);
const styles = {
    actionButton: {
        marginLeft: '80%'
    }
}