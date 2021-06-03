/* eslint-disable react/prop-types */
import React from 'react';

const EmptyPage = ({ text }) => {
  return (
    <div>
      <div
        style={{
          fontFamily: '"Work Sans", sans-serif',
          display: 'flex',
          justifyContent: 'center',
          marginTop: 220,
          fontSize: 30,
          textAlign: 'center',
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default EmptyPage;
