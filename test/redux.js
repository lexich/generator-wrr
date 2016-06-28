"use strict";
/* global describe, it, before */
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-wrr:redux", function () {
  describe("creates action/reducer with args", function() {
    before(function(done) {
      helpers.run(path.join(__dirname, "../generators/redux"))
        .withArguments(["IndexPage"])
        .on("end", done);
    });
    it("check", function () {
      this.timeout(10000);
      assert.file([
        "src/reducers/index_page.js",
        "src/actions/index_page.js"
      ]);
    });
  });
});
