"use strict";

export default {
  url: "/fixtures/entries/(:name).json",
  transformer(d) {
    return d || { title: "", body: "" };
  }
};
