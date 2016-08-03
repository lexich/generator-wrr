"use strict";

import { increment, decrement } from "actions/index_page";
import { connect } from "react-redux";
import IndexPage from "./IndexPage";

function mapStateToProps(state) {
  return {
    user: state.apiUser.data,
    score: state.index_page.score,
    links: state.apiEntries.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increment: ()=> dispatch(increment()),
    decrement: ()=> dispatch(decrement())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
