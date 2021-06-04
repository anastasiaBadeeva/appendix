import React from 'react';

const Circle = ({ classNameDiv, className, displayText, text }) => {
 return (
  <div className={classNameDiv}>
   <div className={className}></div>
   <p style={{ display: displayText }}>{text}</p>
  </div>
 );
};
export default Circle;
