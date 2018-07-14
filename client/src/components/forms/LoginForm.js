import React from 'react';
import { Form, Text } from 'informed';
import observer from '../../utilities/observer';
import { BASE_URL } from '../../utilities/constants';
import axios from 'axios';

let onSubmit = (data, props) => {
  console.log(data);
  axios.post(BASE_URL + '/login', data)
    .then(result => {
      sessionStorage.setItem('username', result.data.username);
      sessionStorage.setItem('authtoken', result.data.Authentication);
      observer.trigger(observer.events.loginUser, result.data);
      props.history.push('/');
    }).catch(err => {
      if (err.response.status === 404 || err.response.status === 400) {
        observer.showNotification(err.response.status, 'Invalid Credentials');
        return;
      }
      console.log(err);
    });
};

let LoginForm = (props) => (
  <div className='container'>
    <h2>Login</h2>
    <hr />
    <Form>
      {({ formState }) => (
        <div className='col-md-6'>
          <div className='form-group row'>
            <label htmlFor='username' className='col-2 col-form-label'>Username</label>
            <div className='col-10'>
              <Text field='username' type='text' name='username' id='username' className='form-control' />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='password' className='col-2 col-form-label'>Password</label>
            <div className='col-10'>
              <Text field='password' type='password' name='password' id='password' className='form-control' />
            </div>
          </div>
          <input onClick={() => onSubmit(formState.values, props)} type='submit' className='btn btn-primary' value='Login' />
        </div>
      )}
    </Form>
  </div>
);

export default LoginForm;
