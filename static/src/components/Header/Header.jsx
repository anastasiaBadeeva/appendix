/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { getUser } from '../../utils/AuthService';
import DropDownMenu from '../DropDownMenu/DropDownMenu';

import ContactUs from './imgs/Contact-us.svg';
import Logo from '../../../assets/Symbol-Navy-Blue.png';

export default class Header extends Component {
  constructor(props) {
		super(props);

    this.state = {
      openProfileMenu: false,
    }
	}

  setOpenProfileMenu() {
    this.setState({ openProfileMenu: !this.state.openProfileMenu })
  }

  getInitials(user) {
    let firstName = user.given_name || '';
    let secondName = user.family_name || '';

    if (!firstName && !secondName) {
      const userName = user.name.split(' ')
      if (userName.length === 2) {
        firstName = userName[0];
        secondName = userName[1];
      } else {
        firstName = user.name[0];
        secondName = user.name[1];
      }
    }

    const initials = firstName[0] + secondName[0];
    return initials.toUpperCase();
  }

  render() {
    const user = getUser();
    const initials = this.getInitials(user);

    const profileDropDown = [
      {
        title: 'Account information',
        link: '/profile',
      },
      {
        title: 'Log out',
        link: '/logout',
      }
    ];

    const {
      isHome,
      isLogged,
    } = this.props

    const {
      openProfileMenu,
    } = this.state

    return (
      <div className='header-wrapper'>
        <div className="header-nav-wrapper">
          <Link to='/home' className="header-logo-wrapper">
            <img src={Logo} alt="logo" className="header-logo"/>
            <h1 className="header-logo-title">MARKERR</h1>
          </Link>
          <div className="header-nav">
            <NavLink to="/dashboards" replace activeClassName="selected">
              Dashboards
            </NavLink>
            <NavLink to="/reports" replace activeClassName="selected">
              Reports
            </NavLink>
            <NavLink to="/datasets" replace activeClassName="selected">
              Datasets
            </NavLink>
          </div>
        </div>
        <div className="header-buttons">
          <a className="header-button" rel="noopener noreferrer" href="mailto:support@markerr.com">
            <img src={ContactUs} alt="contact us" />
          </a>
          {isLogged ? (
              <button
                onClick={() => this.setOpenProfileMenu()}
                className={`header-option-button ${openProfileMenu && 'dropdownOpen'}`}
                style={{ width: isLogged ? ( isHome ? 60 : 36 ) : 120 }}
              >
                {
                  `${initials}`
                }
                {openProfileMenu
                  && <DropDownMenu data={profileDropDown} position={ { right: 0, top: isHome ? 70 : 50 }}/>
                }
              </button>
            ) : (
              <Link to="/signin" className="header-option-button">Log in</Link>
            )
          }
        </div>
      </div>
    );
  }
}
