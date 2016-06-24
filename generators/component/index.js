"use strict";
const yeoman = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const _ = require("lodash");
const libpath = require("path");

module.exports = yeoman.Base.extend({
  prompting(componentName) {
    const done = this.async();

    if (!componentName) {
      const error = yosay(
        `Input component name: ${chalk.yellow("yo wrr:component")} ${chalk.red("componentName")}`
      );
      // this.log(error);
      return done(error);
    }

    // Have Yeoman greet the user.
    this.log(yosay(
      "Welcome to the incredible " + chalk.red("generator-wrr") + " generator!"
    ));
    const isComponent = this.options.component;
    const isPage = this.options.page;

    const prompts = (isComponent || isPage) ? [] : [{
      type: "list",
      name: "typeComponent",
      message: "Select type of component",
      choices: [
        { name: "component", value: "components" },
        { name: "page", value: "pages" },
      ],
      default: "components"
    }];
    const _typeComponent = isComponent ? "components" :
      isPage ? "pages" : "";

    this.prompt(prompts, function (props) {
      this.props = props;
      const typeComponent = _typeComponent || props.typeComponent;
      this.props.typeComponent = typeComponent;
      this.props.componentNameBase = _.capitalize(
        _.camelCase(componentName)
      );

      this.props.componentName = this.props.componentNameBase +
        (typeComponent === "pages" ? "Page" : "");
      done();
    }.bind(this));
  },

  writing() {
    const componentName = this.props.componentName;
    const typeComponent = this.props.typeComponent;
    const dir = libpath.join("src", typeComponent, componentName);

    this.copy(
      this.templatePath("style.css"),
      this.destinationPath(libpath.join(dir, componentName + ".css"))
    );

    this.copy(
      this.templatePath("component.jsx"),
      this.destinationPath(libpath.join(dir, componentName + ".jsx"))
    );

    this.copy(
      this.templatePath("root.ejs"),
      this.destinationPath(libpath.join(dir, "index.js"))
    );
  }
});
