import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux';

import LoadingComponent from '../../components/lib/LoadingComponent';
import config from '../../config';
import { info, primary, secondary, success, warning } from '../../components/lib/ColorCodes';
import OnlinePortalRoutes from './OnlinePortalRoutes';
import OpHeader from '../Home/OpHeader';

const drawerWidth = 240;

const styles = theme => createMuiTheme({
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

class OnlinePortalShell extends React.Component {
  state = {
    config: {}
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
        const { classes, theme } = this.props;

        let { config } = this.state;
        if(!config.site_title) {
          return (
            <LoadingComponent />
          )
        }

            return (
              <div className={classes.root}>
                  <CssBaseline />
                  <OpHeader classes={classes} />
                    <Router>
                      <main className={classes.content}>
                        <div className={classes.toolbar} />
                            <OnlinePortalRoutes />
                      </main>
                    </Router>
              </div>
            );

    }
}

OnlinePortalShell.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  ...state.userReducer
});
const mapDispatchToProps = dispatch => ({

});
export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(OnlinePortalShell));
