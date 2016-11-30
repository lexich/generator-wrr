"use strict";

/* global describe, it, before */
/* eslint prefer-arrow-callback: 0, import/no-extraneous-dependencies: 0, quotes: 0 */

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
        "src/components/TestComponent/TestComponent_story.jsx",
        "src/components/TestComponent/__tests__/TestComponent.spec.jsx",
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
      assert.noFile([
        "src/components/TestComponent/TestComponentPage_story.jsx",
      ]);
      assert.fileContent(
        "src/pages/TestComponentPage/TestComponentPage.jsx",
        "export default class TestComponentPage"
      );
      assert.fileContent(
        "src/pages/TestComponentPage/TestComponentPage.jsx",
        "      <div className={className}>"
      );
      assert.fileContent(
        "src/pages/TestComponentPage/TestComponentPage.jsx",
        `import Helmet from "react-helmet";`
      );
      assert.fileContent(
        "src/pages/TestComponentPage/TestComponentPage.jsx",
        `<Helmet title={"TestComponentPage"} />`
      );
      assert.fileContent(
        "src/pages/TestComponentPage/TestComponentPage.css",
        ".root"
      );
      assert.fileContent(
        "src/pages/TestComponentPage/index.js",
        "react-redux"
      );
      assert.fileContent(
        "src/pages/TestComponentPage/TestComponentPage.jsx",
        `import Helmet from "react-helmet";`
      );
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
        "src/components/TestComponent/TestComponent_story.jsx",
        "src/components/TestComponent/__tests__/TestComponent.spec.jsx",
        "src/components/TestComponent/index.js"
      ]);

      assert.fileContent(
        "src/components/TestComponent/TestComponent.jsx",
        "export default class TestComponent"
      );
      assert.fileContent(
        "src/components/TestComponent/TestComponent.jsx",
        "      <div className={className}>"
      );
      assert.noFileContent(
        "src/components/TestComponent/TestComponent.jsx",
        "Helmet"
      );
      assert.fileContent(
        "src/components/TestComponent/TestComponent.css",
        ".root"
      );
      assert.noFileContent(
        "src/components/TestComponent/index.js",
        "react-redux"
      );
    });
  });
});
