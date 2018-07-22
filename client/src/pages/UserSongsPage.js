import React, { Component } from 'react';
import axios from 'axios';

import SongListings from '../components/song/SongListings';
import { BASE_URL } from '../utilities/constants';

class UserSongsPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      songs: []
    };

    this.getSongs = this.getSongs.bind(this);
  }

  getSongs () {
    axios.get(BASE_URL + '/user/songs', {
      headers: { 'Authorization': sessionStorage.getItem('authtoken') }
    }).then(data => {
      this.setState({
        songs: data.data
      });
    });
  }

  componentDidMount () {
    this.getSongs();
  }

  render () {
    return <SongListings songs={this.state.songs} />;
  }
}

export default UserSongsPage;
