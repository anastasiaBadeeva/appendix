/* eslint-disable react/prop-types */
import React from 'react';
import downloadData from '../../utils/downloadData';

export const Button = (props) => {
  const { buttonDisabled, dataUrl, changeState, scrInfo, altInfo } = props;
  return (
    <button
      className={`datasets-item-buttons-type ${
        buttonDisabled && 'datasets-item-buttons-type-disabled'
      }`}
      onClick={() => {
        buttonDisabled ? () => {} : downloadData(dataUrl, changeState);
      }}
    >
      <div className="datasets-item-buttons-type-img">
        <img src={scrInfo} alt={altInfo} />
      </div>
    </button>
  );
};
