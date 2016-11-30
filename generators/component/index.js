"use strict";

/* eslint prefer-template: 0 prefer-arrow-callback: 0 */
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
    const typeComponentBase = isComponent ? "components" :
      isPage ? "pages" : "";

    this.prompt(prompts, function (props) {
      this.props = props;
      const typeComponent = typeComponentBase || props.typeComponent;
      this.props.typeComponent = typeComponent;
      this.props.componentNameBase = _.camelCase(componentName)
        .replace(/^.{1}/, (ch)=> ch.toUpperCase());

      this.props.componentName = this.props.componentNameBase +
        (typeComponent === "pages" ? "Page" : "");
      this.props.i18n = this.config.get("i18n");
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

    if (typeComponent === "pages") {
      this.copy(
        this.templatePath("page.jsx"),
        this.destinationPath(libpath.join(dir, componentName + ".jsx"))
      );
      this.copy(
        this.templatePath("page.ejs"),
        this.destinationPath(libpath.join(dir, "index.js"))
      );
    } else if (typeComponent === "components") {
      this.copy(
        this.templatePath("component.jsx"),
        this.destinationPath(libpath.join(dir, componentName + ".jsx"))
      );
      this.copy(
        this.templatePath("component.ejs"),
        this.destinationPath(libpath.join(dir, "index.js"))
      );
      this.copy(
        this.templatePath("component_story.jsx"),
        this.destinationPath(libpath.join(dir, componentName + "_story.jsx"))
      );
      this.copy(
        this.templatePath("component.spec.ejs"),
        this.destinationPath(libpath.join(dir, "__tests__", componentName + ".spec.jsx"))
      );
    }
  }
});
