"use strict";

import React, { PropTypes } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router";
import { connect } from "react-redux";
import styleCSS from "./IndexPage.css";
import Hello from "./IndexPage.Hello";
import readMe from "../../../README.md";

class Index extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string
    }),
    style: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };
  static defaultProps = {
    style: styleCSS
  };
  render() {
    const { user: { name }, style } = this.props;
    return (
      <div className={style.root}>
        <h1 className={style.title}>
          Welcome to <b>W</b>ebpack<b>R</b>eact<b>R</b>edux generator!
        </h1>
        <div className={style.throne}>
          <Hello className={style.userpic}/>
        </div>
        <p className={style.description}>
          Hello <span className={style.username}>{name}!</span>
        </p>
        <Link className={style.aboutpage} to={"about"}>Go to about page</Link>
        <ReactMarkdown className={style.content} source={readMe} />
      </div>
    );
  }
}

export default connect((state)=> ({
  user: state.apiUser.data
}))(Index);
