"use strict";

/* global describe, it, before */
/* eslint import/no-extraneous-dependencies: 0 */
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const yeoman = require("yeoman-generator");

describe("generator-wrr:app", ()=> {
  before(function () {
    this.timeout(10000);
    const self = this;
    self.executeState = 0;
    const Dummy = yeoman.Base.extend({
      exec() {
        self.executeState += 1;
      }
    });

    return helpers.run(path.join(__dirname, "../generators/app"))
      .withOptions({ skipInstall: true })
      .withPrompts({
        projectname: "test",
        githubuser: "lexich",
        fullname: "lexich"
      })
      .withGenerators([
        [Dummy, "wrr:pure"]
      ])
      .toPromise();
  });

  it("creates files", function () {
    assert(this.executeState === 1);
    assert.file([
      "template.js",
      "logo.png",
      "webpack.config.js",
      "static.webpack.config.js",
      "web_modules/.gitkeep",

      "webpack-loaders/preprocess-loader.js",
      "public/robots.txt",

      "public/fixtures/entries.json",
      "public/fixtures/entries/test.json",
      "public/fixtures/user.json",

      "src/vars.css",
      "src/client.jsx",

      "src/routes.js",
      "src/localization.js",

      "src/langs/ru.json",

      "src/constants.js",
      "src/reducers.js",
      "src/reducers/index_page.js",
      "src/actions/index_page.js",

      "src/components/Hello/Hello.css",
      "src/components/Hello/Hello.jsx",

      "src/pages/AboutPage/AboutPage.css",
      "src/pages/AboutPage/AboutPage.jsx",
      "src/pages/AboutPage/index.js",
      "src/pages/AboutPage/about.md",
      "src/pages/AboutPage/about.ru.md",

      "src/pages/Application/Application.css",
      "src/pages/Application/Application.jsx",
      "src/pages/Application/index.js",

      "src/pages/IndexPage/IndexPage.css",
      "src/pages/IndexPage/IndexPage.jsx",
      "src/pages/IndexPage/index.js",
      "src/pages/IndexPage/IndexPage.Hello.css",
      "src/pages/IndexPage/IndexPage.Hello.jsx",
      "src/pages/IndexPage/throne.jpg",

      "src/pages/NotfoundPage/NotfoundPage.css",
      "src/pages/NotfoundPage/NotfoundPage.jsx",
      "src/pages/NotfoundPage/index.js",

      "src/pages/EntryPage/EntryPage.css",
      "src/pages/EntryPage/EntryPage.jsx",
      "src/pages/EntryPage/index.js",

      "src/rest.js",
      "src/rest/user.js",
      "src/rest/entries.js",
      "src/rest/entry.js",
      "src/utils/.gitkeep",

      "generator.js",
      "generator/index.jsx",
      "generator/route2Urls.js",
      "generator/writer.jsx",

      ".storybook/config.js",
      ".storybook/webpack.config.js",


      ".jeststuff/fileMock.js",
      ".jeststuff/styleMock.js",
    ]);
  });
});
