import React from 'react';
import { Form, Text } from 'informed';
import axios from 'axios';

import { BASE_URL } from '../../utilities/constants';
import observer from '../../utilities/observer';

let onSubmit = (data, props) => {
  if (!data.title || !data.title.trim()) {
    observer.showNotification(400, 'You must give a title!');
    return;
  }
  axios.post(BASE_URL + '/playlist',
    data,
    { headers: { 'Authorization': sessionStorage.getItem('authtoken') } }
  ).then(res => {
    props.history.push('/playlists/details/' + res.data._id);
  });
};

let CreatePlaylistForm = (props) => (
  <div className='container'>
    <h2>Create Playlist</h2>
    <hr />
    <Form>
      {({ formState }) => (
        <div className='col-md-6'>
          <div className='form-group row'>
            <label htmlFor='title' className='col-2 col-form-label'>Title</label>
            <div className='col-10'>
              <Text field='title' type='text' name='title' id='title' className='form-control' />
            </div>
          </div>
          <input onClick={() => onSubmit(formState.values, props)} type='submit' className='btn btn-primary' value='Create Playlist' />
        </div>
      )}
    </Form>
  </div>
);

export default CreatePlaylistForm;
