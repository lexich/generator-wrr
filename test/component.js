"use strict";
/* global describe, it, before */
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-wrr:component", function () {
  describe("creates component with args", function() {
    before(function(done) {
      helpers.run(path.join(__dirname, "../generators/component"))
        .withArguments(["test-component"])
        .withOptions({ component: true })
        .on("end", done);
    });
    it("check", function () {
      this.timeout(10000);
      assert.file([
        "src/components/TestComponent/TestComponent.jsx",
        "src/components/TestComponent/TestComponent.css",
        "src/components/TestComponent/index.js"
      ]);
    });
  });

  describe("creates page with args", function () {
    before(function(done) {
      helpers.run(path.join(__dirname, "../generators/component"))
        .withArguments(["test-component"])
        .withOptions({ page: true })
        .on("end", done);
    });
    it("check", function () {
      this.timeout(10000);
      assert.file([
        "src/pages/TestComponentPage/TestComponentPage.jsx",
        "src/pages/TestComponentPage/TestComponentPage.css",
        "src/pages/TestComponentPage/index.js"
      ]);
      assert.fileContent("src/pages/TestComponentPage/TestComponentPage.jsx",
        `export default class TestComponentPage`);
      assert.fileContent("src/pages/TestComponentPage/TestComponentPage.jsx",
        `      <div className={className}>`);
      assert.fileContent("src/pages/TestComponentPage/TestComponentPage.css",
        `.root`
      );
    });
  });
});
