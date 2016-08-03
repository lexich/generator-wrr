"use strict";
export default {
  url: "/fixtures/entries.json",
  transformer(d) {
    return d || [];
  }
};
