/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import '../styles/index.scss';

import Austin from './assets/Austin.jpg';
import NonTech from './assets/NonTech.jpg';
import Spending from './assets/Spending.jpg';
import EmploymentData from './assets/EmploymentData.jpg';
import EmploymentTrends from './assets/EmploymentTrends.jpg';

import downloadData from '../../utils/downloadData';
import { isUserInGroup } from '../../utils/AuthService';
import NoPermissons from '../NoPermissons/NoPermissons';

export default class ReportsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonDisabled: false,
    };

    this.disableButtons = this.disableButtons.bind(this);
  }

  disableButtons(buttonState) {
    this.setState({ buttonDisabled: buttonState });
  }

  render() {
    const { buttonDisabled } = this.state;

    const data = [
      {
        label: 'employmentTrends',
        date: 'May 2021',
        title: 'Employment Trends - March 2021',
        subtitle: 'Employment Trends',
        textTitle: 'Employee Count By Industry',
        text: 'U.S. employment continued to improve MoM (+1.0%), but remains down ~6% YoY against the ﬁnal month of pre-Covid comparisons.',
        src: EmploymentTrends,
        url: 's3://mrkrr-reports-prod/Markerr Employment Trends March 2021.pdf',
      },
      {
        label: 'employmentTrends',
        date: 'May 2021',
        title: 'Employment Trends - February 2021',
        subtitle: 'Employment Trends',
        textTitle: 'Employee Count By Industry',
        text: 'Overall employment marginally improved sequentially in February (+0.5%), while remaining down ~7% YoY against one of the final months of true pre-Covid comparison. Health care remains ...',
        src: EmploymentTrends,
        url: 's3://mrkrr-reports-prod/Markerr_Employment Trends_through Feb 2021.pdf',
      },
      {
        label: 'incomeEmploymentData',
        date: 'May 2021',
        title: 'Data Driven Decision Making',
        subtitle: 'Real Estate Research',
        textTitle: 'Indexed Job Growth by MSA',
        text: 'A key benefit of the Markerr Income & Employment data is its granularity. At the zip code level, you can calculate income growth CAGRs over a given. The nominal income figures can also be ...',
        src: EmploymentData,
        url: 's3://mrkrr-reports-prod/Markerr_Guide to Income _ Employment Data.pdf',
      },
      {
        label: 'consumerSpendingImpact',
        date: 'Feburary 2021',
        title: 'Shifts in Consumer Spending Impact Warehousing Needs',
        subtitle: 'Last Mile Delivery',
        textTitle:
          'Last Mlle Distribution Networks Need To Expand To Meet Demand For Consumer Staples From Suburbs And Exurbs',
        text: 'Consumers across all income spectrums of the US economy are spending more money online, with eCommerce market share ...',
        src: Spending,
        url: 's3://mrkrr-reports-prod/Markerr_Last Mile Case Study_NY & Nashville.pdf',
      },
      {
        label: 'lastMileInvestors',
        date: 'Feburary 2021',
        title:
          'Supply & Demand Imbalance Creates Multiple Opportunities for Last Mile Investors in Austin',
        subtitle: 'Last Mile Delivery',
        textTitle: 'Austin Ecommerce Order Growth By Zip Code',
        text: 'Consumers across all income spectrums of the US economy are spending more money online, with eCommerce market share growing at double digit rates in 2020. Demand for online goods ...',
        src: Austin,
        url: 's3://mrkrr-reports-prod/Markerr_Last Mile Report_Austin_Feb2021.pdf',
      },
      {
        label: 'rentGrowth',
        date: 'September 2020',
        title: 'Non-Tech High Earners Drive Rent Growth',
        subtitle: 'Residentilal Macro',
        textTitle: 'Six Figure Earners - More Significant Than Tech Workers',
        text: 'To compile this report, Markerr uses proprietary data and computer learning to forecast 3-year forward single family and multi-family rental rates at two levels: 1) the Metropolitan ...',
        src: NonTech,
        url: 's3://mrkrr-reports-prod/Makerr_Residential Macro Report.pdf',
      },
    ];

    const reportsList = [];
    data.forEach((item) => {
      if (isUserInGroup(item.label, 'reportsGroups')) {
        reportsList.push(
          <div className="reports-item" key={item.title}>
            <div className="reports-wrapper">
              <p className="reports-item-date">{item.date}</p>
              <h2 className="reports-item-title">{item.title}</h2>
              <p className="reports-item-subtitle">{item.subtitle}</p>
            </div>
            <img src={item.src} alt={item.title} />
            <div className="reports-wrapper">
              <p className="reports-item-text-title">{item.textTitle}</p>
              <p className="reports-item-text">{item.text}</p>
            </div>
            <div className="reports-item-link-wrapper">
              <button
                className={`reports-item-link ${
                  buttonDisabled && 'reports-item-link-disabled'
                }`}
                onClick={() =>
                  buttonDisabled ? () => {} : downloadData(item.url, this.disableButtons)
                }
              >
                Download &#10142;
              </button>
            </div>
          </div>
        );
      }
    });
    const hasReports = reportsList.length;

    return (
      <div className={`${hasReports && 'reports'}`}>
        {hasReports ? reportsList : <NoPermissons />}
      </div>
    );
  }
}
