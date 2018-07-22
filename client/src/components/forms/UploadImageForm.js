import React, { Component } from 'react';
import axios from 'axios';

import { BASE_URL } from '../../utilities/constants';
import observer from '../../utilities/observer';

export default class UploadForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      file: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();
    if (!this.state.file) {
      observer.showNotification(400, 'You need to provide a .jpg file!');
      return;
    }
    let fd = new FormData();
    fd.append('file', this.state.file, this.state.file.name);
    axios({
      method: 'post',
      url: BASE_URL + '/image/' + this.props.match.params.id,
      data: fd,
      headers: {'Authorization': sessionStorage.getItem('authtoken')}
    }).then(result => {
      this.props.history.push('/songs/details/' + this.props.match.params.id);
    });
  }

  handleChange (e) {
    this.setState({
      file: e.target.files[0]
    });
  }

  render () {
    return (
      <div className='container'>
        <h2>Upload an Image</h2>
        <hr />
        <form encType='multipart/form-data'>
          <div className='col-md-6'>
            <div className='form-group row'>
              <label htmlFor='file' className='col-2 col-form-label'>Music</label>
              <div className='col-10'>
                <input onChange={this.handleChange} id='file' type='file' name='file' className='form-control' accept='image/jpg' />
              </div>
            </div>
            <input type='submit' onClick={this.handleSubmit} className='btn btn-primary' value='Create' />
          </div>
        </form>
      </div>
    );
  }
}
