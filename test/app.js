"use strict";
/* global describe, it, before */
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const yeoman = require("yeoman-generator");

describe("generator-wrr:app", function () {
  before(function (done) {
    this.timeout(10000);
    const self = this;
    self.executeState = 0;
    const Dummy = yeoman.Base.extend({
      exec() {
        self.executeState += 1;
      }
    });

    helpers.run(path.join(__dirname, "../generators/app"))
      .withOptions({ skipInstall: true })
      .withPrompts({
        projectname: "test",
        githubuser: "lexich",
        fullname: "lexich"
      })
      .withGenerators([
        [Dummy, "wrr:pure"]
      ])
      .on("end", done);
  });

  it("creates files", function () {
    assert(this.executeState === 1);
    assert.file([
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
