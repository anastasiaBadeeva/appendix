/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import '../styles/index.scss';
import { getUser } from '../../utils/AuthService';
import ProfileInput from '../ProfileInput/ProfileInput';

export default class ProfilePage extends Component {
  constructor(props) {
		super(props);
	}

  setOpenMenu(type) {
    this.setState({ [type]: !this.state[type] })
  }

  render() {
    const user = getUser();
    const inputData = [
      {
        title: 'Name:',
        value: user.name,
        placeholder: 'your name',
      },
      {
        title: 'Email:',
        value: user.email,
        placeholder: 'name@domain.com',
      },
    ];

    return (
      <div className="profile">
          <div>
              <h2 className="profile-title">Account Information</h2>
          </div>
          <div>
            {inputData.map(data => (
              <ProfileInput
                key={data.title}
                title={data.title}
                value={data.value}
                placeholder={data.placeholder}
              />
            ))}
          </div>
      </div>
    );
  }
}
