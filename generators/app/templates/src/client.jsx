"use strict";
const DEBUG = false && process.env.NODE_ENV === "develop";
import React from "react";
import { render } from "react-dom";

// react-router
import Router from "react-router";
import { default as routes, history } from "./routes";

// redux
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reduxError from "redux-error";

// redux-api
import rest from "./rest";
import "isomorphic-fetch";

rest.use("fetch", (url, opts)=> {
  return fetch(url, opts).then((r)=> r.json().then(
    (d)=> new Promise(
      (resolve, reject)=> {
        if (r.status >= 200 && r.status < 300) {
          resolve(d);
        } else {
          reject(d);
        }
      }
    )));
});

import createLogger from "redux-logger";

// Prepare store
const reducer = combineReducers({ ...rest.reducers });
const finalCreateStore = DEBUG ?
  applyMiddleware(reduxError, thunk, createLogger())(createStore) :
  applyMiddleware(reduxError, thunk)(createStore);
const initialState = window.$REDUX_STATE;
const store = initialState ? finalCreateStore(reducer, initialState) : finalCreateStore(reducer);
delete window.$REDUX_STATE;

const childRoutes = routes(store);

const el = document.getElementById(
  window.APP_MOUNT_POINT || "react-main-mount"
) || document.body;

render(
  <Provider store={store}>
    <Router key="ta-app" history={history} children={childRoutes}/>
  </Provider>,
  el
);
