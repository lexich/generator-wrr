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
      "Welcome to the pure js " + chalk.red("generator-wrr") + " generator!"
    ));

    /* eslint key-spacing: 0 */
    const prompts = [{
      type    : "input",
      name    : "projectname",
      message : "Your project name",
      default : libpath.basename(this.env.cwd)
    }, {
      type    : "input",
      name    : "githubuser",
      message : "Input github username",
      default : "username"
    }, {
      type    : "input",
      name    : "fullname",
      message : "Input your full name",
      default : "Full Name"
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      done();
    }.bind(this));
  },
  writing() {
    this.fs.copy(
      this.templatePath("index.js"),
      this.destinationPath("index.js")
    );
    this.copy(
      this.templatePath("package.json"),
      this.destinationPath("package.json")
    );
    this.copy(
      this.templatePath("README.md"),
      this.destinationPath("README.md")
    );
    this.copy(
      this.templatePath("LICENSE"),
      this.destinationPath("LICENSE")
    );
    this.fs.copy(
      this.templatePath("_babelrc"),
      this.destinationPath(".babelrc")
    );
    this.fs.copy(
      this.templatePath("_csscomb.json"),
      this.destinationPath(".csscomb.json")
    );
    this.fs.copy(
      this.templatePath("_editorconfig"),
      this.destinationPath(".editorconfig")
    );
    this.fs.copy(
      this.templatePath("_eslintrc"),
      this.destinationPath(".eslintrc")
    );
    this.fs.copy(
      this.templatePath("_gitignore"),
      this.destinationPath(".gitignore")
    );
    this.fs.copy(
      this.templatePath("_stylelint-config.js"),
      this.destinationPath(".stylelint-config.js")
    );
    this.fs.copy(
      this.templatePath("_stylelintrc"),
      this.destinationPath(".stylelintrc")
    );
    this.fs.copy(
      this.templatePath("_travis.yml"),
      this.destinationPath(".travis.yml")
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
