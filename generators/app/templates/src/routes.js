"use strict";

import rest from "./rest";
import Application from "pages/Application";
import Index from "pages/Index";

export default function routes({ dispatch }) {
  return {
    path: "/",
    component: Application,
    indexRoute: {
      component: Index,
      onEnter(state, replaceState, cb) {
        dispatch(rest.actions.user(cb));
      }
    },
    childRoutes: []
  };
}
