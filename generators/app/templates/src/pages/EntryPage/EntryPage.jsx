"use strict";

import React, { PropTypes } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router";
import styleCSS from "./EntryPage.css";

export default class EntryPage extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    children: PropTypes.element
  };
  static defaultProps = {
    style: styleCSS
  };
  static contextTypes = {
    __: PropTypes.func,
    language: PropTypes.string
  };
  render() {
    const { style, title, body, children } = this.props;
    const { __, language } = this.context;
    const className = style.root +
      (this.props.className ? ` ${this.props.className}` : "");
    return (
      <div className={className}>
        <Helmet
          title={__("Entry: %1", title)}
          meta={[
            { property: "og:title", content: __("Entry: %1", title) }
          ]}
        />
        <Link className={style.home} to={`/${language}`}>
          {__("Main page")}
        </Link>
        <h1>{ title }</h1>
        <p>
          { body }
        </p>
        { children }
      </div>
    );
  }
}
