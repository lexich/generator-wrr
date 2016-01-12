"use strict";
const yeoman = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const libpath = require("path");
const _ = require("lodash");

module.exports = yeoman.Base.extend({
  prompting() {
    const done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      "Welcome to the Webpack-React-Redux " + chalk.red("generator-wrr") + " generator!"
    ));

    const prompts = [];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing() {

    // pure generator
    this.composeWith("wrr:pure", {
      options: this.options
    });

    // app
    this.directory(
      this.templatePath("css-external"),
      this.destinationPath("css-external")
    );
    this.directory(
      this.templatePath("public"),
      this.destinationPath("public")
    );
    this.directory(
      this.templatePath("src"),
      this.destinationPath("src")
    );

    // configs
    this.fs.copy(
      this.templatePath("template.html"),
      this.destinationPath("template.html")
    );
    this.fs.copy(
      this.templatePath("webpack.config.js"),
      this.destinationPath("webpack.config.js")
    );
  },

  install() {
    const path = this.templatePath("npm-deps.json");
    const json = require(path);

    if (json.devDependencies) {
      const install = _.map(json.devDependencies,
        (version, name)=> `${name}@${version}`);
      this.npmInstall(install, { saveDev: true });
    }
    if (json.dependencies) {
      const install = _.map(json.dependencies,
        (version, name)=> `${name}@${version}`);
      this.npmInstall(install, { save: true });
    }

  }
});
