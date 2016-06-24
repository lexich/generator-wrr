"use strict";

import React, { PropTypes } from "react";
import { connect } from "react-redux";
import styleCSS from "./IndexPage.css";
import Hello from "./IndexPage.Hello";

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
      </div>
    );
  }
}

export default connect((state)=> ({
  user: state.apiUser.data
}))(Index);
