import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux';
import { SetUserInfo, LogoutCurrentUser } from '../actions/UserActions';

import Header from './layouts/Header';
import SideDrawer from './layouts/SideDrawer';
import SimulatorShell from '../Containers/Simulator/SimulatorShell';
import LocalLoginComponent from '../components/lib/LocalLoginComponent';
import LoadingComponent from '../components/lib/LoadingComponent';
import Routes from './Routes';
import AuthHelper from '../AuthHelper';
import config from '../config';

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
    config: {}
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  
  componentDidMount = () => {
    config.instance.initialize()
        .then((res) => {
            this.setState({
              config: res
            });
        })

  }
  Logout = () => {
    this.props.LogoutCurrentUser();
  }

  render() {
        const { classes, theme, isTokenExpired } = this.props;
        let user = AuthHelper.GetUserInfo();

        let { config } = this.state;
        if(!config.site_title) {
          return (
            <LoadingComponent />
          )
        }

        if(user && user.role === 'candidate') {
            return (
              <div className={classes.root}>
                  <CssBaseline />
                  <Header classes={classes} 
                        openState={this.state.open} 
                        isTickerRequired={true}
                        isDrawerRequired={false}
                        isLogoutButtonRequired={false}
                        isTokenExpired={isTokenExpired}
                        />
                    <Router>
                      <main className={classes.content}>
                        <div className={classes.toolbar} />
                            <Routes />
                      </main>
                    </Router>
              </div>
            );
        }
        return (
          <div className={classes.root}>
            <CssBaseline />
            <Header classes={classes} 
                    openState={this.state.open} 
                    onDrawerOpen={this.handleDrawerOpen}
                    onLogout={() => this.Logout()}
                    isTickerRequired={false}
                    isDrawerRequired={true}
                    isLogoutButtonRequired={true}
                    isTokenExpired={isTokenExpired}
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
});
export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Shell));
