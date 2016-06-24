"use strict";

const _ = require("lodash");
const loaderUtils = require("loader-utils");

module.exports = function(source) {
  this.cacheable();
  const options = loaderUtils.parseQuery(this.query);
  const template = _.template(source)(options);
  return template;
};
