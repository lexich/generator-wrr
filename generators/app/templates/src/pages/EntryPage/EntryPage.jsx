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
    body: PropTypes.string.isRequired
  };
  static defaultProps = {
    style: styleCSS
  };
  render() {
    const { style, title, body } = this.props;
    const className = style.root +
      (this.props.className ? ` ${this.props.className}` : "");
    return (
      <div className={className}>
        <Helmet
          title={`Entry: ${title}`}
          meta={[
            { property: "og:title", content: `Entry: ${title}` }
          ]}
        />
        <Link className={style.home} to={"/"}>Home</Link>
        <h1>{ title }</h1>
        <p>
          { body }
        </p>
      </div>
    );
  }
}
