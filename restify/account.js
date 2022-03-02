/**
 * 2021-11-15
 * Auth + lobby RESTful API server 3차 프로토타입
 * MySQL(local)
 * localhost:3306
 *
 */

// 라이브러리
const mysql = require("mysql2");
const restify = require("restify");
const errors = require("restify-errors");

// server 생성
const server = restify.createServer({
  name: "red rest server",
  version: "1.0.0",
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.fullResponse());
server.use(restify.plugins.bodyParser());

// DB 연결
const conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "redwood",
  password: "5303aa!@",
  database: "red_db",
});

conn.connect();

function log(contents) {
  console.log("[DEBUG] CONTENTS: ", contents);
}

server.get("/account/info", function (req, res, next) {
  conn.query("select * from account;", null, function (error, result) {
    if (error) {
      next();
    } else {
      res.send({ result: result });
      next();
    }
  });
  return;
});

server.post("/account/signup", function (req, res, next) {
  if (req.body.mail && req.body.pwd && req.body.name) {
    conn.query(
      "select * from account where email = ?",
      [req.body.mail],
      function (error, result) {
        if (error) {
          next();
        } else {
          res.send({ result: result });
          next();
        }
      }
    );
  }

  return;
});

server.listen(9000, function () {
  console.log("%s started %s", server.name, server.url);
});
