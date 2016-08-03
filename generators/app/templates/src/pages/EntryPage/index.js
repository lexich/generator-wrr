"use strict";

import { connect } from "react-redux";

import EntryPage from "./EntryPage";

function mapStateToProps(state) {
  return {
    title: state.apiEntry.data.title,
    body: state.apiEntry.data.body
  };
}

function mapDispatchToProps(/* dispatch */) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryPage);
