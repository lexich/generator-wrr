import { connect } from "react-redux";
import Application from "./Application";
import { actionUpdate } from "react-i18n-universal/lib/redux";

function mapStateToProps(state) {
  return {
    languages: state.i18n.languages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeLanguage: (lang)=> dispatch(actionUpdate(lang))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
