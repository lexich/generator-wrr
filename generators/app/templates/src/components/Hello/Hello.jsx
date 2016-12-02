"use strict";

import React, { PropTypes } from "react";
import styleCSS from "./Hello.css";
import imageSeaLion from "./SeaLion.svg";


export default class Hello extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  };
  static defaultProps = {
    style: styleCSS,
    src: imageSeaLion,
    alt: "image"
  };

  componentDidMount() {
    const { img } = this.refs;
    if (img) {
      img.setAttribute('alt', this.props.alt);
    }
  }

  render() {
    const { style, src } = this.props;

    const className = style.root +
      (this.props.className ? ` ${this.props.className}` : "");

    return (
      <span className={className}>
        <img className={style.image} src={src} role="presentation" ref="img" />
      </span>
    );
  }
}
