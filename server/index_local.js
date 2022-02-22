"use strict";
const express = require("express");
const router = express.Router();
const { sequelize } = require("./models");
const app = express();
const port = 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const passport = require("passport");
const winston = require("./winston");

sequelize
  .authenticate()
  .then(() => winston.info("Connection has been established successfully."))
  .catch((err) => winston.error(err));

sequelize
  .sync()
  .then(() => winston.info("All models were synchronized successfully.\n"))
  .catch((err) => winston.error(err));

let whitelist = ["http://localhost:8080", "https://smoosly.com"];

let corsOptions = {
  origin: function (origin, callback) {
    var isWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
    // callback expects two parameters: error and options
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); //application/x-www-form-urlencoded
app.use(express.json()); // parse application/json

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.static(path.join(__dirname + "/KitUploads")));

app.use(passport.initialize());
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

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public", "index.html"));
});

app.listen(process.env.PORT || port, () => {
  winston.debug(`Example app listening at http://localhost:${process.env.PORT}`);
});

module.exports = router;