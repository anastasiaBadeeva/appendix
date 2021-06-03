/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import tableau from 'tableau-api';

import DashboardsNav from '../DashboardsNav/DashboardsNav';
// import DashboardsPageHeader from '../DashboardsPageHeader/DashboardsPageHeader';

import '../styles/index.scss';
import * as tableuPage from './tableuPage.js';

import { isUserInGroup, hasUserSomeGroup } from '../../utils/AuthService';
import NoPermissons from '../NoPermissons/NoPermissons';

export default class DashboardsPage extends Component {
  constructor(props) {
		super(props);

    this.state = {
      openNavbar: true,
      loadData: {
        label: 'propertyInsights',
        contentTitle: 'Overview',
      },
    }

    this.changeLoadData = this.changeLoadData.bind(this);
	}

  componentDidMount() {
    const { loadData } = this.state;

    if (isUserInGroup(loadData.label, 'dashboardsGroups')) {
      tableuPage[loadData.label]();
    }
  }

  changeLoadData(data) {
    const { loadData } = this.state;
    const newLoadData = {
      label: data.label || loadData.label,
      contentTitle: data.contentTitle || loadData.contentTitle,
    };

    if (loadData.label !== data.label && isUserInGroup(data.label, 'dashboardsGroups')) {
      tableuPage[data.label]();
    } else if (loadData.contentTitle !== data.contentTitle) {
      tableuPage.switchTab(data.contentTitle);
    }

    this.setState({ loadData: newLoadData });
  }
  changeOpenNavbar() {
    this.setState(prevState => ({ openNavbar: !prevState.openNavbar }));
  }

  render() {
    const { openNavbar, loadData } = this.state;

    return (
      <div className={`${!hasUserSomeGroup('dashboardsGroups') && 'dashboards-wrapper'}`}>
        {hasUserSomeGroup('dashboardsGroups') ? (
          <div className="dashboards-wrapper">
            <DashboardsNav
              loadData={loadData}
              changeLoadData={this.changeLoadData}
              openNavbar={openNavbar}
            />
            <div className="dashboards-discovery" onClick={() => this.changeOpenNavbar()}>
              Discovery Dashboards {
                openNavbar
                  ? <span className="dashboards-discovery-arrow">&#9668;</span>
                  : <span className="dashboards-discovery-arrow">&#9658;</span>
                }
            </div>
            <div className="dashboard-content">
              <div className="dashboards" id="vizContainer"></div>
            </div>
          </div>
          ) : <NoPermissons />
        }
      </div>
    );
  }
}
