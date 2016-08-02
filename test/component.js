"use strict";
/* global describe, it, before */
/* eslint prefer-arrow-callback: 0 import/no-extraneous-dependencies: 0 */
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-wrr:component", function () {
  describe("creates component with args", function () {
    before(function () {
      return helpers.run(path.join(__dirname, "../generators/component"))
        .withArguments(["test-component"])
        .withOptions({ component: true })
        .toPromise();
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
    before(function () {
      return helpers.run(path.join(__dirname, "../generators/component"))
        .withArguments(["test-component"])
        .withOptions({ page: true })
        .toPromise();
    });
    it("check", function () {
      this.timeout(10000);
      assert.file([
        "src/pages/TestComponentPage/TestComponentPage.jsx",
        "src/pages/TestComponentPage/TestComponentPage.css",
        "src/pages/TestComponentPage/index.js"
      ]);
      assert.fileContent("src/pages/TestComponentPage/TestComponentPage.jsx",
        "export default class TestComponentPage");
      assert.fileContent("src/pages/TestComponentPage/TestComponentPage.jsx",
        "      <div className={className}>");
      assert.fileContent("src/pages/TestComponentPage/TestComponentPage.css",
        ".root"
      );
      assert.fileContent("src/pages/TestComponentPage/index.js", "react-redux");
    });
  });

  describe("creates component with args", function () {
    before(function () {
      return helpers.run(path.join(__dirname, "../generators/component"))
        .withArguments(["test-component"])
        .withOptions({ component: true })
        .toPromise();
    });
    it("check", function () {
      this.timeout(10000);
      assert.file([
        "src/components/TestComponent/TestComponent.jsx",
        "src/components/TestComponent/TestComponent.css",
        "src/components/TestComponent/index.js"
      ]);
      assert.fileContent("src/components/TestComponent/TestComponent.jsx",
        "export default class TestComponent");
      assert.fileContent("src/components/TestComponent/TestComponent.jsx",
        "      <div className={className}>");
      assert.fileContent("src/components/TestComponent/TestComponent.css",
        ".root"
      );
      assert.noFileContent("src/components/TestComponent/index.js", "react-redux");
    });
  });
});
