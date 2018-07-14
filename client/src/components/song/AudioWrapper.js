import React, { Component } from 'react';
import { BASE_URL } from '../../utilities/constants';

class AudioWrapper extends Component {
  render () {
    return (
      <audio controls src={BASE_URL + '/file/' + this.props.id} />
    );
  }
}

export default AudioWrapper;
