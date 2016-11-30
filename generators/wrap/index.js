"use strict";

/* eslint prefer-template: 0 prefer-arrow-callback: 0 */
const yeoman = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const _ = require("lodash");
const libpath = require("path");
const fs = require("fs");

function isDirectory(dir, file) {
  const fullpath = libpath.join(dir, file);
  const stat = fs.statSync(fullpath);
  return stat.isDirectory();
}

module.exports = yeoman.Base.extend({
  prompting() {
    const done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      "Welcome to the incredible " + chalk.red("generator-wrr") + " generator!"
    ));

    const pathComponent = this.destinationPath(
      libpath.join("src", "components"));
    const components = fs.readdirSync(pathComponent).filter(
      (name)=> isDirectory(pathComponent, name));

    const pathPages = this.destinationPath(
      libpath.join("src", "pages"));
    const pages = fs.readdirSync(pathPages).filter(
      (name)=> isDirectory(pathPages, name));

    if (!components.length) {
      const error = yosay("There aren't any available component for overwrite");
      return done(error);
    }

    if (!pages.length) {
      const error = yosay("There aren't any available pages");
      return done(error);
    }

    const prompts =[{
      type: "list",
      name: "componentName",
      message: "Select component for overwrite",
      choices: components.map((value)=> ({ name: value, value })),
      default: components[0]
    }, {
      type: "list",
      name: "pageName",
      message: "Select page where component will be moved",
      choices: pages.map((value)=> ({ name: value, value })),
      default: pages[0]
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.finalName =
        _.capitalize(
          _.camelCase(this.props.pageName)) + "." +
        _.capitalize(
          _.camelCase(this.props.componentName));
      done();
    }.bind(this));
  },

  writing() {
    const finalName = this.props.finalName;
    const dir = libpath.join("src", "pages", this.props.pageName);
    this.copy(
      this.templatePath("style.css"),
      this.destinationPath(
        libpath.join(dir, `${finalName}.css`))
    );
    this.copy(
      this.templatePath("component.jsx"),
      this.destinationPath(
        libpath.join(dir, `${finalName}.jsx`))
    );
  }
});
