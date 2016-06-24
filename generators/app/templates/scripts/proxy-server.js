const httpProxy = require("http-proxy");
const static = require("node-static");
const http = require("http");

const PORT = process.env.PROXY_PORT || 8081;
const REMOTE_PORT = process.env.PROXY_REMOTE_PORT || 8082;

const proxy = httpProxy.createProxyServer({
  target: "<%= props.remotehost %>",
  secure: false,
  bypass(req) {
    req.headers.host = "<%= props.remotehost %>";
    req.headers.referer = "<%= props.remotehost %>";
  }
}).listen(REMOTE_PORT, function () {
  console.log("Proxy remote server <%= props.remotehost %>" +
    ` started at http://localhost:${REMOTE_PORT}`);
});


const file = new static.Server("./dist");

http.createServer(function (req, res) {
  if (/^\/api\//.test(req.url)) {
    proxy.web(req, res);
  } else {
    file.serve(req, res);
  }
}).listen(PORT, function () {
  console.log(`Application server started at http://localhost:${PORT}`);
});
