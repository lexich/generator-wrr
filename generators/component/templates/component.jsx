"use strict";

import React, { PropTypes } from "react";
import styleCSS from "./<%= props.componentName %>.css";

export default class <%= props.componentName %> extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    style: PropTypes.object.isRequired
  };
  static defaultProps = {
    style: styleCSS
  };
  render() {
    const { children, style } = this.props;
    return (
      <div className={style.root}>
        {children}
      </div>
    );
  }
}
