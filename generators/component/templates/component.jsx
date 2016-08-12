"use strict";

import React, { PropTypes } from "react";
import styleCSS from "./<%= props.componentName %>.css";

export default class <%= props.componentName %> extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.element,
    style: PropTypes.object.isRequired
  };
  static defaultProps = {
    style: styleCSS
  };
  <% if (props.i18n) { %>static contextTypes = {
    __: PropTypes.func,
    language: PropTypes.string
  };<% } %>
  render() {
    const { children, style } = this.props;
    <% if (props.i18n) { %>const { __, language } = this.context;<% } %>
    const className = style.root +
      (this.props.className ? ` ${this.props.className}` : "");
    return (
      <div className={className}>
        {children}
      </div>
    );
  }
}
