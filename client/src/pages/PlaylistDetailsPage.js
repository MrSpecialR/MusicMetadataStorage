import React, { Component } from 'react';
import ListPlaylists from '../components/playlist/ListPlaylists';
import axios from 'axios';
import { BASE_URL } from '../utilities/constants';

class PlaylistDetailsPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      playlist: { songs: [] },
      currentSong: { _id: null },
      isPlaying: false
    };

    this.getPlaylist = this.getPlaylist.bind(this);
    this.onSongChange = this.onSongChange.bind(this);
    this.getChangeSongFunction = this.getChangeSongFunction.bind(this);
  }

  getPlaylist () {
    axios.get(BASE_URL + '/playlist/' + this.props.match.params.id, {
      headers: { 'Authorization': sessionStorage.getItem('authtoken') }
    }).then(data => {
      this.setState({
        playlist: data.data
      }, () => {
        this.onSongChange({ data: this.state.playlist.songs[0] });
      });
    });
  }

  componentDidMount () {
    this.getPlaylist();
  }

  onSongChange (song, isPlaying) {
    this.setState({
      currentSong: song.data,
      isPlaying: isPlaying
    });
  }

  // This is not really good structure wise, but it'll do the job
  getChangeSongFunction (changeFunc) {
    this.setState({
      changeSong: changeFunc
    }, () => {
      console.log(this.state);
    });
  }

  render () {
    let playlist = [{
      _id: this.state.playlist._id,
      title: this.state.playlist.title,
      songs: this.state.playlist.songs.map(s => s._id)
    }];

    return (
      <div className='container'>
        <ListPlaylists getChangeSongFunction={this.getChangeSongFunction} playlists={playlist} onSongChange={this.onSongChange} />
        <table className='table'>
          <thead>
            <tr>
              <th>
                #
              </th>
              <th>
                Title
              </th>
              <th>
                Album
              </th>
              <th>
                Artist
              </th>
              <th colSpan='2'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.playlist.songs.map((s, i) => {
              return (
                <tr key={'details-' + s._id} className={s._id === this.state.currentSong._id ? 'table-success' : ''}>
                  <td> {i + 1} </td>
                  <td> {s.title} </td>
                  <td> {s.album} </td>
                  <td> {s.artist} </td>
                  <td>
                    {(s._id === this.state.currentSong._id && this.state.isPlaying) ? <button onClick={() => {
                      this.state.changeSong(i);
                    }} className='btn btn-warning'>Pause</button> : <button onClick={() => {
                      this.state.changeSong(i);
                    }} className='btn btn-info'>Play</button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PlaylistDetailsPage;
