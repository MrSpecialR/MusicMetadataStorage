import React, { Component } from 'react';
import LoginForm from '../forms/LoginForm';
import { Route, Redirect } from 'react-router-dom';
import UploadForm from '../forms/UploadForm';
import RegisterForm from '../forms/RegisterForm';
import Logout from '../forms/Logout';
import observer from '../../utilities/observer';
import SongListPage from '../../pages/SongListPage';
import SongDetailsPage from '../../pages/SongDetailsPage';
import UploadImageForm from '../forms/UploadImageForm';
import SongEditForm from '../forms/SongEditForm';
import SongDeleteForm from '../forms/SongDeleteForm';
import CreatePlaylistForm from '../forms/CreatePlaylistForm';
import UserSongsPage from '../../pages/UserSongsPage';
import PlaylistsPage from '../../pages/PlaylistsPage';
import WelcomePage from '../../pages/WelcomePage';
import AddSongsToPlaylistForm from '../forms/AddSongsToPlaylistForm';
import PlaylistDetailsPage from '../../pages/PlaylistDetailsPage';

let UserRoute = (props) => {
  return <Route {...props} component={(compProps) => {
    return props.user ? <props.component {...compProps} /> : <Redirect to='/login' />;
  }} />;
};

let AdminRoute = (props) => {
  return <Route {...props} component={(compProps) => {
    return props.isAdmin ? <props.component {...compProps} /> : <Redirect to='/' />; // Should go to homepage
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
      <div>
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
      </div>
    );
  }
}
export default Routes;
