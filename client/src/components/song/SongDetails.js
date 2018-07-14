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
  console.log(props);
  return (
    <div class='col-12'>
      <Link to={'/songs/' + props._id + '/image/upload'}>
        <img class='img-thumbnail' src={BASE_URL + '/image/' + props._id} alt='Click here to upload an image' />
      </Link>
      <h2>
        {props.artist} - {props.title}
      </h2>
      <p>
        <AudioWrapper id={props._id} /> <br />
        Album: {props.album} <br />
        Artist: {props.artist} <br />
        Original File Name: {props.originalName} <br />
      </p>
      <Link to='/songs/all' className='btn btn-primary'>Back to listing</Link>
      <p class='text-right'>Uploaded {calcTime(props.uploadDate)} ago</p>
    </div>
  );
};

export default SongDetails;
