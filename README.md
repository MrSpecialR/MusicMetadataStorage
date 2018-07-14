# Music Metadata Storage
A React front-end &amp; Express back-end project that hosts music files and can modify their ID3 metadata, and has basic playlist functionality.

## How it works
It uses React for the front end, acting as the client, connecting to a REST API that uses ExpressJS and the JWT Authentication method.
For storage, it uses MongoDB for storing Users, Playlists and Song information and the actual files and images are stored on the file system in a folder called 'uploads/songs' inside the server.

## The Front End
We are using the ReactJS Framework that connects to the back-end through requests to the REST API. On top of that, we have Bootstrap for now, used for simple styling of the pages.

## The Back End
ExpressJS deals with interfacing to the MongoDB database (using Mongoose) and also the file system. It provides end-points for creating, editing and deleting data.
Once a mp3 file is uploaded or has its ID3 data modified, the changes are reflected directly to the file, so it can be used as a simple ID3 tag editor, as well as a place to store music, or serve said music.
All the functionality is available only to users that register. Authentication is done by passing on a JWT that's then given back to the server in order to both authenticate and authorize a user.

## The Storage
Every uploaded file gets saved to the folder 'server/uploads/songs', it's given an unique ID that corresponds to the Song ID in the database in order to simulate a 1:1 relationship between a database entity Song and a music & image file combo.

# What purpose does it serve?
It's a solution for locally hosting a music storage service that's available on all devices on the local network, whilst keeping the possibility of multiple users using it to upload their own music and mainatain their own playlists, seperate from the others.
