import React, { Component } from 'react';
// import logo from './logo.svg';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

import Shell from './components/Shell';
import SimulatorShell from './Containers/Simulator/SimulatorShell';

import './App.css';

import { Provider } from "react-redux";
import configureStore from "./store";
import config from './config';
import AuthHelper from './AuthHelper';
import { Paper, Grid, Button, IconButton, Typography } from '@material-ui/core';
import { DeveloperMode } from '@material-ui/icons';
import OnlinePortalShell from './OnlinePortal/lib/OnlinePortalShell';

class OnlinePortalApp extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Provider store={configureStore()}>
          <OnlinePortalShell />
        </Provider>
      );
  }
}

export default OnlinePortalApp;
