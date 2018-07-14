import React, { Component } from 'react';

import Routes from './components/common/Routes';
import Navigation from './components/common/Navigation';
import Notification from './components/common/Notification';

import './App.css';

class App extends Component {
  render () {
    return (
      <div>
        <Navigation />
        <Notification />
        <br />
        <Routes />
      </div>
    );
  }
}

export default App;
