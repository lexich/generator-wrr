'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the terrific ' + chalk.red('generator-wrr') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
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
    },
    configs: function () {
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
        this.templatePath("package.json"),
        this.destinationPath("package.json")
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
      this.fs.copy(
        this.templatePath("README.md"),
        this.destinationPath("README.md")
      );
      this.fs.copy(
        this.templatePath("template.html"),
        this.destinationPath("template.html")
      );
      this.fs.copy(
        this.templatePath("webpack.config.js"),
        this.destinationPath("webpack.config.js")
      );
    }
  },

  install: function () {
    this.npmInstall();
  }
});
