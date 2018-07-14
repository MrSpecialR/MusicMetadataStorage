import React, { Component } from 'react';
import { BASE_URL } from '../../utilities/constants';
import axios from 'axios';

class PlaylistListing extends Component {
  constructor (props) {
    super(props);
    this.state = {
      songIndex: 0,
      songTitle: ''
    };

    this.audio = React.createRef();

    this.changeSong = this.changeSong.bind(this);
    this.playNext = this.playNext.bind(this);
    this.playPrevious = this.playPrevious.bind(this);
  }

  componentDidMount () {
    this.changeSong(0);
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
    if (this.props.songs.length > 0 && songIndex >= 0 && this.props.songs.length > this.state.songIndex) {
      axios.get(BASE_URL + '/song/' + this.props.songs[songIndex],
        {
          headers: { 'Authorization': sessionStorage.getItem('authtoken') }
        }).then(res => {
        this.setState({
          songIndex: songIndex,
          songTitle: res.data.title
        }, () => {
          if (this.state.songIndex !== 0) {
            this.audio.current.play();
          }
        });
      });
    }
  }

  render () {
    return (
      <React.Fragment>
        <td>
          {this.state.songIndex + 1}
        </td>
        <td>
          {this.state.songTitle}
        </td>
        <td>
          <button onClick={this.playPrevious} className='btn btn-light'>Previous</button>
        </td>
        <td>
          <audio ref={this.audio} onEnded={(e) => {
            this.playNext();
            e.target.play();
          }} controls src={BASE_URL + '/file/' + this.props.songs[this.state.songIndex]} />
        </td>
        <td>
          <button onClick={this.playNext} className='btn btn-light'>Next</button>
        </td>
      </React.Fragment>
    );
  }
}

export default PlaylistListing;
