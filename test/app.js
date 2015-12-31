"use strict";
/* global describe, it, before */
var path = require("path");
var assert = require("yeoman-assert");
var helpers = require("yeoman-generator").test;

describe("generator-wrr:app", function () {
  before(function (done) {
    helpers.run(path.join(__dirname, "../generators/app"))
      .withOptions({ someOption: true })
      .withPrompts({ someAnswer: true })
      .on("end", done);
  });

  it("creates files", function () {
    assert.file([
      ".babelrc",
      ".csscomb.json",
      ".editorconfig",
      ".eslintrc",
      ".gitignore",
      ".stylelint-config.js",
      ".stylelintrc",
      ".travis.yml",
      "LICENSE",
      "README.md",
      "package.json",
      "template.html",
      "webpack.config.js",

      "css-external/cssvars.json",
      "css-external/mixins/ellipsis.css",
      "public/robots.txt",
      "public/user.json",
      "src/client.jsx",
      "src/pages/Application.css",
      "src/pages/Application.jsx",
      "src/pages/Index.css",
      "src/pages/Index.jsx",
      "src/rest/index.js",
      "src/rest/user.js"
    ]);
  });
});
