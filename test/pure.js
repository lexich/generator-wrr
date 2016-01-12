"use strict";
var path = require("path");
var assert = require("yeoman-assert");
var helpers = require("yeoman-test");

describe("generator-wrr:pure", function () {
  before(function (done) {
    helpers.run(path.join(__dirname, "../generators/pure"))
      .withPrompts({
        projectname: "test",
        githubuser: "lexich",
        fullname: "lexich"
      })
      .withOptions({
        skipInstall: true
      })
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
      "package.json"
    ]);
  });
});
