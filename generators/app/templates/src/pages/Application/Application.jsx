"use strict";

import React, { PropTypes } from "react";

import "reset.css";
import "normalize.css";
import "font-awesome/css/font-awesome.css";
import styleCSS from "./Application.css";


export default class Application extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    style: PropTypes.object.isRequired
  };
  static defaultProps = {
    style: styleCSS
  };
  render() {
    const { children, style } = this.props;
    return (
      <div className={style.root}>
        <div className={style.content}>
          <p className={style.help}>
            Press <em>ctrl+h</em> to show redux debug panel
            and <em>ctrl+q</em> to change it's position.
          </p>
          {children}
        </div>
      </div>
    );
  }
}
