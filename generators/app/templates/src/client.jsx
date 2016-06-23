"use strict";
const DEBUG = false && process.env.NODE_ENV === "develop";
import React from "react";
import { render } from "react-dom";

// react-router
import { Router, hashHistory as history } from "react-router";
import routes from "./routes";

// redux
import { createStore, applyMiddleware, combineReducers } from "redux";
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
    <Router key="ta-app" history={history} children={childRoutes} />
  </Provider>,
  el
);
