"use strict";

// native libs
import path from "path";
import fs from "fs";

// lodash
import memoize from "lodash/memoize";
import reduce from "lodash/reduce";

// npm deps
import mkdirp from "mkdirp";

// react
import React from "react";
import ReactDom from "react-dom/server";
import Helmet from "react-helmet";

import { Document } from "../template";

export default class Writer {
  constructor(
    distDir=path.join(__dirname, "..", "dist"),
    manifestName="manifest.json",
    favicons=path.join("icons", ".cache")
  ) {
    this.distDir = distDir;
    this.favicons = this.initFavicons(
      path.join(distDir, favicons)
    );
    const manifest = this.initManifest(
      path.join(distDir, manifestName)
    );

    this.js = manifest.filter(
      (item)=> /\.js$/.test(item));

    this.css = manifest.filter(
      (item)=> /\.css$/.test(item));

    this.mkdirpSync = memoize(
      (filePath)=> mkdirp.sync(filePath));
  }

  initManifest(manifestPath) {
    try {
      return reduce(JSON.parse(fs.readFileSync(manifestPath)),
        (memo, val)=> memo.concat(val), []);
    } catch (e) {
      console.error(e);
    }
    return [];
  }

  initFavicons(faviconPath) {
    try {
      const f = JSON.parse(fs.readFileSync(faviconPath));
      return f.result.html.join("");
    } catch (e) {
      console.error(e);
    }
    return "";
  }

  writeFile(fileName, html) {
    const data = ReactDom.renderToStaticMarkup(
      <Document html={html} head={Helmet.rewind()} />
    );

    const result = data
      .replace("</head>", `${this.favicons}</head>`)
      .replace(/data-react-helmet="true"/g, "");

    return this.write(fileName, result);
  }

  write(name, data) {
    const filePath = path.join(this.distDir, name);
    this.mkdirpSync(path.dirname(filePath));
    fs.writeFileSync(filePath, data);
    /* eslint no-console: 0 */
    console.log("Write:", filePath);
  }
}
