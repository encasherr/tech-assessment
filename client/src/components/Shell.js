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
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import OpMenu from '../OnlinePortal/Home/OpMenu';

const drawerWidth = 240;

const styles = theme => createMuiTheme({
  root: {
    display: 'flex',
  },
  hide: {
    display: 'none'
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
    color: '#fff',
    fontWeight: '700'
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
    borderBottom: `2px solid ${primary.main}`,
    height: '150px'
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
  paletteBorderBottomListItem: {
    borderBottom: `1px solid #9AA59F`
  },
  palettePrimaryLight: {
    backgroundColor: '#757ce8'
  },
  palettePrimaryMain: {
    backgroundColor: primary.main,
    color: '#fff',
    borderRadius: '15px'
  },
  palettePrimaryDark: {
    // backgroundColor: primary.dark,
    backgroundColor: '#E3D6DE',
    textAlign: 'center'
    // border: '2px solid',
    // borderWidth: '0px',
    // borderColor: primary.dark, 
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
  paletteDashboardBox: {
    // backgroundColor: '#CBC2E1'
    minHeight: '300px',
    border: '1px solid #CBC2E1'
  },
  paletteReportBox: {
    border: '1px solid #CBC2E1',
    padding: '4%',
    borderRadius: '15px'    
  },
  profileBox: {
    minHeight: '300px',
    borderRadius: '15px'    
  },
  infoText: {
    fontSize: '16px',
    fontWeight: '700'
  },
  fontSubHeading: {
    fontSize: '14px',
    fontWeight: '700'
  },
  fontWhiteSecondary: {
    color: '#fff',
  },
  fontBlackPrimary: {
    color: '#38403B',
    fontWeight: '700'
  },
  fontBlackSecondary: {
    color: '#44594C',
  },
  squareIcon: {
    width: '100%',
    height: '100%',
    // color: '#fff',
    borderRadius: '10px',
    // backgroundColor: '#ff5722',
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
  paddingBottom: {
    paddingBottom: '4%'
  }
});

class Shell extends React.Component {
  state = {
    open: false,
    config: {},
    showStandbyPage: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  
  componentDidMount = () => {
      console.log('config already', config.instance.getAdminApiUrl());
      if(!config.instance.getSiteTitle()) {
        config.instance.initialize()
          .then((res) => {
            console.log('res', res);
              if(res){
                this.setState({
                  config: res
                });
              }
          })
          .catch((err) => {
            // alert('err in shell');
            //   this.setState({
            //     showStandbyPage: true
            //   })
          })
      }
  }

  Logout = () => {
    this.props.LogoutCurrentUser();
  }

  StandbyMessage = () => {
    return (
    <div className="container text-center">
      <div className="card bg-default mt-4">
        <div className="card-header">
          This Website is currently unavailable, will be back soon.
        </div>
        <div className="card-body">
          Please email to <span className="font-italic">support@cloudsolutionshub.com</span> if problem continues.
        </div>
      </div>
    </div>
    )
  }

  render() {
        const { classes, theme, isTokenExpired } = this.props;
        let user = AuthHelper.GetUserInfo();

        let { config, showStandbyPage } = this.state;
        if(!config.site_title) {
          if(showStandbyPage) {
            return this.StandbyMessage();
          }
          // alert(config.site_title);
          return (
            <LoadingComponent />
          )
        }

        if(user && (user.role === 'candidate'
                || user.role === 'student')) {
            return (
              <div className={classes.root}>
                  <CssBaseline />
                  <Header classes={classes} 
                        openState={this.state.open} 
                        onLogout={() => this.Logout()}
                        //isTickerRequired={true}
                        isDrawerRequired={false}
                        isLogoutButtonRequired={true}
                        isTokenExpired={isTokenExpired}
                        />
                    <Router>
                      <main className={classes.content}>
                        <div className={classes.toolbar} />
                          <div className="row">
                              <div className="col-md-2" />
                              <div className="col-md-8">
                                <OpMenu />
                              </div>
                              <div className="col-md-2" />
                          </div>
                          <div className="row">
                              <div className="col-md-2" />
                              <div className="col-md-8">
                                <Routes />
                              </div>
                              <div className="col-md-2" />
                            </div>
                      </main>
                    </Router>
              </div>
            );
        }
        
        if(user && (user.role === 'teacher')) {
          return (
            <div className={classes.root}>
                <CssBaseline />
                <Header classes={classes} 
                      openState={this.state.open} 
                      onLogout={() => this.Logout()}
                      isDrawerRequired={false}
                      isLogoutButtonRequired={true}
                      isTokenExpired={isTokenExpired}
                      />
                  <Router>
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                        <div className="row">
                            <div className="col-md-2" />
                            <div className="col-md-8">
                              <OpMenu />
                            </div>
                            <div className="col-md-2" />
                        </div>
                        <div className="row">
                            <div className="col-md-2" />
                            <div className="col-md-8">
                              <Routes />
                            </div>
                            <div className="col-md-2" />
                        </div>
                    </main>
                  </Router>
            </div>
          );
        }
        return (
          <div className={classes.root}>
            <CssBaseline />
            {/* <Header classes={classes} 
                    openState={this.state.open} 
                    onDrawerOpen={this.handleDrawerOpen}
                    onLogout={() => this.Logout()}
                    //isTickerRequired={false}
                    isDrawerRequired={true}
                    isLogoutButtonRequired={true}
                    isTokenExpired={isTokenExpired}
                    />
            <Router>
              {user && (user.role === 'admin') &&
              <SideDrawer classes={classes} 
                      openState={this.state.open} 
                      onDrawerClose={this.handleDrawerClose}
                      theme={theme}
                      />
              }
              <main className={classes.content}>
                  <div className={classes.toolbar} />
                      <Routes classes={classes}/>
                  
              </main>
            </Router> */}
            <Router>
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
