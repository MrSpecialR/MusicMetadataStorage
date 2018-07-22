import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import observer from '../../utilities/observer';

import WelcomePage from '../../pages/WelcomePage';
import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';
import Logout from '../forms/Logout';

import UploadForm from '../forms/UploadForm';
import SongListPage from '../../pages/SongListPage';
import SongDetailsPage from '../../pages/SongDetailsPage';
import UploadImageForm from '../forms/UploadImageForm';
import SongEditForm from '../forms/SongEditForm';
import SongDeleteForm from '../forms/SongDeleteForm';
import CreatePlaylistForm from '../forms/CreatePlaylistForm';
import UserSongsPage from '../../pages/UserSongsPage';
import PlaylistsPage from '../../pages/PlaylistsPage';
import AddSongsToPlaylistForm from '../forms/AddSongsToPlaylistForm';
import PlaylistDetailsPage from '../../pages/PlaylistDetailsPage';
import NotFoundPage from '../../pages/NotFoundPage';

let UserRoute = (props) => {
  return <Route {...props} component={(compProps) => {
    if (!props.user) {
      observer.showNotification(401, 'Login or register to be able to view this page!');
    }
    return props.user ? <props.component {...compProps} /> : <Redirect to='/login' />;
  }} />;
};

let AdminRoute = (props) => {
  return <Route {...props} component={(compProps) => {
    if (!props.isAdmin) {
      observer.showNotification(401, 'You are not authorized to view this page!');
    }
    return props.isAdmin ? <props.component {...compProps} /> : <Redirect to='/' />;
  }} />;
};

class Routes extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isAdmin: false,
      user: null
    };

    this.loginUser = this.loginUser.bind(this);
    observer.subscribe(observer.events.loginUser, this.loginUser);
  }

  loginUser (userData) {
    this.setState({
      isAdmin: userData.isAdmin,
      user: userData.username
    });
  }

  render () {
    return (
      <Switch>
        <Route user={this.state.user} path='/' exact component={WelcomePage} />
        <Route path='/login' exact component={LoginForm} />
        <Route path='/register' exact component={RegisterForm} />
        <Route path='/logout' exact component={Logout} />

        <UserRoute user={this.state.user} path='/songs/details/:id' exact component={SongDetailsPage} />
        <UserRoute user={this.state.user} path='/songs/all' exact component={SongListPage} />
        <UserRoute user={this.state.user} path='/songs/:id/image/upload' exact component={UploadImageForm} />
        <UserRoute user={this.state.user} path='/profile/songs' exact component={UserSongsPage} />
        <UserRoute user={this.state.user} path='/playlists/create' exact component={CreatePlaylistForm} />
        <UserRoute user={this.state.user} path='/profile/playlists' exact component={PlaylistsPage} />
        <UserRoute user={this.state.user} exact path='/songs/edit/:id' component={SongEditForm} />
        <UserRoute user={this.state.user} exact path='/songs/delete/:id' component={SongDeleteForm} />
        <UserRoute user={this.state.user} exact path='/songs/upload' component={UploadForm} />
        <UserRoute user={this.state.user} exact path='/playlists/songs/add/:id' component={AddSongsToPlaylistForm} />
        <UserRoute user={this.state.user} exact path='/playlists/details/:id' component={PlaylistDetailsPage} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
