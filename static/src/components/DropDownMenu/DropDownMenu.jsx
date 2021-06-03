/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../utils/AuthService';

import '../styles/index.scss';

const DropDownMenu = ({ data, position }) => {
  return (
    <div>
      <div className="dropdown-list" style={position}>
        {data.map((item) => (
          <div key={item.title}>
            {item.link === '/logout' ? (
                <a onClick={logout}>
                  <div className="dropdown-item">
                    {item.title}      
                  </div>
                </a> 
              ) : (
                <Link to={item.link}>
                  <div className="dropdown-item">
                    {item.title}      
                  </div>
                </Link> 
            )}
          </div>
          )
        )}
      </div>
      <div className="dropdown-background" >
      </div>
    </div>
  );
};

export default DropDownMenu;
