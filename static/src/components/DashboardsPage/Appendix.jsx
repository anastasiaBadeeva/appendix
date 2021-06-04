import React, { Component } from 'react';
import '../styles/index.scss';
import ConsumerSpend from '../../../assets/Spend.svg';
import IncomeAndEmployment from '../../../assets/IncomeAndEmployment.svg';
import HousingPermits from '../../../assets/Housing.svg';
import TruckingRoutes from '../../../assets/Trucking.svg';
import IndustrialPois from '../../../assets/Trucking.svg';
import JobPostings from '../../../assets/JobPostings.svg';
import RentalRates from '../../../assets/Rental-Rate.svg';
import Geosocial from '../../../assets/GeoSocial.svg';
import data from './data.json';
import Circle from './common/Circle';
import Collapse from './common/Collapse';
import CollapseChild from './common/CollapseChild';

const icons = {
 TruckingRoutes,
 IndustrialPois,
 ConsumerSpend,
 IncomeAndEmployment,
 RentalRates,
 HousingPermits,
 JobPostings,
 Geosocial,
};
export default class Appendix extends Component {
 render() {
  const {
   match: {
    params: { tabName },
   },
  } = this.props;

  return (
   <div className="appendix">
    <h1>Appendix</h1>
    <div className="appendix-data-source">
     <h2>Data Source</h2>
     <div className="appendix-data-source-dataset">
      {data.dataSource.map((item) => {
       return (
        <div className="appendix-data-source-dataset-items" key={Math.random()}>
         <img src={icons[item.label]} alt={item.title} />
         <div className="appendix-data-source-dataset-items-info">
          <p className="appendix-data-source-dataset-items-info-title">
           {item.title}
          </p>
          <p className="appendix-data-source-dataset-items-info-text">
           {item.text}
          </p>
         </div>
        </div>
       );
      })}
     </div>
     <h2>Granularity</h2>
     <div className="appendix-data-source-granularity">
      <Circle
       classNameDiv="appendix-data-source-granularity-circles"
       className="appendix-data-source-granularity-circles-circleGrapefruitPink"
       displayText="block"
       text="Blockgroup"
      />
      <Circle
       classNameDiv="appendix-data-source-granularity-circles"
       className="appendix-data-source-granularity-circles-circleBlue"
       displayText="block"
       text="Tract"
      />
      <Circle
       classNameDiv="appendix-data-source-granularity-circles"
       className="appendix-data-source-granularity-circles-circleGreen"
       displayText="block"
       text="ZIP Code"
      />
      <Circle
       classNameDiv="appendix-data-source-granularity-circles"
       className="appendix-data-source-granularity-circles-circlePink"
       displayText="block"
       text="County"
      />
      <Circle
       classNameDiv="appendix-data-source-granularity-circles"
       className="appendix-data-source-granularity-circles-circlePurple"
       displayText="block"
       text="MSA"
      />
     </div>
    </div>
    <div className="appendix-collapse">
     <Collapse header="Income" tabName={tabName}>
      <CollapseChild arrayForMap={data.income} />
     </Collapse>
     <Collapse header="Housing" tabName={tabName}>
      <CollapseChild arrayForMap={data.housing} />
     </Collapse>
     <Collapse header="Demographics" tabName={tabName}>
      <CollapseChild arrayForMap={data.demographics} />
     </Collapse>
     <Collapse header="Employment" tabName={tabName}>
      <CollapseChild arrayForMap={data.employment} />
     </Collapse>
     <Collapse header="Gentrification" tabName={tabName}>
      <CollapseChild arrayForMap={data.gentrification} />
     </Collapse>
    </div>
   </div>
  );
 }
}
