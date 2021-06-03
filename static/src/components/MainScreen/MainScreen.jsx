/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import '../styles/index.scss';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import EmptyPage from '../EmptyPage/EmptyPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import ReportsPage from '../ReportsPage/ReportsPage';
import DatasetsPage from '../DatasetsPage/DatasetsPage';
import DashboardsPage from '../DashboardsPage/DashboardsPage';

const pages = {
  profile: <ProfilePage />,
  reports: <ReportsPage />,
  datasets: <DatasetsPage />,
  dashboards: <DashboardsPage />,
  home: <HomePage />,
}

export default class MainScreen extends Component {
  constructor(props) {
		super(props);

    this.state = {
      openDashboardsMenu: false,
      openProfileMenu: false,
    }
	}

  setOpenMenu(type) {
    this.setState({ [type]: !this.state[type] })
  }

  render() {
    const {
      type,
      isLogged,
    } = this.props

    const isHomeHeader = type === ('home' || 'empty');
    return (
      <div className={`main-screen ${isHomeHeader && 'home-screen'}`}>
        <Header isLogged={isLogged} isHome={isHomeHeader}/>
        {(isLogged && type !== 'empty')
          ? pages[type]
          : <EmptyPage text={type === 'empty' ? 'Page not found' : 'Not logged in'}/>
        }
      </div>
    );
  }
}
