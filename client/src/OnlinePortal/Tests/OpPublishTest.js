import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader, DialogContent, Dialog, DialogTitle, DialogActions, Divider, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { MenuItem, OutlinedInput, Select, InputLabel, IconButton } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import SendIcon from '@material-ui/icons/Send';
import LoadingComponent from '../../components/lib/LoadingComponent';
import { Close, Add, Delete, Send, Search } from '@material-ui/icons';
import { FetchUsers } from '../../actions/UserActions'
//import * as a from '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, Typography } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';

class OpPublishTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            searchText: '',
            selectedUsers: []
        };
    }

    componentDidMount = () => {
        this.props.FetchUsers();
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        console.log('handle close');
        this.setState({ open: false });
    };

    onSelectUser = (userItem) => {
        let { selectedUsers } = this.state;
        let newSelectedUsers = [];
        if (selectedUsers && selectedUsers.length > 0) {
            selectedUsers.forEach((suItem) => {
                if (suItem.id !== userItem.id) {
                    newSelectedUsers.push(suItem);
                }
            })
        }
        newSelectedUsers.push(userItem);
        this.setState({ selectedUsers: newSelectedUsers });
    }

    onUnselecttUser = (userItem) => {
        let { selectedUsers } = this.state;
        let newSelectedUsers = [];
        if (selectedUsers && selectedUsers.length > 0) {
            selectedUsers.forEach((suItem) => {
                if (suItem.id !== userItem.id) {
                    newSelectedUsers.push(suItem);
                }
            })
        }
        this.setState({ selectedUsers: newSelectedUsers });
    }


    handleSubmit = () => {
        console.log('submit called', this.state.selectedUsers);
        // let model = {
        //     testModel: this.props.current_test,
        //     selectedInvitees: this.state.selectedUsers
        // }
        let { currentTest } = this.props;
        let model = {
            testId: currentTest.id,
            // emailSubject: inviteInfo.emailSubject,
            invitees: []
        }
        let { selectedUsers } = this.state;
        if(selectedUsers && selectedUsers.length > 0) {
            selectedUsers.forEach((userItem) => {
                let invitee = {
                    // invitation_meta: {
                        emailId: userItem.user_meta.emailId,
                        name: userItem.user_meta.name
                    // }
                }
                model.invitees.push(invitee);
            })

            this.props.onSendInvitations(model);
        }
        
    }

    render = () => {
        let { users } = this.props;
        users = users || [];
        let filteredUsers = users.filter((userItem) => {
            return userItem.user_meta.name
                .toLowerCase()
                .indexOf(this.state.searchText.toLowerCase()) > -1
        })
        // alert(filteredUsers.length);
        console.log('current_test');
        // console.log(model);

        return (
            <>
                <div className="row">
                    <div className="col-md-3">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            Add Invitees
                        </button>
                    </div>
                    <div className="col-md-6"></div>
                    <div className="col-md-3">
                        <button class="btn btn-link float-right" type="button" title="Send Invitation to Selected Users"
                            onClick={() => this.handleSubmit(this.props.model)}>
                            <Send />
                        </button>
                    </div>
                </div>

                {/* <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div className="row">
                    <div className="col-md-4">Invitees</div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">Add Invitee</div>
                </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails> */}
                <div id="collapseExample" className="row">
                    {/* <div class="card card-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                    </div> */}
                    <div className="col-md-6">
                        <div className="row">
                            <FormControl variant="outlined" style={styles.formControl}>
                                <TextField
                                    id="outlined-name"
                                    label="Search Invitee"
                                    value={this.state.searchText}
                                    onChange={(e) => this.setState({ searchText: e.target.value })}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                                    }}
                                />
                            </FormControl>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                {filteredUsers && filteredUsers.length > 0 &&
                                    filteredUsers.map((userItem, index) => {
                                        return (
                                            <div className="list-group">
                                                <div className="list-group-item ">
                                                    <div className="row">
                                                        <div className="col-md-8">
                                                            {userItem.user_meta.name}
                                                        </div>
                                                        <div className="col-md-4">
                                                            <button className="btn link-btn"
                                                                onClick={() => this.onSelectUser(userItem)}><Add /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {filteredUsers && filteredUsers.length === 0 &&
                                    <div className="alert alert-default">
                                        No users found
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="list-group">
                            {
                                this.state.selectedUsers && this.state.selectedUsers.length > 0 &&
                                this.state.selectedUsers.map((userItem) => {
                                    return (
                                        <div className="list-group-item">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    {userItem.user_meta.name}
                                                </div>
                                                <div className="col-md-4">
                                                    <button className="btn link-btn"
                                                        onClick={() => this.onUnselecttUser(userItem)}><Delete /></button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                this.state.selectedUsers && this.state.selectedUsers.length === 0 &&
                                <div className="alert alert-default">
                                    No users selected
                            </div>
                            }
                        </div>
                    </div>
                </div>
                {/* </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    <Button variant="contained" size="large" color="primary"
                                    onClick={ () => this.handleSubmit(this.props.model)}>
                        Publish & Send Invites
                    </Button>
                </ExpansionPanelActions>
            </ExpansionPanel> */}
            </>
            // </div>
        )

        return (
            <div>
                {/* {!model && <LoadingComponent /> } 
            {model &&  */}
                {/* <Card>    */}
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>Publish Test</Button>

                <Dialog
                    fullWidth={true}
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle onClose={this.handleClose}>Publish Test</DialogTitle>
                    <Divider />
                    <DialogContent style={{ padding: '4%' }}>
                        <div className="row">
                            <FormControl variant="outlined" style={styles.formControl}>
                                <TextField
                                    id="outlined-name"
                                    label="Search Invitee"
                                    value={this.state.searchText}
                                    onChange={(e) => this.setState({ searchText: e.target.value })}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </FormControl>
                        </div>
                        <div className="row">
                            <div className="col-md-5">
                                <List>
                                    {filteredUsers && filteredUsers.length > 0 &&
                                        filteredUsers.map((userItem, index) => {
                                            return (
                                                <ListItem key={1}>
                                                    <ListItemText primary={userItem.user_meta.name} />
                                                    <ListItemSecondaryAction>
                                                        <button className="btn btn-primary btn-sm"
                                                            onClick={() => this.onSelectUser(userItem)}>Add</button>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                            </div>
                            <div className="col-md-3"></div>
                            <div className="col-md-3">
                                <div className="list-group">
                                    {
                                        this.state.selectedUsers && this.state.selectedUsers.length > 0 &&
                                        this.state.selectedUsers.map((userItem) => {
                                            return (
                                                <div className="list-group-item bg-secondary text-white">
                                                    {userItem.user_meta.name}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button variant="contained" size="large" color="primary"
                            onClick={() => this.handleSubmit(this.props.model)}>
                            Publish & Send Invites
                    </Button>
                    </DialogActions>
                </Dialog>
                {/* </Card> */}

            </div>
        );
    }
}
const styles = {
    formControl: {
        width: '80%',
        marginBottom: '4%'
    },
    avatar: {
        backgroundColor: '#555'
    }
};
const mapStateToProps = state => ({
    ...state.userReducer
});
const mapDispatchToProps = dispatch => ({
    FetchUsers: () => dispatch(FetchUsers()),
    // CurrentTestFieldChange: (val, field, model) => dispatch(CurrentTestFieldChange(val, field, model))
});
export default connect(mapStateToProps, mapDispatchToProps)(OpPublishTest);