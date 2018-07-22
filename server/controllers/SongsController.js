const Song = require('mongoose').model('Song');
const Playlist = require('mongoose').model('Playlist');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const id3 = require('node-id3');

module.exports.allSongsGet = (req, res) => {
  Song.find({ $or: [{ isPublic: true }, { user: req.user.id }] }).sort({ uploadDate: -1 }).populate('user', '_id username').then(songs => {
    res.json(songs);
  });
};

module.exports.songGet = (req, res) => {
  let id = req.params.id;
  Song.findById(id).populate('user', '_id username').then(song => {
    console.log(song);
    res.json(song);
  });
};

module.exports.songFileGet = (req, res) => {
  let id = req.params.id;
  Song.findById(id).then(song => {
    res.setHeader('Content-Disposition', 'attachment; filename=' + song.originalName);
    res.setHeader('Content-Transfer-Encoding', 'binary');
    res.setHeader('Content-Type', 'audio/mpeg');

    let songPath = path.join(__dirname, `../uploads/songs/${id}.mp3`);
    res.sendFile(songPath);
  }).catch(_ => {
    res.sendStatus(400);
  });
};

module.exports.songDelete = (req, res) => {
  Song.findById(req.params.id).then(found => {
    if (!found.user.equals(req.user.id) && !req.user.isAdmin) {
      res.sendStatus(401);
      return;
    }
    Playlist.find({ _id: { $in: found.playlists } }).then(playlists => {
      for (let playlist of playlists) {
        playlist.songs = playlist.songs.filter(s => !s.equals(found._id));
        playlist.save();
      }
      Song.deleteOne({ _id: req.params.id })
        .then(song => {
          res.json(song);
        })
        .catch(_ => {
          res.sendStatus(500);
        });
    });
  });
};

module.exports.getImage = (req, res) => {
  let id = req.params.id;
  let songPath = path.join(__dirname, `../uploads/songs/${id}.jpg`);
  fs.stat(songPath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.sendStatus(404);
      return;
    }
    res.sendFile(songPath);
  });
};

module.exports.postImage = (req, res) => {
  let form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, '../uploads/songs');
  form.keepExtensions = true;

  form.parse(req, (err, fields, { file }) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
    console.log(file);
    let filePath = path.join(__dirname, '../uploads/songs/') + req.params.id + '.mp3';
    id3.read(filePath, (err, tags) => {
      if (err) {
        console.log(err);
        return;
      }
      tags.image = file.path;
      id3.write(tags, filePath, (err, result) => {
        console.log(err);
        fs.rename(file.path, path.join(__dirname, '../uploads/songs/') + req.params.id + '.jpg', () => {
          console.log('Image uploaded!');
          res.sendStatus(200);
        });
      });
    });
  });
};

module.exports.songPost = (req, res) => {
  let form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, '../uploads/songs');
  form.keepExtensions = true;

  form.parse(req, (err, fields, { file }) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
    id3.read(file.path, (err, tags) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      }
      let song = {
        user: req.user.id,
        title: tags.title || file.name,
        artist: tags.artist,
        album: tags.album,
        year: tags.year,
        originalName: file.name,
        hasImage: tags.image !== undefined,
        isPublic: fields.checkbox !== 'false'
      };
      Song.create(song).then(newSong => {
        let newPath = path.dirname(file.path) + '/' + newSong.id + '.mp3';
        fs.rename(file.path, newPath, () => {
          if (newSong.hasImage) {
            let imagelocation = path.dirname(file.path) + '/' + newSong.id + '.jpg';
            fs.writeFile(imagelocation, tags.image.imageBuffer, () => {
              console.log('Uploaded image for ' + newSong.title);
            });
          }
          res.json(newSong);
        });
      });
    });
  });
};

module.exports.songPut = (req, res) => {
  let userid = req.user.id;
  let songId = req.body.song._id;
  Song.findById(songId, (err, song) => {
    if (err || !song.user.equals(userid)) {
      res.sendStatus(403);
      return;
    }
    req.body.song.originalName = req.body.song.originalName.replace(/[^a-z0-9.A-Z]/gi, '_').toLowerCase();
    Object.assign(song, req.body.song);
    let filePath = path.join(__dirname, '../uploads/songs/') + songId + '.mp3';
    id3.read(filePath, (err, tags) => {
      if (err) {
        console.log(err);
        return;
      }
      tags.artist = song.artist;
      tags.year = song.year;
      tags.album = song.album;
      tags.title = song.title;
      id3.write(tags, filePath, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }

        song.save();
        res.sendStatus(200);
      });
    });
  });
};

module.exports.getUserSongs = (req, res) => {
  Song.find({ user: req.user.id }).sort({ uploadDate: -1 }).populate('user', '_id username').then(songs => {
    res.json(songs);
  });
};
