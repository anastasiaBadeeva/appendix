/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import '../styles/index.scss';
import { Button } from './Button';
import { data } from './data.json';
import { isUserInGroup } from '../../utils/AuthService';
import NoPermissons from '../NoPermissons/NoPermissons';

import ConsumerSpend from '../../../assets/Spend.svg';
import IncomeAndEmployment from '../../../assets/IncomeAndEmployment.svg';
import HousingPermits from '../../../assets/Housing.svg';
import TruckingRoutes from '../../../assets/Trucking.svg';
import IndustrialPois from '../../../assets/Trucking.svg';
import JobPostings from '../../../assets/JobPostings.svg';
import RentalRates from '../../../assets/Rental-Rate.svg';
import Geosocial from '../../../assets/GeoSocial.svg';
import DataDictionary from '../../../assets/Data-Dictionary.svg';
import ProductSheet from '../../../assets/Product-Sheet.svg';
import RowSample from '../../../assets/100-Row-Sample.svg';

const icons = {
  IncomeAndEmployment,
  JobPostings,
  HousingPermits,
  ConsumerSpend,
  RentalRates,
  TruckingRoutes,
  IndustrialPois,
  Geosocial,
};

export default class DatasetsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: false,
    };
    this.changeButtonDisabled = this.changeButtonDisabled.bind(this);
  }
  changeButtonDisabled(flag) {
    this.setState({ buttonDisabled: flag });
  }

  render() {
    const datasetsList = [];
    const { buttonDisabled } = this.state;
    data.forEach((item, index) => {
      if (isUserInGroup(item.label, 'datasetsGroups')) {
        datasetsList.push(
          <div className="datasets-item" key={item.title}>
            <div className="datasets-item-header">
              <img src={icons[item.label]} alt={item.title} />
              <h2 className="datasets-item-title">{item.title}</h2>
            </div>
            <div className="datasets-item-content">
              <p className="datasets-item-text">{item.text}</p>
              <div className="datasets-item-types">
                {item.types.map((type) => (
                  <div className="datasets-item-type" key={type.title + index}>
                    <p className="datasets-item-type-title">{type.title}</p>
                    <p className="datasets-item-type-text">{type.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="datasets-item-buttons">
              <Button
                buttonDisabled={buttonDisabled}
                dataUrl={item.productSheetUrl}
                changeState={this.changeButtonDisabled}
                scrInfo={ProductSheet}
                altInfo={'Product sheet'}
              />
              <div className="datasets-item-buttons-line"></div>
              <Button
                buttonDisabled={buttonDisabled}
                dataUrl={item.dataDictionaryUrl}
                changeState={this.changeButtonDisabled}
                scrInfo={DataDictionary}
                altInfo={'Data dictionary'}
              />
              <div className="datasets-item-buttons-line"></div>
              <Button
                buttonDisabled={buttonDisabled}
                dataUrl={item.rowSampleUrl}
                changeState={this.changeButtonDisabled}
                scrInfo={RowSample}
                altInfo={'Row sample'}
              />
            </div>
          </div>
        );
      }
    });
    const hasDatasets = datasetsList.length;

    return (
      <div className={`${hasDatasets && 'datasets'}`}>
        {hasDatasets ? datasetsList : <NoPermissons />}
      </div>
    );
  }
}
