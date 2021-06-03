/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

import Dashboards from '../../../assets/MF.svg';
import Reports from '../../../assets/Report.svg';
import Datasets from '../../../assets/Datasets.svg';

const HomePage = () => {
  const homePageList = [
    {
      title: 'Dashboards',
      link: '/dashboards',
      src: Dashboards,
    },
    {
      title: 'Reports',
      link: '/reports',
      src: Reports,
    },
    {
      title: 'Datasets',
      link: '/datasets',
      src: Datasets,
    },
  ];
    
  return (
    <div className="home">
      {homePageList.map(homePageItem => (
        <div
          className="home-item"
          key={homePageItem.title}
        >
          <Link to={homePageItem.link}>
            <img src={homePageItem.src} alt={homePageItem.title} />
            <h2 className="home-item-title">{homePageItem.title}</h2>
          </Link>
        </div>
        )
      )}
    </div>
  );
};

export default HomePage;
