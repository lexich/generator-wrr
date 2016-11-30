"use strict";

/* eslint import/first: 0 */
// Mode: <%= process.env.NODE_ENV %>

const DEBUG = true && process.env.NODE_ENV === "develop";
import React from "react";
import { render } from "react-dom";

// react-router
import { Router, browserHistory as history } from "react-router";
import routes from "./routes";

// redux
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reduxError from "redux-error";

// redux-api
import rest from "./rest";
import "isomorphic-fetch";

// localization
import initI18n from "react-i18n-universal/lib/redux";
import jsCookie from "js-cookie";
import locales from "./localization";

const systemLang =
  window.navigator.userLanguage ||
  window.navigator.language ||
  "en-US";

const locale =
  jsCookie.get("language") ||
  (/^([^-]+)/.exec(systemLang) && RegExp.$1);

const defaultLocale = locales[locale] ? locale : Object.keys(locales)[0];

const i18n = initI18n({
  reducerName: "i18n",
  locales,
  defaultLocale,
  cb(locale) {
    jsCookie.set("language", locale, { path: "/" });
  }
});

rest.use("fetch",
  (url, opts)=> fetch(url, opts)
    .then((r)=> {
      if (r.status === 204) {
        return {};
      } else {
        const isOk = r.status >= 200 && r.status <= 300;
        return r.json().then(
          (d)=> isOk ? d : Promise.reject(d));
      }
    })
);

let DevTools;
/* <% if(process.env.NODE_ENV === 'develop') { %> */

// Redux DevTools store enhancers
import { createDevTools, persistState } from "redux-devtools";
import LogMonitor from "redux-devtools-log-monitor";
import DockMonitor from "redux-devtools-dock-monitor";

if (DEBUG && !window.devToolsExtension) {
  DevTools = createDevTools(
    <DockMonitor
      defaultIsVisible={false}
      toggleVisibilityKey="ctrl-h"
      changePositionKey="ctrl-q"
    >
      <LogMonitor theme="tomorrow" />
    </DockMonitor>
  );
}
/* <% } %> */

import reducers from "./reducers";

// Prepare store
const reducer = combineReducers({
  ...rest.reducers,
  ...reducers,
  i18n: i18n.reducer
});

let midleware = [applyMiddleware(reduxError, thunk)];

/* <% if(process.env.NODE_ENV === 'develop') { %> */
if (DEBUG) {
  const getDebugSessionKey = function () {
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0) ? matches[1] : null;
  };
  midleware = midleware.concat(
    window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
    persistState(getDebugSessionKey())
  );
}
/* <% } %> */

const finalCreateStore = compose(...midleware)(createStore);

const initialState = window.$REDUX_STATE;
const store = initialState ? finalCreateStore(reducer, initialState) : finalCreateStore(reducer);
delete window.$REDUX_STATE;

const childRoutes = routes(store);

const el = document.getElementById(
  window.APP_MOUNT_POINT || "react-main-mount"
) || document.body;

render(
  <Provider store={store}>
    <i18n.I18N>
      <div className="ApplicationRoot">
        <Router key="ta-app" history={history}>
          {childRoutes}
        </Router>
        {DevTools ? <DevTools /> : null}
      </div>
    </i18n.I18N>
  </Provider>,
  el
);
