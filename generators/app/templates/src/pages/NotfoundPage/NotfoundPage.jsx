"use strict";

import React, { PropTypes } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router";

import styleCSS from "./NotfoundPage.css";

export default class NotfoundPage extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.element,
    style: PropTypes.object.isRequired
  };
  static defaultProps = {
    style: styleCSS
  };
  static contextTypes = {
    __: PropTypes.func,
    language: PropTypes.string
  };
  render() {
    const { children, style } = this.props;
    const { __, language } = this.context;
    const className = style.root +
      (this.props.className ? ` ${this.props.className}` : "");
    return (
      <div className={className}>
        <Helmet title={__("Page not found")} />
        <div className={style.content}>
          <h1 className={style.title}>{__("Page not found")}</h1>
          <Link to={`/${language}`}>
            {__("Go to main page")}
          </Link>
        </div>
        {children}
      </div>
    );
  }
}
