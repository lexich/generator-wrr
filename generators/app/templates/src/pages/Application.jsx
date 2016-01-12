"use strict";

import React, { PropTypes } from "react";

import "reset.css";
import "normalize.css";
import "font-awesome/css/font-awesome.css";
import "./Application.css";


export default class Application extends React.Component {
  static propTypes = {
    children: PropTypes.object
  };
  render() {
    const { children } = this.props;
    return (
      <div className="ApplicationPage">
        <div className="ApplicationPage__content">
          { children }
        </div>
      </div>
    );
  }
}
