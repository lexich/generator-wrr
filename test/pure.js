"use strict";
/* global describe, it, before */
/* eslint prefer-arrow-callback: 0 */
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-wrr:pure", function () {
  before(function () {
    return helpers.run(path.join(__dirname, "../generators/pure"))
      .withPrompts({
        projectname: "test",
        githubuser: "lexich",
        fullname: "lexich"
      })
      .withOptions({ skipInstall: true })
      .toPromise();
  });

  it("creates files", function () {
    assert.file([
      ".babelrc",
      ".csscomb.json",
      ".editorconfig",
      ".eslintrc",
      ".gitignore",
      ".stylelintrc",
      ".travis.yml",
      "LICENSE",
      "README.md",
      "package.json"
    ]);
  });
});
