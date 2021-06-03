/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import { subMenu } from './subMenu.json';
import { isUserInGroup } from '../../utils/AuthService';

import '../styles/index.scss';

export default class DashboardsNav extends Component {
  constructor(props) {
		super(props);
	}

  subHeaderMenuHandler(label, contentTitle) {
    const { changeLoadData } = this.props;

    const loadData = {};
    if (label) {
      loadData.label = label;
    }
    if (contentTitle) {
      loadData.contentTitle = contentTitle;
    }
    changeLoadData(loadData);
  }

  render() {
    const dashboards = [
      {
        status: 'pilot',
        label: 'propertyInsights',
        title: 'Property Insights',
        subMenu: subMenu.propertyInsights,
      },
      {
        status: 'prod',
        label: 'marketExploration',
        title: 'Market Exploration',
        subMenu: subMenu.marketExploration,
      },
      {
        status: 'prod',
        label: 'crcForecast',
        title: 'CRC Rent Forecast',
        subMenu: subMenu.crcForecast,
      },
      {
        status: 'prod',
        label: 'lastMile',
        title: 'Last Mile',
        subMenu: subMenu.lastMile,
      },
    ];

    const {
      loadData,
      openNavbar
    } = this.props

    return (
      <div className={`dashboards-navbar ${openNavbar && 'show-navbar'}`}>
          {dashboards.map(dashboard => isUserInGroup(dashboard.label, 'dashboardsGroups') ? (
            <div className="dashboards-navbar-item" key={dashboard.title}>
              <p
                className={
                  `dashboards-navbar-item-title ${loadData.label === dashboard.label && 'dashboards-navbar-item-selected '}`
                }
                onClick={
                  () => this.subHeaderMenuHandler(dashboard.label, dashboard.subMenu[0].title)
                }
              >
                {dashboard.title}
                {dashboard.status === 'pilot' && <p className="dashboards-navbar-item-status">{dashboard.status.toUpperCase()}</p>}
              </p>
              <div className={`dashboards-subnavbar ${loadData.label === dashboard.label && 'show-subnavbar'}`}>
                {dashboard.subMenu.map(subNavbar => (
                  <p
                    className={
                      `dashboards-subnavbar-item-title ${ loadData.contentTitle === subNavbar.title && 'dashboards-subnavbar-item-selected '}`
                    }
                    onClick={() => this.subHeaderMenuHandler('', subNavbar.title)}
                    key={subNavbar.title}
                  >
                    {subNavbar.title}
                  </p>
                ))}
              </div>
            </div>
            ) : null
          )}
      </div>
    );
  }
}
