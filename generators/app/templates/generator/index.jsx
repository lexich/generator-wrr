"use strict";

// native libs
import path from "path";
import fs from "fs";

// react
import React from "react";
import ReactDom from "react-dom/server";
import { RouterContext, match } from "react-router";
import createMemoryHistory from "react-router/lib/createMemoryHistory";
import useRouterHistory from "react-router/lib/useRouterHistory";
import Helmet from "react-helmet";

// redux
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import reduxError from "redux-error";
import { Provider } from "react-redux";
import initI18n from "react-i18n-universal/lib/redux";

// npm deps
import sitemap from "sitemap";

// local deps
import Writer from "./writer";
import route2Urls from "./route2Urls";

// project deps
import routes from "../src/routes";
import rest from "../src/rest";
import locales from "../src/localization";
import reducers from "../src/reducers";


export default class SiteGenerator {
  constructor() {
    const midleware = [applyMiddleware(reduxError, thunk)];
    this.finalCreateStore = compose(...midleware)(createStore);
    const config = this.config =
      routes(this.finalCreateStore(combineReducers({ ...reducers })));

    this.history = useRouterHistory(createMemoryHistory)({ queryKey: false });
    this.writer = new Writer();
    this.urls = route2Urls(
      config,
      (config.path || ""),
      this.onProcessPath.bind(this)
    );
    rest.use("fetch", this.fetch.bind(this));
  }

  fetch(url) {
    const filePath = path.join(__dirname, "..", "dist", url);
    return new Promise(
      (resolve, reject)=> fs.stat(filePath,
        (err)=> err ? reject(err) : resolve(filePath))
    )
    .then(
      (filePath)=> new Promise(
        (resolve, reject)=> fs.readFile(filePath, "utf-8",
          (err, data)=> err ? reject(err) : resolve(data)))
    )
    .then((data)=> JSON.parse(data))
    .catch((err)=> {
      /* eslint no-console: 0 */
      console.error(err);
    });
  }

  onProcessPath(filePath) {
    return filePath ? [filePath] : [];
  }

  matchUrl(url) {
    return url;
  }

  generate(defaultLocale, filterUrl) {
    const { writer, urls, history } = this;

    const i18n = initI18n({
      locales,
      defaultLocale,
      reducerName: "i18n"
    });

    const reducer = combineReducers({
      ...rest.reducers,
      ...reducers,
      i18n: i18n.reducer
    });

    const resultUrls = urls.map((aUrl)=> {
      if (filterUrl && filterUrl(aUrl)) {
        return;
      }
      const url = this.matchUrl(aUrl, defaultLocale);
      // Prepare store
      const store = this.finalCreateStore(reducer);
      const matchOpts = {
        routes: routes(store),
        location: url,
        history
      };

      match(matchOpts, (error, redirectLocation, renderProps)=> {
        if (!error && !redirectLocation) {
          try {
            const json = JSON.stringify(store.getState());

            const scripts = [{
              type: "text/javascript",
              innerHTML: `window.$REDUX_STATE = ${json}`
            }].concat(writer.js.map((jspath)=> ({
              type: "text/javascript",
              src: `/${jspath}`
            })));

            const links = writer.css.map((csspath)=> ({
              rel: "stylesheet",
              href: `/${csspath}`
            }));

            const html = ReactDom.renderToStaticMarkup(
              <Provider store={store}>
                <i18n.I18N>
                  <div className="ApplicationRoot">
                    <RouterContext {...renderProps} />
                    <Helmet script={scripts} link={links} />
                  </div>
                </i18n.I18N>
              </Provider>
            );
            this.writeFile(url, html, aUrl);
          } catch (e) {
            /* eslint no-console: 0 */
            console.error(`Error: ${url}`, e, e.stack);
          }
        }
      });
      return url;
    });
    return resultUrls.filter((url)=> url !== (void 0));
  }
  writeFile(url, html) {
    /* eslint prefer-template: 0 */
    const filePath = url === this.config.path ?
      "index.html" : url.replace(/^\//, "") + ".html";
    this.writer.writeFile(filePath, html);
  }
  sitemapUrls(urls=[]) {
    const lastmodISO = new Date().toISOString();
    return urls.map((url)=> ({
      url,
      changefreq: "monthly",
      lastmodISO
    }));
  }
  generateSitemap(urls=[], hostname="http://example.com") {
    const xmlData = sitemap.createSitemap({
      hostname,
      cacheTime: 600000,
      urls: this.sitemapUrls(urls)
    }).toString();
    this.writer.write("sitemap.xml", xmlData);
  }
}
