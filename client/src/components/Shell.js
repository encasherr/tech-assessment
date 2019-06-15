import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux';
import { SetUserInfo, LogoutCurrentUser } from '../actions/UserActions';

import Header from './layouts/Header';
import SideDrawer from './layouts/SideDrawer';

// import McqComponent from './Mcq/McqList';
// import AddMcqComponent from './Mcq/AddMcq';
// import CategoriesComponent from './Categories/CategoryList';
// import AddCategoryComponent from './Categories/AddCategory';
// import DashboardComponent from './Dashboard';
// import UsersComponent from './Users';
import Routes from './Routes';
import AuthHelper from '../AuthHelper';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class Shell extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  
  componentDidMount = () => {
    console.log('shell this.props.history', this.props.history);
    // this.props.SetUserInfo(AuthHelper.GetUserInfo());
  }
  Logout = () => {
    this.props.LogoutCurrentUser();
    AuthHelper.GetHistory().push({
      pathname: '/login'
    });
  }

  render() {
    const { classes, theme } = this.props;
    console.log('shell props', this.props);
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header classes={classes} 
                openState={this.state.open} 
                onDrawerOpen={this.handleDrawerOpen}
                onLogout={() => this.Logout()}
                />
        <Router>
          <SideDrawer classes={classes} 
                  openState={this.state.open} 
                  onDrawerClose={this.handleDrawerClose}
                  theme={theme}
                  />
          <main className={classes.content}>
            <div className={classes.toolbar} />
                <Routes />
          </main>
        </Router>
      </div>
    );
  }
}

Shell.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  ...state.userReducer
});
const mapDispatchToProps = dispatch => ({
  SetUserInfo: (userInfo) => dispatch(SetUserInfo(userInfo)),
  LogoutCurrentUser: () => dispatch(LogoutCurrentUser())
  // AddTest: (model, editMode) => dispatch(AddTest(model, editMode)),
  // UpdateTest: (model) => dispatch(UpdateTest(model)),
  // FetchSkills: () => dispatch(FetchSkills()),
  // FetchTests: () => dispatch(FetchTests()),
  // CloseSnackbar: () => dispatch(CloseSnackbar()),
  // OpenSnackbar: () => dispatch(OpenSnackbar()),
  // CurrentTestFieldChange: (val, field, model) => dispatch(CurrentTestFieldChange(val, field, model))
});
export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Shell));
// export default withStyles(styles, { withTheme: true })(Shell);
