import reduxApi from "redux-api";
import camelCase from "lodash/camelCase";
import capitalize from "lodash/capitalize";

const loader = require.context("./rest", true, /\.(js)$/);

const rx = /^\.\/(.+)\.js$/;
const config = loader.keys().reduce((memo, key)=> {
  const name = capitalize(camelCase(key.replace(rx, "$1")));
  memo[`api${name}`] = loader(key);
  return memo;
}, {});

export default reduxApi(config);
