"use strict";
/* eslint prefer-arrow-callback: 0, import/no-extraneous-dependencies: 0 */

const httpProxy = require("http-proxy");
const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PROXY_PORT || 8081;
const REMOTE_PORT = process.env.PROXY_REMOTE_PORT || 8082;

const proxy = httpProxy.createProxyServer({
  target: "http://locahost:3000",
  secure: false,
  bypass(req) {
    req.headers.host = "http://locahost:3000";
    req.headers.referer = "http://locahost:3000";
  }
}).listen(REMOTE_PORT, function () {
  /* eslint no-console: 0 */
  console.log("Proxy remote server http://locahost:3000" +
    ` started at http://localhost:${REMOTE_PORT}`);
});


const app = express();
const rootDir = path.resolve(path.join(__dirname, "..", "dist"));

const fileExist = (filePath)=> new Promise(
  (resolve, reject)=> fs.stat(filePath,
    (err, stat)=> /* eslint no-confusing-arrow: 0 */
      err ? reject(err) : resolve(stat)
));

app.use(express.static(rootDir));

app.use("/api/:call", function(req, res) {
  proxy.web(req, res);
});

app.use(function(req, res) {
  const filePath = path.join(rootDir, req.url);
  fileExist(filePath).then(
    ()=> res.sendFile(filePath),
    ()=> fileExist(`${filePath}.html`).then(
      ()=> res.sendFile(`${filePath}.html`),
      ()=> res.sendFile(path.join(rootDir, "index.html"))
    )
  ).catch((err)=>
    /* eslint no-console: 0 */
    console.error(err)
  );
});

app.listen(PORT, function () {
  /* eslint no-console: 0 */
  console.log(`Application server started at http://localhost:${PORT}`);
});
