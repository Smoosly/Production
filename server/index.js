"use strict";
const express = require("express");
const router = express.Router();
const { sequelize } = require("./models");
const app = express();
const app_http = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const passport = require("passport");
const fs = require("fs");
const HTTPS = require("https");
const winston = require("./winston");

const port = 80;
const sslport = process.env.PORT || 443;
const domain = "smoosly.com";

sequelize.authenticate()
  .then(() => winston.info("Connection has been established successfully."))
  .catch((err) => winston.info("Unable to connect to the database", err));

sequelize.sync()
  .then(() => winston.info("All models were synchronized successfully."))
  .catch((err) => winston.info("Unable to sync to the database", err));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); //application/x-www-form-urlencoded
app.use(express.json()); // parse application/json

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.static(path.join(__dirname + "/KitUploads")));

app.use(passport.initialize());
// app.use(require("connect-history-api-fallback")());

app.use("/users", require("./router/users"));
app.use("/resetPwd", require("./router/resetPwd"));
app.use("/emailAuth", require("./router/emailAuth"));
app.use("/admin", require("./router/admin"));
app.use("/auth", require("./router/auth"));
app.use("/kits", require("./router/kits"));
app.use("/breastTest", require("./router/breastTest"));
app.use("/braRecommend", require("./router/braRecommend"));
app.use("/homeFitting", require("./router/homeFitting"));
app.use("/review", require("./router/review"));

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public", "index.html"));
});

try {
  const option = {
    ca: fs.readFileSync("/etc/letsencrypt/live/" + domain + "/fullchain.pem"),
    key: fs.readFileSync(path.resolve(process.cwd(), "/etc/letsencrypt/live/" + domain + "/privkey.pem"), "utf8").toString(),
    cert: fs.readFileSync(path.resolve(process.cwd(), "/etc/letsencrypt/live/" + domain + "/cert.pem"), "utf8").toString(),
  };

  HTTPS.createServer(option, app).listen(sslport, () => {
    winston.info(`*443* Example app listening at https://smoosly.com`);
    winston.info("*443* Check env_var: ", process.env.NODE_ENV, process.env.PORT);
    winston.info("*443* sslport: ", sslport);
  });
} catch (error) {
  winston.error(error);
}

// http
app_http.all("*", (req, res) => {
  winston.info("https://" + req.headers.host + req.originalUrl);
  return res.redirect("https://" + req.headers.host + req.originalUrl);
});

app_http.listen(port || 80, () => {
  winston.info(`*80* Example app listening at http://smoosly.com`);
});

module.exports = router;