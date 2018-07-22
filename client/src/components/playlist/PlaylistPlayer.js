import React, { Component } from 'react';
import axios from 'axios';

import { BASE_URL } from '../../utilities/constants';

class PlaylistListing extends Component {
  constructor (props) {
    super(props);
    this.state = {
      songIndex: -1,
      song: { data: { title: '' } }
    };

    this.audio = React.createRef();

    this.changeSong = this.changeSong.bind(this);
    this.playNext = this.playNext.bind(this);
    this.playPrevious = this.playPrevious.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onPlay = this.onPlay.bind(this);
  }

  componentDidMount () {
    axios.get(BASE_URL + '/song/' + this.props.songs[0],
      {
        headers: { 'Authorization': sessionStorage.getItem('authtoken') }
      }).then(res => {
      this.setState({
        song: res,
        songIndex: 0
      });
    });
    if (this.props.getChangeSongFunction) {
      this.props.getChangeSongFunction(this.changeSong);
    }
  }

  onPlay () {
    if (this.props.onSongChange) {
      this.props.onSongChange(this.state.song, true);
    }
  }

  onPause () {
    if (this.props.onSongChange) {
      this.props.onSongChange(this.state.song, false);
    }
  }

  playNext () {
    let nextIndex = this.state.songIndex + 1;
    if (nextIndex >= this.props.songs.length) {
      nextIndex = 0;
    }

    this.changeSong(nextIndex);
  }

  playPrevious (e) {
    let previousIndex = this.state.songIndex - 1;
    if (previousIndex < 0) {
      previousIndex = this.props.songs.length - 1;
    }

    this.changeSong(previousIndex);
  }

  changeSong (songIndex) {
    if (songIndex === this.state.songIndex) {
      if (this.audio.current.paused) {
        this.audio.current.play();
      } else {
        this.audio.current.pause();
      }
      return;
    }
    if (this.props.songs.length > 0 && songIndex >= 0 && this.props.songs.length > this.state.songIndex) {
      axios.get(BASE_URL + '/song/' + this.props.songs[songIndex],
        {
          headers: { 'Authorization': sessionStorage.getItem('authtoken') }
        }).then(res => {
        this.setState({
          songIndex: songIndex,
          song: res
        }, () => {
          this.audio.current.play();
          if (this.props.onSongChange) {
            this.props.onSongChange(res);
          }
        });
      });
    }
  }

  render () {
    return (
      <React.Fragment>
        <td>
          {this.props.songs.length === 0 ? '-' : this.state.songIndex + 1}
        </td>
        <td>{this.props.songs.length}</td>
        <td>
          {this.state.song.data ? this.state.song.data.title : ''}
        </td>
        <td>
          <button onClick={this.playPrevious} className='btn btn-light'>Previous</button>
        </td>
        <td>
          <audio ref={this.audio} onPlay={this.onPlay} onPause={this.onPause} onEnded={(e) => {
            this.playNext();
            e.target.play();
          }} controls src={this.props.songs[this.state.songIndex] ? BASE_URL + '/file/' + this.props.songs[this.state.songIndex] : ''} />
        </td>
        <td>
          <button onClick={this.playNext} className='btn btn-light'>Next</button>
        </td>
      </React.Fragment>
    );
  }
}

export default PlaylistListing;
