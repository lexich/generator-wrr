"use strict";
var path = require("path");
var assert = require("yeoman-assert");
var helpers = require("yeoman-generator").test;

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
        "src/components/TestComponent.jsx",
        "src/components/TestComponent.css",
      ]);
    });
  });

  describe("creates page with args", function () {
    before(function(done) {
      helpers.run(path.join(__dirname, "../generators/component"))
        .withArguments(["test-component"])
        .withOptions({ page: true })
        .on("end", done);
    })
    it("check", function () {
      this.timeout(10000);
      assert.file([
        "src/pages/TestComponent.jsx",
        "src/pages/TestComponent.css",
      ]);
      assert.fileContent("src/pages/TestComponent.jsx",
        `export default class TestComponentPage`);
      assert.fileContent("src/pages/TestComponent.jsx",
        `      <div className="TestComponentPage">`);
      assert.fileContent("src/pages/TestComponent.css",
        `.TestComponentPage`
      );
    });
  });
});
