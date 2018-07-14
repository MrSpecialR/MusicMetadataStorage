import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import observer from '../../utilities/observer';

class UserNavigation extends Component {
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
    if (!this.state.user) {
      return (
        <ul className='nav navbar-nav ml-auto'>
          <li className='nav-item active'><Link className='nav-link' to='/register'>Register</Link></li>
          <li className='nav-item active'><Link className='nav-link' to='/login'>Log in</Link></li>
        </ul>
      );
    }

    if (this.state.isAdmin) {
      return (
        <ul className='nav navbar-nav ml-auto'>
          <li className='nav-item active'>
            <Link className='nav-link' to='/profile/songs'>Welcome Administrator {this.state.user}</Link>
          </li>
          <li className='nav-item active'><Link className='nav-link' to='/logout'>Log out</Link></li>
        </ul>
      );
    }
    return (
      <ul className='nav navbar-nav ml-auto'>
        <li className='nav-item active'>
          <Link className='nav-link' to='/profile/songs'>Welcome {this.state.user}</Link>
        </li>
        <li className='nav-item active'><Link className='nav-link' to='/logout'>Log out</Link></li>
      </ul>
    );
  }
}

export default UserNavigation;
/*
                login
                @if (User.IsInRole(GlobalConstants.AdministratorRole))
                {
                    <li className='nav-item dropdown active'>
                        <Link className='nav-link dropdown-toggle' href='http://example.com' id='navbarDropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                            Administrator
                        </Link>
                        <div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                            <Link className='dropdown-item' asp-area='Administrator' asp-controller='User' asp-action='All'>Users</Link>
                            <Link className='dropdown-item' asp-area='Administrator' asp-controller='Category' asp-action='All'>Categories</Link>
                        </div>
                    </li>
                }
*/
