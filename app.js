var express = require("express"),
  http = require("http"),
  path = require("path");

const https = require("https");
const fs = require("fs");

var static = require("serve-static");

const options = {
  key: fs.readFileSync("cert.key"),
  cert: fs.readFileSync("cert.crt"),
};

var app = express();
var router = express.Router();

app.set("port", process.env.PORT || 8080);
app.set("host", "172.16.164.84");

app.use(static(__dirname));
// app.use(express.urlencoded());
// app.use(express.json());

// app.use(function (req, res, next) {
//   console.log("첫 번째 미들웨어에서 요청을 처리함.");

//   req.user = "mike";
//   next();
// });

// app.use("/", function (req, res, next) {
//   console.log("두 번째 미들웨어에서 요청을 처리함.");

//   res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
//   res.end("<h1>Express 서버에서 " + req.user + "가 응답한 결과입니다.</h1>");
// });

router.route("/routetest").get(function (req, res) {
  res.redirect("http://www.google.com");
});
router.route("/rss").get(function (req, res) {
  console.log("rss data requested");
  var feed = "https://news.sbs.co.kr/news/headlineRssFeed.do?plink=RSSREADER";
  https.get(feed, function (httpres) {
    var rss_res = "";
    httpres.on("data", function (chunk) {
      rss_res += chunk;
    });
    httpres.on("end", function () {
      res.send(rss_res);
      console.log("rss response completed");
      res.end();
    });
  });
});
app.use("/", router);

app.use(function (req, res) {
  res.redirect("/source/jquery.html");
});

http.createServer(app).listen(app.get("port"), app.get("host"), () => {
  console.log("Express server running at" + app.get("port") + app.get("host"));
});

const PORT = 8000;
https.createServer(options, app).listen(PORT, app.get("host"), () => {
  console.log("Express HTTPS server running at" + PORT + app.get("hostname"));
});

// npm install express --save
// npm install serve-static --save
