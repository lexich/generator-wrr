"use strict";

import rest from "./rest";
import Application from "pages/Application";
import IndexPage from "pages/IndexPage";

export default function routes({ dispatch }) {
  return {
    path: "/",
    component: Application,
    indexRoute: {
      component: IndexPage,
      onEnter(state, replaceState, cb) {
        dispatch(rest.actions.apiUser(cb));
      }
    },
    childRoutes: []
  };
}
