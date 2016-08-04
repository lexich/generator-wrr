"use strict";

import React, { PropTypes } from "react";

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
          {__.html("Press <em>ctrl+h</em> to show redux debug panel and <em>ctrl+q</em> to change it's position.")}
        </p>
      );
    }
  }
  render() {
    const { children, style } = this.props;
    return (
      <div className={style.root}>
        <div className={style.content}>
          { this.renderHelp() }
          { this.renderLangs() }
          {children}
        </div>
      </div>
    );
  }
}
