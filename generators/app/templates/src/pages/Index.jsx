"use strict";

import React, { PropTypes } from "react";
import { connect } from "react-redux";
import styleCSS from "./Index.css";

import Hello from "components/Hello";

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
        <h1>Index Page</h1>
        <p>
          <Hello>Hello</Hello>
          <span className={style.username}>{name}</span>
        </p>
      </div>
    );
  }
}

export default connect((state)=> ({
  user: state.user.data
}))(Index);
