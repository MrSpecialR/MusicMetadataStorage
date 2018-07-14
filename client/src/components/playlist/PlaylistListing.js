import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlaylistPlayer from './PlaylistPlayer';

class PlaylistListing extends Component {
  render () {
    return (
      <tr>
        <td>{this.props.title}</td>
        <td>{this.props.songs.length}</td>
        <PlaylistPlayer songs={this.props.songs} />
        <td>
          <span>
            <Link to={'/songs/details/' + this.props._id} className='btn btn-primary btn-sm'>Details</Link></span>
        </td>
        <td>
          <Link to={'/songs/edit/' + this.props._id} className='btn btn-success btn-sm'>Edit</Link>
        </td>
      </tr>
    );
  }
}

export default PlaylistListing;
