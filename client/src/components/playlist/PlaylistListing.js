import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PlaylistPlayer from './PlaylistPlayer';

class PlaylistListing extends Component {
  render () {
    return (
      <tr>
        <td>{this.props.title}</td>
        <PlaylistPlayer key={'player-' + this.props._id} getChangeSongFunction={this.props.getChangeSongFunction} onSongChange={this.props.onSongChange} songs={this.props.songs} />
        <td>
          <Link to={'/playlists/details/' + this.props._id} className='btn btn-primary'>Details</Link>
        </td>
        <td>
          <Link to={'/playlists/songs/add/' + this.props._id} className='btn btn-success'>Add Songs</Link>
        </td>
      </tr>
    );
  }
}

export default PlaylistListing;
