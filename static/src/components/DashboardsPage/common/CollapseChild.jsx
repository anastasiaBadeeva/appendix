import React from 'react';

import Circle from './Circle';
import ConsumerSpend from '../../../../assets/Spend.svg';
import IncomeAndEmployment from '../../../../assets/IncomeAndEmployment.svg';
import HousingPermits from '../../../../assets/Housing.svg';
import TruckingRoutes from '../../../../assets/Trucking.svg';
import IndustrialPois from '../../../../assets/Trucking.svg';
import JobPostings from '../../../../assets/JobPostings.svg';
import RentalRates from '../../../../assets/Rental-Rate.svg';
import Geosocial from '../../../../assets/GeoSocial.svg';
import Zillow from '../../../../assets/GeoSocial.svg';
import DemographicsAndPopulation from '../../../../assets/GeoSocial.svg';
const icons = {
 TruckingRoutes,
 IndustrialPois,
 ConsumerSpend,
 IncomeAndEmployment,
 RentalRates,
 HousingPermits,
 JobPostings,
 Geosocial,
 Zillow,
 DemographicsAndPopulation,
};

const CollapseChild = ({ arrayForMap }) => {
 if (arrayForMap.length % 2 != 0) {
  arrayForMap.push(null);
 }
 return (
  <div className="appendix-collapse-types-content">
   {arrayForMap.map((item, index) => {
    return item ? (
     <div key={Math.random()} className="appendix-collapse-types-content-item">
      <div className="appendix-collapse-types-content-item-data">
       <div className="appendix-collapse-types-content-item-data-title">
        <p className="appendix-collapse-types-content-item-data-title-head">
         {item.title}
        </p>
        <p className="appendix-collapse-types-content-item-data-title-text">
         {item.text}
        </p>
       </div>
       <div className="appendix-collapse-types-content-item-data-methodology">
        <p className="appendix-collapse-types-content-item-data-methodology-title">
         Methodology:
        </p>
        <p className="appendix-collapse-types-content-item-data-methodology-text">
         {item.methodology}
        </p>
       </div>
       <div className="appendix-collapse-types-content-item-data-info">
        <div
         className={
          item.categoryDetails !== undefined
           ? 'appendix-collapse-types-content-item-data-info-category'
           : 'appendix-collapse-types-content-item-data-info-none'
         }
        >
         <p>Category Details:</p>
         {item.categoryDetails !== undefined &&
          item.categoryDetails.map((category) => {
           return (
            <p
             className="appendix-collapse-types-content-item-data-info-categoryText"
             key={Math.random()}
            >
             {category}
            </p>
           );
          })}
        </div>
        <div
         className={
          item.categoryDetails !== undefined
           ? 'appendix-collapse-types-content-item-data-info-granularityAndData'
           : 'appendix-collapse-types-content-item-data-info'
         }
        >
         <div>
          <p>Lowest geographic granularity:</p>
          <div className="appendix-collapse-types-content-item-data-info-circles">
           {item.granularity.map((circle) => {
            return (
             <Circle
              key={Math.random()}
              classNameDiv="appendix-data-source-granularity-circles"
              className={`appendix-data-source-granularity-circles-${circle}`}
              displayText="none"
             />
            );
           })}
          </div>
         </div>
         <div>
          <p>Data source(s):</p>
          {item.dataSource.map((src) => {
           return <img key={Math.random()} src={icons[src]} alt={icons[src]} />;
          })}
         </div>
        </div>
       </div>
      </div>
      <div
       className={
        (index + 1) % 2 !== 0
         ? 'appendix-collapse-types-content-item-line'
         : 'appendix-collapse-types-content-item-noLine'
       }
      ></div>
     </div>
    ) : (
     <div
      key={Math.random()}
      className="appendix-collapse-types-content-item"
     />
    );
   })}
  </div>
 );
};
export default CollapseChild;
