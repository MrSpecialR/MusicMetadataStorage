import React from 'react';
import { Link } from 'react-router-dom';

import AudioWrapper from './AudioWrapper';
import { BASE_URL } from '../../utilities/constants';

let calcTime = (dateIsoFormat) => {
  let diff = new Date() - (new Date(dateIsoFormat));
  diff = Math.floor(diff / 60000);
  if (diff < 1) return 'less than a minute';
  if (diff < 60) return diff + ' minute' + pluralize(diff);
  diff = Math.floor(diff / 60);
  if (diff < 24) return diff + ' hour' + pluralize(diff);
  diff = Math.floor(diff / 24);
  if (diff < 30) return diff + ' day' + pluralize(diff);
  diff = Math.floor(diff / 30);
  if (diff < 12) return diff + ' month' + pluralize(diff);
  diff = Math.floor(diff / 12);
  return diff + ' year' + pluralize(diff);
  function pluralize (value) {
    if (value !== 1) return 's';
    else return '';
  }
};

let SongDetails = (props) => {
  let currentUser = sessionStorage.getItem('username');
  return (
    <div className='col-12'>
      <Link to={'/songs/' + props._id + '/image/upload'}>
        <img className='img-thumbnail' src={BASE_URL + '/image/' + props._id} alt='Click here to upload album art' />
      </Link>
      <h2>
        {props.artist} - {props.title}
      </h2>
      <p>
        <AudioWrapper id={props._id} /> <br />
        Album: {props.album} <br />
        Artist: {props.artist} <br />
        Year: {props.year} <br />
        Original File Name: {props.originalName} <br />
        Uploader: {props.user.username} <br />
      </p>
      <Link to='/songs/all' className='btn btn-primary'>Back to listing</Link>&nbsp;
      {currentUser === props.user.username ? <Link to={'/songs/edit/' + props._id} className='btn btn-success'>Edit</Link> : ''}&nbsp;
      <Link to={'/songs/delete/' + props._id} className='btn btn-danger'>Delete</Link>&nbsp;
      <a href={BASE_URL + '/file/' + props._id} className='btn btn-info'>Download </a>
      <p className='text-right'>Uploaded {calcTime(props.uploadDate)} ago</p>
    </div>
  );
};

export default SongDetails;
