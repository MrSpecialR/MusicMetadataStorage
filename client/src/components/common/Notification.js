import React, { Component } from 'react';

import observer from '../../utilities/observer';

const INITIAL_STATE = {
  text: null,
  type: null
};

const NotificationTypes = {
  error: 'bg-danger',
  success: 'bg-success',
  loading: 'bg-info'
};

export default class Notification extends Component {
  constructor (props) {
    super(props);
    this.state = INITIAL_STATE;

    this.updateNotification = this.updateNotification.bind(this);

    observer.subscribe(observer.events.notification, this.updateNotification);
  }

  updateNotification (data) {
    this.setState({
      text: data.text,
      type: data.type
    });
    setTimeout(() => {
      this.hideNotification();
    }, data.duration || 1500);
  }

  hideNotification () {
    this.setState(INITIAL_STATE);
  }

  render () {
    const text = this.state.text;
    const divClassName = NotificationTypes[this.state.type];
    if (!text) {
      return null;
    }
    let classNames = `${divClassName} text-center p-3 mb-2 text-white`;
    return (
      <div className={classNames}><span>{text}</span></div>
    );
  }
}

export { NotificationTypes };
