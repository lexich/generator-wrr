"use strict";
export function setCookie(name, value, options) {
  if (!document) { return; }
  options = options || {};

  let expires = options.expires;

  if (typeof expires === "number" && expires) {
    const d = new Date();
    d.setTime(d.getTime() + (expires * 1000));
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }
  value = encodeURIComponent(value);
  document.cookie = Object.keys(options).reduce((updatedCookie, propName)=> {
    updatedCookie += `; ${propName}`;
    const propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
    return updatedCookie;
  }, `${name}=${value}`);
}

export function getCookie(name) {
  if (!document) { return; }
  /* eslint prefer-template: 0, no-void: 0 */
  const matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : (void 0);
}
