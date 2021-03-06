import React, { Component } from 'react';
import axios from 'axios';

import { BASE_URL } from '../../utilities/constants';
import observer from '../../utilities/observer';

class SongEditForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      song: {
        title: '',
        artist: '',
        year: '',
        album: ''
      }
    };

    this.onChange = this.onChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit (e) {
    e.preventDefault();
    axios.put(BASE_URL + '/song/' + this.state.song._id, this.state,
      {
        headers: { 'Authorization': sessionStorage.getItem('authtoken') }
      })
      .then(res => {
        console.log(res);
        this.props.history.push('/songs/details/' + this.state.song._id);
      }).catch(_ => {
        observer.showNotification(403, 'You are unauthorized to edit this song.');
      });
  }

  componentDidMount () {
    axios.get(BASE_URL + '/song/' + this.props.match.params.id,
      {
        headers: { 'Authorization': sessionStorage.getItem('authtoken') }
      }).then(song => {
      this.setState({
        song: song.data
      });
    });
  }

  onChange (e) {
    console.log(this.state);
    let name = e.target.name;
    let value = e.target.value;
    this.setState(prevState => {
      prevState.song[name] = value;
      return prevState;
    });
  }

  handleCheckboxChange (e) {
    let checked = e.target.checked;
    this.setState(prevState => {
      prevState.song.isPublic = checked;
      return prevState;
    });
    console.log(this.state);
  }

  render () {
    console.log(this.state);
    return (
      <div className='container'>
        <h2>Edit Song Metadata</h2>
        <hr />
        <form>
          <div className='col-md-6'>
            <div className='form-group row'>
              <label htmlFor='title' className='col-2 col-form-label'>Title</label>
              <div className='col-10'>
                <input onChange={this.onChange} defaultValue={this.state.song.title} field='title' type='text' name='title' id='title' className='form-control' />
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='album' className='col-2 col-form-label'>Album</label>
              <div className='col-10'>
                <input onChange={this.onChange} defaultValue={this.state.song.album} field='album' type='text' name='album' id='album' className='form-control' />
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='artist' className='col-2 col-form-label'>Artist</label>
              <div className='col-10'>
                <input onChange={this.onChange} defaultValue={this.state.song.artist} field='artist' type='text' name='artist' id='artist' className='form-control' />
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='year' className='col-2 col-form-label'>Year</label>
              <div className='col-10'>
                <input onChange={this.onChange} defaultValue={this.state.song.year} field='year' type='text' name='year' id='year' className='form-control' />
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='originalName' className='col-2 col-form-label'>File Name</label>
              <div className='col-10'>
                <input onChange={this.onChange} defaultValue={this.state.song.originalName} type='text' name='originalName' id='originalName' className='form-control' />
              </div>
            </div>
            <div className='form-group row'>
              <div className='col-10'>
                <div className='form-check'>
                  <input checked={this.state.song.isPublic} onChange={this.handleCheckboxChange} className='form-check-input' type='checkbox' value={this.state.song.isPublic} id='checkbox' />
                  <label className='form-check-label' htmlFor='checkbox'>Is Song Public?</label>
                </div>
              </div>
            </div>
            <input onClick={this.onSubmit} type='submit' className='btn btn-success' defaultValue='Edit' />
          </div>
        </form>
      </div>
    );
  }
}

export default SongEditForm;
