import React, { Component } from 'react';
import axios from 'axios';
import observer from '../../utilities/observer';
import { BASE_URL } from '../../utilities/constants';

export default class UploadForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      file: null,
      checkbox: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();
    if (!this.state.file) {
      observer.showNotification(400, 'You need to provide a .mp3 file!');
      return;
    }
    let fd = new FormData();
    fd.append('file', this.state.file, this.state.file.name);
    fd.append('checkbox', this.state.checkbox);
    axios({
      method: 'post',
      url: BASE_URL + '/song',
      data: fd,
      headers: {'Authorization': sessionStorage.getItem('authtoken')}
    }).then(result => {
      this.props.history.push('/songs/all');
    });
  }

  handleChange (e) {
    let file = e.target.files[0];
    if (file === undefined) {
      file = null;
    }
    this.setState({
      file: file
    });
    console.log(this.state.file);
  }

  handleCheckboxChange (e) {
    let checked = e.target.checked;
    this.setState({
      checkbox: checked
    });
  }

  render () {
    return (
      <div className='container'>
        <h2>Upload a song</h2>
        <hr />
        <form encType='multipart/form-data'>
          <div className='col-md-6'>
            <div className='form-group row'>
              <label htmlFor='file' className='col-2 col-form-label'>Music</label>
              <div className='col-10'>
                <input onChange={this.handleChange} id='file' type='file' name='file' className='form-control' accept='audio/mp3' />
              </div>
            </div>
            <div className='form-group row'>
              <div className='col-10'>
                <div className='form-check'>
                  <input checked={this.state.checkbox} onChange={this.handleCheckboxChange} className='form-check-input' type='checkbox' value={this.state.checkbox} id='checkbox' />
                  <label className='form-check-label' htmlFor='checkbox'>Is Song Public?</label>
                </div>
              </div>
            </div>
            <input type='submit' onClick={this.handleSubmit} className='btn btn-primary' value='Create' />
          </div>
        </form>
      </div>
    );
  }
}
