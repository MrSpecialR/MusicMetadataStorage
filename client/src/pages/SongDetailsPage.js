import React, { Component } from 'react';
import axios from 'axios';

import SongDetails from '../components/song/SongDetails';
import { BASE_URL } from '../utilities/constants';

class SongDetailsPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      song: null
    };
  }

  componentDidMount () {
    axios.get(BASE_URL + '/song/' + this.props.match.params.id,
      {
        headers: { 'Authorization': sessionStorage.getItem('authtoken') }
      }).then(song => {
      this.setState({
        song: song.data
      });
    });
  }

  render () {
    if (!this.state.song) {
      return <div />;
    }
    return <SongDetails {...this.state.song} />;
  }
}

export default SongDetailsPage;
