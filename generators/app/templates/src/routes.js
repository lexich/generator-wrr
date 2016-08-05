"use strict";

import rest from "./rest";
import Application from "pages/Application";
import IndexPage from "pages/IndexPage";
import AboutPage from "pages/AboutPage";
import EntryPage from "pages/EntryPage";
import NotfoundPage from "pages/NotfoundPage";

import { actionUpdate } from "react-i18n-universal/lib/redux";

function indexRoute({ dispatch }) {
  return {
    component: IndexPage,
    onEnter(state, replaceState, cb) {
      Promise.all([
        dispatch(rest.actions.apiUser.sync()),
        dispatch(rest.actions.apiEntries())
      ]).then(()=> cb());
    }
  };
}

function childRoutes({ dispatch }) {
  return [{
    path: "about",
    component: AboutPage
  }, {
    path: "entry/:name",
    component: EntryPage,
    onEnter({ params }, replaceState, cb) {
      dispatch(rest.actions.apiEntry({ name: params.name }))
        .then(()=> cb());
    }
  }];
}


export default function routes(...args) {
  return {
    path: "/",
    component: Application,
    indexRoute: {
      onEnter(state, replaceState) {
        const { getState } = args[0];
        const { i18n: { language } } = getState();
        replaceState(`/${language}`);
      }
    },
    childRoutes: [{
      path: "/404",
      component: NotfoundPage
    }, {
      path: ":lang",
      onEnter({ params }, replaceState) {
        const { dispatch, getState } = args[0];
        const { i18n: { languages } } = getState();
        if (languages.indexOf(params.lang) > -1) {
          dispatch(actionUpdate(params.lang));
        } else {
          replaceState("/404");
        }
      },
      indexRoute: indexRoute(...args),
      childRoutes: childRoutes(...args)
    }]
  };
}
