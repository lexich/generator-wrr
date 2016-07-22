"use strict";
const yeoman = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const _ = require("lodash");

module.exports = yeoman.Base.extend({
  prompting() {
    const done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      "Welcome to the Webpack-React-Redux " + chalk.red("generator-wrr") + " generator!"
    ));

    /* eslint key-spacing: 0 */
    const prompts = [{
      type:     "input",
      name:     "remotehost",
      message:  "Input remote host",
      default:  "http://locahost:3000"
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing() {
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
    this.directory(
      this.templatePath("web_modules"),
      this.destinationPath("web_modules")
    );
    this.directory(
      this.templatePath("webpack-loaders"),
      this.destinationPath("webpack-loaders")
    );
    this.directory(
      this.templatePath("scripts"),
      this.destinationPath("scripts")
    );

    // overwrite client.jsx
    this.fs.copy(
      this.templatePath("src/client.jsx"),
      this.destinationPath("src/client.jsx")
    );

    // configs
    this.fs.copy(
      this.templatePath("template.html"),
      this.destinationPath("template.html")
    );
    this.copy(
      this.templatePath("webpack.config.js"),
      this.destinationPath("webpack.config.js")
    );
  },

  package() {
    // pure generator
    const end = this.composeWith("wrr:pure", {
      options: Object.assign({}, this.options, {
        skipInstall: true
      })
    });
    end.on("end", ()=> {
      try {
        const pathPkgDest = this.destinationPath("package.json");
        const pathPkgTmpl = this.templatePath("package.json");
        const json = _.merge(
          JSON.parse(this.fs.read(pathPkgDest)),
          JSON.parse(this.fs.read(pathPkgTmpl))
        );

        this.fs.write(
          pathPkgDest,
          JSON.stringify(json, null, 2)
        );
      } catch (e) {
        this.log("process package.json fails:");
        this.log(e);
        this.fs.copy(
          this.templatePath("package.json"),
          this.destinationPath("package.json")
        );
      }
      this.npmInstall();
    });
  }
});
