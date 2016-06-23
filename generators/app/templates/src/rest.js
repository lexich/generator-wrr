import reduxApi from "redux-api";

const loader = require.context("./rest", true, /\.(js)$/);

const rx = /^\.\/(.+)\.js$/;
const config = loader.keys().reduce((memo, key)=> {
  const name = key.replace(rx, "$1");
  memo[name] = loader(key);
  return memo;
}, {});

export default reduxApi(config);
