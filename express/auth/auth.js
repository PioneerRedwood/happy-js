// https://github.com/expresnpsjs/express/blob/master/examples/auth/index.js

"use strict";

const express = require("express");
const request = require("request");
const mysql = require("mysql");
const path = require("path");

const hash = require("pbkdf2-password")();
const session = require("express-session");

const app = (module.exports = express());

// config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // 뷰 등록

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "shhhh, very secret",
  })
);

// Session-persisted message middleware
app.use(function (req, res, next) {
  const err = req.session.error;
  const msg = req.session.success;
  delete req.session.error;
  delete req.session.success;

  res.locals.message = "";
  if (err) res.locals.message = '<p class="msg error">' + err + "</p>";
  if (msg) res.locals.message = '<p class="msg success">' + msg + "</p>";
  next();
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "redwood",
  password: "5303aa!@",
  database: "red_db"
});

// dummy database
const users = {
  red: {
    name: "red",
    salt: null,
    hash: null,
  },
};

// when you create a user, generate a salt
// and hash the password ('1234' is the pass here)
hash({ password: "1234" }, function (err, pass, salt, hash) {
  if (err) {
    console.log(err);
    throw err;
  }

  // store the salt & hash in the "db"
  // console.log(salt);
  // console.log(hash);

  users.red.salt = salt;
  users.red.hash = hash;
});

// console.log(users.red);

// Authenticate using our plain-object database of doom
function authenticate(name, pass, fn) {
  if (!module.parent) console.log("authenticating %s:%s", name, pass);
  const user = users[name];

  console.log(user);

  // query the db for the given username
  if (!user) {
    return fn(null, null);
  }

  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
    if (err) {
      return fn(err);
    }

    if (hash === user.hash) {
      return fn(null, user);
    } else {
      fn(null, null);
    }
  });
}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = "Access denied!";
    res.redirect("/login");
  }
}

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/restricted", restrict, function (req, res) {
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/movie", function (req, res) {
  // refer https://rapidapi.com/rapidapi/api/movie-database-alternative/
  const request = require("request");

  const options = {
    method: "GET",
    url: "https://movie-database-alternative.p.rapidapi.com/",
    // "mblix.com/movie/..."
    
    /* 
    GET (By Search)

    GET (BY ID or Title)
    qs(Query String)
      y: (OPTIONAL) Year of release (e.g. 2019)
      r: (OPTIONAL) The data type to return: (json, xml)
      i: (OPTIONAL) A valid IMDb ID (e.g. tt4154796)
      type: (OPTIONAL) Type of result to return: (movie, series, episode)
      plot: (OPTIONAL) Return short of full plot: (short, full)
      callback: (OPTIONAL) JSONP callback name
    */
    qs: { s: "Interstellar", r: "json", page: "1" },
    headers: {
      "X-RapidAPI-Key": "YOUR API KEY HERE",
      "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
      useQueryString: true,
    },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.render("movie", {
      response: response,
      body: body
    });
  });
});

app.get("/logout", function (req, res) {
  // destroy the user's session to log them out
  // will be re-created next request
  console.log(`user logout`);
  req.session.destroy(function () {
    res.redirect("/");
  });
});

app.get("/login", function (req, res) {
  
  res.render("login");
});

app.post("/login", function (req, res, next) {
  // console.log(req);
  // authenticate(req.body.username, req.body.password, function (err, user) {
  //   console.log(err, user);
  //   if (err) {
  //     console.log(err);
  //     return next(err);
  //   }

  //   if (user) {
  //     // Regenerate session when signing in
  //     // to prevent fixation
  //     req.session.regenerate(function () {
  //       // Store the user's primary key
  //       // in the session store to be retrieved
  //       // or in this case the entire user object
  //       req.session.user = user;
  //       req.session.success =
  //         "Authenticated as " +
  //         user.name +
  //         ' click to <a href="/logout">logout</a>. ' +
  //         ' You may now access <a href="/restricted">/restricted</a>.';
  //       res.redirect("back");
  //     });
  //   } else {
  //     req.session.error =
  //       "Authentication failed, please check your " +
  //       " username and password. " +
  //       ' (use "red" and "foobar")';
  //     res.redirect("/login");
  //   }
  // });

  connection.connect();
  console.log(req.body.username, req.body.password);

  const query = `SELECT USER_ID, USER_NAME FROM RED_USER WHERE ACCOUNT_MAIL = '${req.body.username}' AND ACCOUNT_PWD = '${req.body.password}';`
  connection.query(
    query, (error, rows, field) => {
    
      if(error) throw error;

    console.log("User info is: ", rows);

    const result = Object.values(rows);
    if( result.length > 0 ) {
      req.session.user = result[0];
      console.log(req.session.user);
      
      req.session.success =
        "Authenticated as " +
        result[0]["USER_NAME"] + 
        ' click to <a href="/logout">logout</a>. ' +
        ' You may now access <a href="/restricted">/restricted</a>.';
      res.redirect("back");
    } else {
      req.session.error =
        "Authentication failed, please check your " +
        " username and password. " +
        ' (use "red" and "foobar")';
      res.redirect("/login");
    }
  });

  connection.end();
});

if (!module.parent) {
  app.listen(8080);
  console.log("Express started on port 8080");
}
