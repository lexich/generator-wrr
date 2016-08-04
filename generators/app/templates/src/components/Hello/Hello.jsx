"use strict";

import React, { PropTypes } from "react";
import styleCSS from "./Hello.css";
import imageSeaLion from "./SeaLion.svg";


export default class Hello extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object.isRequired
  };
  static defaultProps = {
    style: styleCSS
  };
  render() {
    const { style } = this.props;

    const className = style.root +
      (this.props.className ? ` ${this.props.className}` : "");

    return (
      <span className={className}>
        <img className={style.image} src={imageSeaLion} role="presentation" />
      </span>
    );
  }
}
