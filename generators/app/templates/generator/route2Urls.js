"use strict";

import path from "path";

// lodash
import reduce from "lodash/reduce";
import uniq from "lodash/uniq";

export default function route2Urls(config, rootUrl, cb) {
  const urls = reduce(config.childRoutes,
    (memo, route)=> {
      const urlPath = (route && route.path) || "";
      const absUrl = path.join(rootUrl, urlPath);
      const url = cb ? cb(absUrl) : absUrl;
      return memo
        .concat(url)
        .concat(route2Urls(route, absUrl, cb));
    }, (config.indexRoute ? [rootUrl] : []));
  return uniq(urls);
}
