"use strict";

import React, { PropTypes } from "react";
import Helmet from "react-helmet";

import "reset.css";
import "normalize.css";
import "font-awesome/css/font-awesome.css";
import styleCSS from "./Application.css";

export default class Application extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    style: PropTypes.object.isRequired,
    changeLanguage: PropTypes.func.isRequired,
    languages: PropTypes.arrayOf(PropTypes.string).isRequired
  };
  static defaultProps = {
    style: styleCSS
  };
  static contextTypes = {
    language: PropTypes.string,
    __: PropTypes.func
  };
  onChangeLanguage = (e)=>
    this.props.changeLanguage(e.target.value)

  renderLangs() {
    const { languages, style } = this.props;
    const { language } = this.context;
    const Items = languages.map((lang)=> (
      <option key={lang} value={lang}>{lang}</option>
    ));
    return (
      <select
        className={style.language}
        value={language}
        onChange={this.onChangeLanguage}
      >
        { Items }
      </select>
    );
  }
  renderHelp() {
    /* eslint max-len: 0 */
    if (process.env.NODE_ENV === "develop") {
      const { style } = this.props;
      const { __ } = this.context;
      return (
        <p className={style.help}>
          {
            !window.devToolsExtension ?
            __.html("Press <em>ctrl+h</em> to show redux debug panel and <em>ctrl+q</em> to change it's position or install") :
            __("You can debug redux app with")
          }
          &nbsp;<a href="http://zalmoxisus.github.io/redux-devtools-extension/" target="_blank" rel="noopener noreferrer">redux-devtools-extension</a>
        </p>
      );
    }
  }
  render() {
    const { children, style } = this.props;
    return (
      <div className={style.root}>
        <Helmet
          meta={[{
            "http-equiv": "content-type",
            content: "text/html; charset=utf-8"
          }]}
        />
        <div className={style.content}>
          { this.renderHelp() }
          { this.renderLangs() }
          {children}
        </div>
      </div>
    );
  }
}
