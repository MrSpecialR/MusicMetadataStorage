import React from 'react';
import { Link } from 'react-router-dom';
import UserNavigation from './UserNavigation';

let Navigation = (props) => {
  return (
    <div className='navbar-nav'>
      <nav className='navbar navbar-toggleable-md navbar-light bg-faded'>
        <button className='navbar-toggler navbar-toggler-right' type='button' data-toggle='collapse' data-target='#navbarNavDropdown' aria-controls='navbarNavDropdown' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>
        <Link className='navbar-brand' to='/'>Music Database</Link>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            <li className='nav-item active'>
              <Link className='nav-link' to='/songs/all'>Browse Music</Link>
            </li>
            <li className='nav-item dropdown active'>
              <button className='nav-link btn-link dropdown-toggle' id='navbarDropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                Playlists
              </button>
              <div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>

                <Link className='dropdown-item' to='/playlists/create'>Create Playlist</Link>
                <Link className='dropdown-item' to='/profile/playlists'>My Playlists</Link>
              </div>
            </li>
          </ul>
          <UserNavigation />
        </div>
      </nav>
    </div >
  );
};

export default Navigation;
