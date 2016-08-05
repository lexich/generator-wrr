import { connect } from "react-redux";
import Application from "./Application";
import { browserHistory as history } from "react-router";

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
