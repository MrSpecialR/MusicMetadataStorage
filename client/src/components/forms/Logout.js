import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import observer from '../../utilities/observer';

export default class Logout extends Component {
  logout () {
    sessionStorage.removeItem('authtoken');
    sessionStorage.removeItem('username');

    observer.trigger(observer.events.loginUser, {
      isAdmin: false,
      user: ''
    });
  }

  render () {
    this.logout();
    return (
      <Redirect to='/'> Logout </Redirect>
    );
  }
}
