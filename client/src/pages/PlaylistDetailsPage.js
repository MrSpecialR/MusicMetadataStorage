import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ListPlaylists from '../components/playlist/ListPlaylists';
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
    this.shufflePlaylist = this.shufflePlaylist.bind(this);
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

  shufflePlaylist () {
    if (this.state.playlist.songs.length > 0) {
      this.setState(prevState => {
        let length = prevState.playlist.songs.length;
        for (let i = 0; i < length; ++i) {
          let indexToSwap = Math.floor(Math.random() * Math.floor(length - i - 1));
          let temp = prevState.playlist.songs[indexToSwap];
          prevState.playlist.songs[indexToSwap] = prevState.playlist.songs[length - i - 1];
          prevState.playlist.songs[length - i - 1] = temp;
        }
        return prevState;
      }, () => {
        this.onSongChange({ data: this.state.playlist.songs[0] });
      });
    }
  }

  // This is not really good structure wise, but it'll do the job
  getChangeSongFunction (changeFunc) {
    this.setState({
      changeSong: changeFunc
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
        <button onClick={this.shufflePlaylist} className='btn btn-default'>Shuffle</button>
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
                    }} className='btn btn-info'>Play</button>}&nbsp;
                    <Link className='btn btn-primary' to={'/songs/details/' + s._id} >Details</Link>
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
