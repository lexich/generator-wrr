"use strict";

import React, { PropTypes } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router";
import styleCSS from "./IndexPage.css";
import Hello from "./IndexPage.Hello";
import readMe from "../../../README.md";

export default class IndexPage extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string
    }),
    score: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired
  };
  static defaultProps = {
    style: styleCSS
  };
  render() {
    const { user: { name }, score, style, increment, decrement } = this.props;
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
        <div className={style.score}>
          Score: { score }&nbsp;
          <button onClick={increment}>+</button>
          <button onClick={decrement}>-</button>
        </div>
        <br/>
        <Link className={style.aboutpage} to={"about"}>Go to about page</Link>
        <ReactMarkdown className={style.content} source={readMe} />
      </div>
    );
  }
}

