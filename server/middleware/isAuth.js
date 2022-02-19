const jwt = require("jsonwebtoken");
const secretKey = require("../config/jwt").secret;
const { USER } = require("../models");
const winston = require("../winston");

let isAuth = async (req, res, next) => {
  const token = req.cookies.auth;
  req.token = token;
  if (!token) {
    winston.info({ success: false, message: "토큰 없음", isAuth: false });
    return res.json({ success: false, message: "토큰 없음", isAuth: false });
  }
  try {
    const user = await USER.findOne({ where: { token: token } });
    if (!user) {
      winston.info({ success: false, message: "유저 없음", isAuth: false });
      return res.json({ success: false, message: "유저 없음", isAuth: false });
    }
    req.user = user;
    if (user.provider === "smoosly") {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          winston.error(err);
          return res.json({ success: false, message: "토큰 만료됨", isAuth: false });
        }
        winston.debug("PK_ID: "+decoded.PK_ID+" role: "+decoded.role);
        if (req.cookies.user !== user.PK_ID || decoded.PK_ID !== user.PK_ID) {
          winston.info({ success: false, message: "토큰 일치 유저 없음", isAuth: false });
          return res.json({ success: false, message: "토큰 일치 유저 없음", isAuth: false });
        }
      });
    }
    return next();
  } catch (err) {
    winston.error(err);
  }
};

module.exports = { isAuth };
