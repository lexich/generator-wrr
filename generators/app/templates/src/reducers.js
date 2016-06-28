const loader = require.context("./reducers", true, /\.(js)$/);

function makeReducer(reducer) {
  return (state=reducer.initialState, action)=> {
    const func = reducer.default && reducer.default[action.type];
    return func ? func(state, action) : state;
  };
}

const rx = /^\.\/(.+)\.js$/;

export default loader.keys().reduce((memo, key)=> {
  const name = key.replace(rx, "$1");
  memo[name] = makeReducer(loader(key));
  return memo;
}, {});
