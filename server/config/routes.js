const SongsController = require('../controllers/SongsController');
const UsersController = require('../controllers/UsersController');
const PlaylistsController = require('../controllers/PlaylistsController');

const auth = require('./auth');

module.exports = (app) => {
  app.get('/all', auth.UserRoute, SongsController.allSongsGet);
  app.post('/login', UsersController.loginPost);
  app.post('/register', UsersController.registerPost);
  app.get('/song/:id', auth.UserRoute, SongsController.songGet);
  app.put('/song/:id', auth.UserRoute, SongsController.songPut);
  app.delete('/song/:id', auth.UserRoute, SongsController.songDelete);
  app.post('/song', auth.UserRoute, SongsController.songPost);
  app.get('/file/:id', SongsController.songFileGet);
  app.get('/image/:id', SongsController.getImage);
  app.post('/image/:id', SongsController.postImage);
  app.get('/user/playlists', PlaylistsController.getUserPlaylists);
  app.get('/user/songs', SongsController.getUserSongs);
  app.post('/playlist/:id', PlaylistsController.addToPlaylist);
  app.post('/playlist', PlaylistsController.createPlaylist);
};
