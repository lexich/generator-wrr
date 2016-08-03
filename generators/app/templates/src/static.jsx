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

// redux-api
import rest from "./rest";

const history = useRouterHistory(createMemoryHistory)({ queryKey: false });


import reducers from "./reducers";

// Prepare store
const reducer = combineReducers({ ...rest.reducers, ...reducers });

const midleware = [applyMiddleware(reduxError, thunk)];


const finalCreateStore = compose(...midleware)(createStore);


const config = routes(finalCreateStore(reducer));
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
    templateName="template.tmpl",
    distDir=path.join(__dirname, "..", "dist")
  ) {
    this._distDir = distDir;
    this._template = fs.readFileSync(
      path.join(distDir, templateName), "utf-8").toString();
  }
  template(html, state) {
    /* eslint quotes: 0 */
    const json = JSON.stringify(state || {});
    return this._template.replace(
      `<div id="react-main-mount"></div>`,
      `<div id="react-main-mount">${html}</div>
      <script>window.$REDUX_STATE = ${json}</script>`
    );
  }
  write(url, html, state) {
    /* eslint prefer-template: 0 */
    const name = url === rootPath ?
      "index.html" : url.replace(/^\//, "") + ".html";

    const filePath = path.join(this._distDir, name);
    mkdirpSync(path.dirname(filePath));

    fs.writeFileSync(filePath, this.template(html, state));
    /* eslint no-console: 0 */
    console.log(`Write:`, filePath);
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

urls.forEach((url)=> {
  const store = finalCreateStore(reducer);
  const matchOpts = { routes: routes(store), location: url, history };
  match(matchOpts, (error, redirectLocation, renderProps)=> {
    if (!error && !redirectLocation) {
      try {
        const html = ReactDom.renderToString(
          <Provider store={store}>
            <div className="ApplicationRoot">
              <RouterContext {...renderProps} />
            </div>
          </Provider>
        );
        writer.write(url, html, store.getState());
      } catch (e) {
        /* eslint no-console: 0 */
        console.error(`Error: ${url}`, e);
      }
    }
  });
});
