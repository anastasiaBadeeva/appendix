/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import '../styles/index.scss';

export default class DashboardsPageHeader extends Component {
  constructor(props) {
		super(props);
	}

  render() {
    const {
      dashboardTitle,
    } = this.props

    return (
      <div className="dashboard-header">
        <h3 className="dashboard-header-title">{dashboardTitle}</h3>
        {dashboardTitle === 'Overview' &&
          <div className="dashboard-header-searchbar-wrapper">
            <input
              className="dashboard-header-searchbar"
              placeholder="Please enter the address or zip code of the property you are researching"
            />
            <button className="dashboard-header-searchbar-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="none" >
                <rect width="100%" height="100%" x="0" y="0" fill="none" stroke="none"/>
                <path fill="#274456" stroke="#274456" d="M0.4206898782300459,0.5 H41.5 v40 H0.4206898782300459 V0.5 z" />
                <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.896 27c4.993 0 9.04-4.03 9.04-9s-4.047-9-9.04-9c-4.993 0-9.04 4.03-9.04 9s4.047 9 9.04 9zM32.96 32l-7.675-7.64" />
              </svg>
            </button>
          </div>
        }
      </div>
    );
  }
}
