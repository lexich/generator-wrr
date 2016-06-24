"use strict";

import React, { PropTypes } from "react";
import styleCSS from "./Hello.css";

export default class Hello extends React.Component {
  static propTypes = {
    style: PropTypes.object.isRequired
  };
  static defaultProps = {
    style: styleCSS
  };
  render() {
    const { children, style } = this.props;
    return (
      <span className={style.root}>
        Hello
      </span>
    );
  }
}
