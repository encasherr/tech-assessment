import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
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
import { info, primary, secondary, success, warning } from './lib/ColorCodes';

const drawerWidth = 240;

const styles = theme => createMuiTheme({
  root: {
    display: 'flex',
  },
  verticalCenter: {
    paddingTop: '10%'
  },
  dashboardHeight: {
    // marginTop: '5%',
    minHeight: '375px',
    overflowY: 'auto'
  },
  actionButton: {
      marginLeft: '70%'
  },
  bgSuccessMain: {
    backgroundColor: success.main
  },
  bgSuccessDark: {
    backgroundColor: success.dark
  },
  bgSuccessLight: {
    backgroundColor: success.light
  },
  bgPrimaryMain: {
    backgroundColor: primary.main,
    color: '#fff'
  },
  bgPrimaryDark: {
    backgroundColor: primary.dark
  },
  bgPrimaryLight: {
    backgroundColor: primary.light
  },
  bgWarningMain: {
    backgroundColor: warning.main
  },
  bgWarningDark: {
    backgroundColor: warning.dark
  },
  bgWarningLight: {
    backgroundColor: warning.light
  },
  bgInfoMain: {
    backgroundColor: info.main
  },
  bgInfoDark: {
    backgroundColor: info.dark
  },
  bgInfoLight: {
    backgroundColor: info.light
  },
  bgSecondaryMain: {
    backgroundColor: secondary.main
  },
  bgSecondaryDark: {
    backgroundColor: secondary.dark
  },
  bgSecondaryLight: {
    backgroundColor: secondary.light
  },
  paletteBorderLeftSuccessMain: {
    borderLeft: `2px solid ${success.main}`
  },
  paletteBorderLeftSuccessLight: {
    borderLeft: `2px solid ${success.light}`
  },
  paletteBorderLeftSuccessDark: {
    borderLeft: `2px solid ${success.dark}`
  },
  paletteBorderLeftPrimaryMain: {
    borderLeft: `2px solid ${primary.main}`
  },
  paletteBorderLeftPrimaryLight: {
    borderLeft: `2px solid ${primary.light}`
  },
  paletteBorderLeftPrimaryDark: {
    borderLeft: `2px solid ${primary.dark}`
  },
  paletteBorderLeftSecondaryMain: {
    borderLeft: `2px solid ${secondary.main}`
  },
  paletteBorderLeftSecondaryLight: {
    borderLeft: `2px solid ${secondary.light}`
  },
  paletteBorderLeftSecondaryDark: {
    borderLeft: `2px solid ${secondary.dark}`
  },
  paletteBorderBottomSuccessMain: {
    borderBottom: `2px solid ${success.main}`
  },
  paletteBorderBottomSuccessLight: {
    borderBottom: `2px solid ${success.light}`
  },
  paletteBorderBottomSuccessDark: {
    borderBottom: `2px solid ${success.dark}`
  },
  paletteBorderBottomPrimaryMain: {
    borderBottom: `2px solid ${primary.main}`
  },
  paletteBorderBottomPrimaryLight: {
    borderBottom: `2px solid ${primary.light}`
  },
  paletteBorderBottomPrimaryDark: {
    borderBottom: `2px solid ${primary.dark}`
  },
  paletteBorderBottomSecondaryMain: {
    borderBottom: `2px solid ${secondary.main}`
  },
  paletteBorderBottomSecondaryLight: {
    borderBottom: `2px solid ${secondary.light}`
  },
  paletteBorderBottomSecondaryDark: {
    borderBottom: `2px solid ${secondary.dark}`
  },
  palettePrimaryLight: {
    backgroundColor: '#757ce8'
  },
  palettePrimaryMain: {
    backgroundColor: '#3f50b5',
    color: '#fff'
  },
  palettePrimaryDark: {
    backgroundColor: '#002884',
    color: '#fff'
  },
  palettePrimaryContrastText: {
    backgroundColor: '#fff',
    color: '#000'
  },
  paletteSecondaryLight: {
    backgroundColor: '#ff7961'
  },
  paletteSecondaryMain: {
    backgroundColor: '#f44336'
  },
  paletteSecondaryDark: {
    backgroundColor: '#ba000d'
  },
  paletteSecondaryContrastText: {
    backgroundColor: '#000'
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
                    <Routes classes={classes}/>
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
