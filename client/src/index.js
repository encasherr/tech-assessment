import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import OnlinePortalApp from './OnlinePortalApp';
import * as serviceWorker from './serviceWorker';

import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';


ReactDOM.render(<App />, document.getElementById('root'));
/*let currentUrl = window.location.href;
if(currentUrl.indexOf('/admin') > -1) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
else {
    ReactDOM.render(<OnlinePortalApp />, document.getElementById('root'));
}
*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
