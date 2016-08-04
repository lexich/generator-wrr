import routes from "./routes";
import reduce from "lodash/reduce";
import memoize from "lodash/memoize";
import path from "path";

import React from "react";
import ReactDom from "react-dom/server";
import { RouterContext, match } from "react-router";
import createMemoryHistory from "react-router/lib/createMemoryHistory";
import useRouterHistory from "react-router/lib/useRouterHistory";

// redux
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import reduxError from "redux-error";
import { Provider } from "react-redux";
import fs from "fs";
import mkdirp from "mkdirp";
import { Document } from "../template";
import Helmet from "react-helmet";
import sitemap from "sitemap";

// redux-api
import rest from "./rest";

// localization
import initI18n from "react-i18n-universal/lib/redux";
import locales from "./localization";

const history = useRouterHistory(createMemoryHistory)({ queryKey: false });


import reducers from "./reducers";


const midleware = [applyMiddleware(reduxError, thunk)];

const finalCreateStore = compose(...midleware)(createStore);


const config = routes(finalCreateStore(combineReducers({})));
const rootPath = config.path;

function processPath(filePath) {
  if (!filePath) {
    return [];
  } else if (filePath === "/entry/:name") {
    const allEntries = ["test"];
    return allEntries.map((name)=> filePath.replace(":name", name));
  } else if (filePath) {
    return [path.join(rootPath, filePath)];
  } else {
    return [];
  }
}

const urls = reduce(config.childRoutes,
  (memo, route)=> memo.concat(processPath(route && route.path)),
  (config.indexRoute ? [rootPath] : [])
);

const mkdirpSync = memoize((filePath)=> mkdirp.sync(filePath));

class Writer {
  /* eslint no-underscore-dangle: 0 */
  constructor(
    distDir=path.join(__dirname, "..", "dist"),
    manifestName="manifest.json",
    favicons=path.join("icons", ".cache")
  ) {
    this._distDir = distDir;
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
  writeFile(url, html, locale) {
    /* eslint prefer-template: 0 */
    const name = url === rootPath ?
      "index.html" : url.replace(/^\//, "") + ".html";

    const data = ReactDom.renderToStaticMarkup(
      <Document html={html} head={Helmet.rewind()} />
    )
      .replace("</head>", `${this.favicons}</head>`)
      .replace(/data-react-helmet="true"/g, "");

    return this.write(name, data, locale);
  }
  write(name, data, locale="") {
    const filePath = path.join(this._distDir, locale, name);
    mkdirpSync(path.dirname(filePath));
    fs.writeFileSync(filePath, data);
    /* eslint no-console: 0 */
    console.log("Write:", filePath);
  }
}

rest.use("fetch", (url)=> {
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
});


const writer = new Writer();


function generate(defaultLocale="en", multilang=false) {
  const i18n = initI18n({
    reducerName: "i18n",
    locales,
    defaultLocale
  });

  const reducer = combineReducers({
    ...rest.reducers,
    ...reducers,
    i18n: i18n.reducer
  });

  urls.forEach((url)=> {
    // Prepare store
    const store = finalCreateStore(reducer);
    const matchOpts = { routes: routes(store), location: url, history };
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
          const metas = [{
            "http-equiv": "content-type",
            content: "text/html; charset=utf-8"
          }];

          const html = ReactDom.renderToStaticMarkup(
            <Provider store={store}>
              <i18n.I18N>
                <div className="ApplicationRoot">
                  <RouterContext {...renderProps} />
                  <Helmet script={scripts} link={links} meta={metas} />
                </div>
              </i18n.I18N>
            </Provider>
          );
          writer.writeFile(url, html, multilang ? defaultLocale : "");
        } catch (e) {
          /* eslint no-console: 0 */
          console.error(`Error: ${url}`, e, e.stack);
        }
      }
    });
  });
}
generate("en");

const lastmodISO = new Date().toISOString();
const xmlData = sitemap.createSitemap({
  hostname: "http://example.com",
  cacheTime: 600000,
  urls: urls.map((url)=> ({
    url,
    changefreq: "monthly",
    priority: (url === rootPath ? 1 : 0.5),
    lastmodISO
  }))
}).toString();

writer.write("sitemap.xml", xmlData);
