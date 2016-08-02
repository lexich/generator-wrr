"use strict";

import React, { PropTypes } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router";
import styleCSS from "./AboutPage.css";
import aboutMD from "./about.md";

export default class AboutPage extends React.Component {
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
        <Link className={style.link} to={""}>Go to main page</Link>
        <ReactMarkdown className={style.content} source={aboutMD} />
        {children}
      </div>
    );
  }
}
