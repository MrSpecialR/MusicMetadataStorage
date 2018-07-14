const mongoose = require('mongoose');

let songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String },
  album: { type: String },
  year: { type: mongoose.Schema.Types.String }, // Some weird metadata exists out there
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uploadDate: { type: mongoose.Schema.Types.Date, default: Date.now },
  hasImage: { type: mongoose.Schema.Types.Boolean },
  originalName: { type: mongoose.Schema.Types.String },
  isPublic: { type: mongoose.Schema.Types.Boolean }
});

mongoose.model('Song', songSchema);

module.exports = mongoose.model('Song');
