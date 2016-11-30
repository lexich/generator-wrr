"use strict";

/* eslint no-useless-escape: 0 */

import { connect } from "react-redux";
import { browserHistory as history } from "react-router";
import Application from "./Application";

function mapStateToProps(state) {
  return {
    languages: state.i18n.languages
  };
}

function mapDispatchToProps(dispatch, { location }) {
  return {
    changeLanguage: (lang)=> {
      const { pathname, search } = location;
      const path = pathname.replace(/^\/[^\/]+/, `/${lang}`);
      history.push(path + search);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
