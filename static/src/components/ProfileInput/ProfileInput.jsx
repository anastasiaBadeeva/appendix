/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import '../styles/index.scss';
export default class ProfileInput extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const {
      title,
      value,
      placeholder,
    } = this.props;

    return (
      <div className="profile-input">
        <h3 className="input-title">{title}</h3>
        <div className="input-content">
          <div className="input-wrapper">
            <input
              value={value}
              type="text"
              id={`input${title}`}
              placeholder={placeholder}
              readOnly
            />
          </div>
        </div>
      </div>
    );
  }
}
