import React, { Component } from 'react';
import axios from 'axios';

import { BASE_URL } from '../utilities/constants';
import ListPlaylists from '../components/playlist/ListPlaylists';

class PlaylistsPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      playlists: []
    };

    this.getPlaylists = this.getPlaylists.bind(this);
  }

  getPlaylists () {
    axios.get(BASE_URL + '/user/playlists', {
      headers: { 'Authorization': sessionStorage.getItem('authtoken') }
    }).then(data => {
      this.setState({
        playlists: data.data
      });
    });
  }

  componentDidMount () {
    this.getPlaylists();
  }

  render () {
    return <ListPlaylists playlists={this.state.playlists} />;
  }
}

export default PlaylistsPage;
