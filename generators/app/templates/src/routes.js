"use strict";

import rest from "./rest";
import Application from "./pages/Application";
import IndexPage from "./pages/IndexPage";
import AboutPage from "./pages/AboutPage";
import EntryPage from "./pages/EntryPage";

export default function routes({ dispatch }) {
  return {
    path: "/",
    component: Application,
    indexRoute: {
      component: IndexPage,
      onEnter(state, replaceState, cb) {
        Promise.all([
          dispatch(rest.actions.apiUser.sync()),
          dispatch(rest.actions.apiEntries())
        ]).then(()=> cb());
      }
    },
    childRoutes: [{
      path: "/about",
      component: AboutPage
    }, {
      path: "/entry/:name",
      component: EntryPage,
      onEnter({ params }, replaceState, cb) {
        dispatch(rest.actions.apiEntry({ name: params.name }, cb));
      }
    }]
  };
}
