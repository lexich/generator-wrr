"use strict";

import React, { PropTypes } from "react";
import styleCSS from "./<%= props.componentName %>.css";
import Helmet from "react-helmet";

export default class <%= props.componentName %> extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.element,
    style: PropTypes.object.isRequired
  };
  static defaultProps = {
    style: styleCSS
  };
  render() {
    const { children, style } = this.props;
    const className = style.root +
      (this.props.className ? ` ${this.props.className}` : "");
    return (
      <div className={className}>
        <Helmet title={"<%= props.componentName %>"} />
        {children}
      </div>
    );
  }
}
