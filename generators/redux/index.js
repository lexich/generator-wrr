"use strict";

/* eslint prefer-template: 0 prefer-arrow-callback: 0 */
const yeoman = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const _ = require("lodash");
const libpath = require("path");

module.exports = yeoman.Base.extend({
  prompting(reduxName) {
    const done = this.async();

    if (!reduxName) {
      const error = yosay(
        `Input component name: ${chalk.yellow("yo wrr:redux")} ${chalk.red("reduxName")}`
      );
      return done(error);
    }

    // Have Yeoman greet the user.
    this.log(yosay(
      "Welcome to the incredible " + chalk.red("generator-wrr:redux") + " generator!"
    ));

    const prompts =[];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.reduxName = _.snakeCase(reduxName);
      done();
    }.bind(this));
  },

  writing() {
    const reduxName = this.props.reduxName;
    this.copy(
      this.templatePath("action.js"),
      this.destinationPath(
        libpath.join("src", "actions", reduxName + ".js")));
    this.copy(
      this.templatePath("reducer.js"),
      this.destinationPath(
        libpath.join("src", "reducers", reduxName + ".js")));
  }
});
