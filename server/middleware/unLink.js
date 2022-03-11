const winston = require("../winston");
const axios = require("axios");
const util = require("util");
const naver = require("../config/naver");
const google = require("../config/google");

let unLink = (req, res, next) => {
  try {
    winston.debug("unLink");
    winston.debug(util.inspect(req.cookies, false, null, true));
    if (req.user.provider === "kakao") {
      axios
        .post(
          "https://kapi.kakao.com/v1/user/unlink",
          {},
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${req.cookies.auth}`,
            },
          }
        )
        .then((result) => {
          winston.debug(util.inspect(result.data, false, null, true));
          return next();
        })
        .catch(console.log);
    } else if (req.user.provider === "naver") {
      axios
        .post(`https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${naver.clientID}&client_secret=${naver.clientSecret}&access_token=${req.cookies.auth}&service_provider=NAVER`)
        .then((result) => {
          winston.debug(util.inspect(result.data, false, null, true));
          return next();
        })
        .catch(console.log);

    } else if (req.user.provider === "google") {

      return next();
    }
    return next();
  } catch (err) {
    winston.error(err);
  }
};

module.exports = { unLink };
