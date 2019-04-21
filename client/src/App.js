import React, { Component } from 'react';
import logo from './logo.svg';
import Shell from './components/Shell';
import './App.css';

import { Provider } from "react-redux";
import configureStore from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <Shell />
      </Provider>
    );
  }
}

export default App;
