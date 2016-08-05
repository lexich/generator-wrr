"use strict";

import React, { PropTypes } from "react";
import Helmet from "react-helmet";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router";
import styleCSS from "./AboutPage.css";
import ENaboutMD from "./about.md";
import RUaboutMD from "./about.ru.md";

export default class AboutPage extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.element,
    style: PropTypes.object.isRequired
  };
  static contextTypes = {
    language: PropTypes.string,
    __: PropTypes.func
  };
  static defaultProps = {
    style: styleCSS
  };
  getMD() {
    const { language } = this.context;
    return language === "ru" ? RUaboutMD : ENaboutMD;
  }
  render() {
    const { children, style } = this.props;
    const { __, language } = this.context;
    const className = style.root +
      (this.props.className ? ` ${this.props.className}` : "");
    return (
      <div className={className}>
        <Helmet
          title={__("About page")}
          meta={[
            { property: "og:title", content: __("About page") }
          ]}
        />
        <Link className={style.link} to={`/${language}`}>
          {__("Main page")}
        </Link>
        <ReactMarkdown className={style.content} source={this.getMD()} />
        {children}
      </div>
    );
  }
}
