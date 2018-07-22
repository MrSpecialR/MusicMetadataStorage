import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SongListComponent from './SongListComponent';

class SongListings extends Component {
  render () {
    return (
      <div className='container'>
        <h2>Browse Songs <Link className='btn btn-info' to='/songs/upload'>Upload</Link></h2>
        <hr />
        <table className='table'>
          <thead>
            <tr>
              <th>
                Title
              </th>
              <th>
                Album
              </th>
              <th>
                Artist
              </th>
              <th>
                Uploader
              </th>
              <th>
                Player
              </th>
              <th colSpan='3'>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {this.props.songs.map(song => {
              return <SongListComponent key={song._id} {...song} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SongListings;
