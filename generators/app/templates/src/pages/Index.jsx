"use strict";

import React, { PropTypes } from "react";
import { connect } from "react-redux";
import "./Index.css";

class Index extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string
    }),
    dispatch: PropTypes.func.isRequired
  }
  render() {
    const { user: { name } } = this.props;
    return (
      <div className="IndexPage">
        <h1>Index Page</h1>
        <p>Hello <span className="IndexPage__username">{ name }</span></p>
      </div>
    );
  }
}

export default connect((state)=> ({
  user: state.user.data
}))(Index);
