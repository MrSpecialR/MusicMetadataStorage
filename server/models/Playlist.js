const mongoose = require('mongoose');

let playlistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  creationDate: { type: mongoose.Schema.Types.Date, default: Date.now }
});

mongoose.model('Playlist', playlistSchema);

module.exports = mongoose.model('Playlist');
