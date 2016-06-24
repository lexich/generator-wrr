"use strict";
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
if (DEBUG) {
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

const reducers = {};

// Prepare store
const reducer = combineReducers({ ...rest.reducers, ...reducers });

let midleware = [applyMiddleware(reduxError, thunk)];

/* <% if(process.env.NODE_ENV === 'develop') { %> */
if (DEBUG) {
  const getDebugSessionKey = function () {
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0) ? matches[1] : null;
  };
  midleware = midleware.concat(
    DevTools.instrument(),
    persistState(getDebugSessionKey())
  );
}
/* <% } %> */

const finalCreateStore = compose.apply(null, midleware)(createStore);

const initialState = window.$REDUX_STATE;
const store = initialState ? finalCreateStore(reducer, initialState) : finalCreateStore(reducer);
delete window.$REDUX_STATE;

const childRoutes = routes(store);

const el = document.getElementById(
  window.APP_MOUNT_POINT || "react-main-mount"
) || document.body;

render(
  <Provider store={store}>
    <div className="ApplicationRoot">
      <Router key="ta-app" history={history} children={childRoutes} />
      {DevTools ? <DevTools /> : null}
    </div>
  </Provider>,
  el
);
