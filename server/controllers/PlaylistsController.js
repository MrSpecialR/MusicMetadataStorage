const Playlist = require('mongoose').model('Playlist');
const Song = require('mongoose').model('Song');

module.exports.createPlaylist = (req, res) => {
  Playlist.create({ title: req.body.title, user: req.user.id }).then(playlist => {
    res.json(playlist);
  });
};

module.exports.addToPlaylist = (req, res) => {
  // Multiple Select with songs
  Playlist.findById(req.params.id).then((playlist) => {
    if (!playlist) {
      res.sendStatus(404);
      return;
    }
    let selectedSongs = req.body.songs;
    for (let song of selectedSongs) {
      playlist.songs.push(song);
    }
    playlist.save();
    Song.updateMany({_id: {'$in': selectedSongs}}, {'$push': {'playlists': playlist._id}}, (_, raw) => {
      res.json(playlist);
    });
  });
};

module.exports.getUserPlaylists = (req, res) => {
  Playlist.find({ user: req.user.id }).sort({ creationDate: -1 }).then(playlists => {
    res.json(playlists);
  });
};
