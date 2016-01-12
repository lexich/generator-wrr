"use strict";

import React, { PropTypes } from "react";
import "./<%= props.componentName %>.css";

export default class <%= props.componentName %> extends React.Component {
  static propTypes = {
    children: PropTypes.element
  };
  render() {
    const { children } = this.props;
    return (
      <div className="<%= props.componentName %>">
        { children }
      </div>
    );
  }
}
