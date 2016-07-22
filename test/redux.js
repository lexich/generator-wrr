"use strict";
/* global describe, it, before */
/* eslint prefer-arrow-callback: 0 */
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-wrr:redux", function () {
  describe("creates action/reducer with args", function () {
    before(function () {
      return helpers.run(path.join(__dirname, "..", "generators", "redux"))
        .withArguments(["IndexPage"])
        .toPromise();
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
