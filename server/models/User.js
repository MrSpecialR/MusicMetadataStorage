const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  roles: [{ type: mongoose.Schema.Types.String }],
  uploadedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  playlists: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' } ]
});

mongoose.model('User', userSchema);

module.exports = mongoose.model('User');
