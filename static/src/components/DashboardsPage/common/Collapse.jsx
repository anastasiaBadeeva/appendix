import React, { Component } from 'react';

export default class Collapse extends Component {
 constructor(props) {
  super(props);
  this.state = {
   isOpenCollapse:
    props.tabName !== undefined &&
    props.header.toLowerCase() === props.tabName.toLowerCase(),
  };
  this.changeCollapseState = this.changeCollapseState.bind(this);
 }
 changeCollapseState() {
  this.setState({ isOpenCollapse: !this.state.isOpenCollapse });
 }
 render() {
  const { isOpenCollapse } = this.state;
  const { header } = this.props;
  return (
   <div>
    <div className="appendix-collapse-types" onClick={this.changeCollapseState}>
     <h2>{header}</h2>
     <div
      className={
       isOpenCollapse
        ? 'appendix-collapse-types-arrowBottom'
        : 'appendix-collapse-types-arrowLeft'
      }
     ></div>
    </div>
    {isOpenCollapse ? this.props.children : null}
   </div>
  );
 }
}
