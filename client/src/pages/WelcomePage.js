import React from 'react';

let HomePage = () => (
  <div className='container'>
    <h1 className='display-3'>Welcome to the Audio Database!</h1>
    <p className='lead'>We provide an audio hosting utility, in which you can upload music, audio files, make playlists out of your audio files (or public   audio files).
      Every mp3 file can contain such data, called <a href='https://en.wikipedia.org/wiki/ID3'>ID3</a>. It makes for a better listening   experience, having the mp3 player recognize it and format it accordingly. So why not enchance that experience?
      Here you can modify the most used fields: album, artist, year and title. You can also upload a song image, that gets written into   the file.
    </p>
  </div>
);

export default HomePage;
