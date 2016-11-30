"use strict";

import path from "path";
import uniq from "lodash/uniq";

import SiteGenerator from "./generator/index.jsx";
import locales from "./src/localization";

class Generator extends SiteGenerator {
  onProcessPath(filePath) {
    if (filePath === "/:lang/entry/:name") {
      const allEntries = ["test"];
      return allEntries.map((name)=> filePath.replace(":name", name));
    } else {
      return super.onProcessPath(filePath);
    }
  }
  matchUrl(url, locale) {
    /* eslint class-methods-use-this: 0 */
    return url.replace(":lang", locale);
  }
  writeFile(url, html, origUrl) {
    /* eslint prefer-template: 0 */
    const filePath = origUrl === "/:lang" ?
      path.join(url, "index.html") :
      `${url}.html`;
    this.writer.writeFile(filePath, html);
  }
}

const g = new Generator();
const urls = Object.keys(locales).reduce(
  (urls, locale)=>
    g.generate(locale, (url)=> {
      if (url === "/404" && locale !== "en") {
        return true;
      }
    }).concat(urls), []);

const sitemapUrls = uniq(urls).filter((p)=> p !== "/");

g.generateSitemap(sitemapUrls, "http://example.com");
