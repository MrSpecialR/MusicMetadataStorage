import React, { Component } from 'react';
import PlaylistListing from './PlaylistListing';
import { Link } from 'react-router-dom';

class ListPlaylists extends Component {
  render () {
    return (
      <div className='container'>
        <h2>Your Playlists <Link className='btn btn-info' to='/playlists/create'>Create Playlist</Link></h2>
        <hr />
        <table className='table'>
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Number of songs
              </th>
              <th>
                #
              </th>
              <th>
                <span className='text-center pagination-centered'>Current Song</span>
              </th>
              <th colSpan='3'>
                Player
              </th>
              <th colSpan='3'>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {this.props.playlists.map(playlist => {
              return <PlaylistListing key={playlist._id} {...playlist} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListPlaylists;
