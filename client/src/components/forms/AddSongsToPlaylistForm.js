import React, { Component } from 'react';
import { Form, Select, Option } from 'informed';
import { BASE_URL } from '../../utilities/constants';
import axios from 'axios';

let onSubmit = (data, props) => {
  axios.post(BASE_URL + '/playlist/' + props.match.params.id,
    data,
    { headers: { 'Authorization': sessionStorage.getItem('authtoken') } }
  ).then(res => {
    console.log(res);
    props.history.push('/playlists/details/' + props.match.params.id);
  });
};

class AddSongsToPlaylistForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      songs: []
    };
  }

  componentDidMount () {
    axios.get(BASE_URL + '/playlist/' + this.props.match.params.id + '/available',
      {
        headers: { 'Authorization': sessionStorage.getItem('authtoken') }
      }).then(data => {
      let songs = data.data;
      this.setState({
        songs
      });
    });
  }

  render () {
    return (
      <div className='container'>
        <h2>Add Songs To Playlist</h2>
        <hr />
        <Form>
          {({ formState }) => (
            <div className='col-md-6'>
              <div className='form-group row'>
                <label className='col-2 col-form-label' htmlFor='songs'>Songs</label>
                <div className='col-10'>
                  <Select field='songs' multiple class='form-control' id='songs' name='songs'>
                    {this.state.songs.map(s => <Option key={s._id} value={s._id}>{s.title}</Option>)}
                  </Select>
                </div>
              </div>
              <input onClick={() => onSubmit(formState.values, this.props)} type='submit' className='btn btn-primary' value='Add Songs to Playlist' />
            </div>
          )}
        </Form>
      </div>
    );
  }
}

export default AddSongsToPlaylistForm;
