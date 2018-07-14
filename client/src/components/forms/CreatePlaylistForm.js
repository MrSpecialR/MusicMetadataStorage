import React from 'react';
import { Form, Text } from 'informed';
import { BASE_URL } from '../../utilities/constants';
import axios from 'axios';

let onSubmit = (data, props) => {
  axios.post(BASE_URL + '/playlist',
    data,
    { headers: { 'Authorization': sessionStorage.getItem('authtoken') } }
  ).then(res => {
    console.log(res);
    props.history.push('/');
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
