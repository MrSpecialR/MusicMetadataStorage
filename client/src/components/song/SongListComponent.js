import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AudioWrapper from './AudioWrapper';

class SongListItem extends Component {
  render () {
    let currentUser = sessionStorage.getItem('username');

    return (
      <tr>
        <td>{this.props.title}</td>
        <td>{this.props.album}</td>
        <td>{this.props.artist}</td>
        <td>{this.props.user.username}</td>
        <td><AudioWrapper id={this.props._id} /></td>
        <td>
          <span>
            <Link to={'/songs/details/' + this.props._id} className='btn btn-primary'>Details</Link></span>
        </td>
        <td>
          {currentUser === this.props.user.username ? <Link to={'/songs/edit/' + this.props._id} className='btn btn-success'>Edit</Link> : ''}
        </td>
        <td>
          {currentUser === this.props.user.username ? <Link to={'/songs/delete/' + this.props._id} className='btn btn-danger'>Delete</Link> : ''}
        </td>
      </tr>
    );
  }
}

export default SongListItem;
