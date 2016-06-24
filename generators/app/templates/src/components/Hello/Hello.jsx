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
    const { className, children, style } = this.props;

    const classRoot = style.root +
      (className ? ` ${className}` : "");
    return (
      <span className={classRoot}>
        <img className={style.image} src={imageSeaLion} />
      </span>
    );
  }
}
