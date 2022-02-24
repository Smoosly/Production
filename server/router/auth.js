"use strict";
const express = require("express");
const { USER } = require("../models");
const router = express.Router();
const util = require("util");
const naver = require("../config/naver");
const kakao = require("../config/kakao");
const google = require("../config/google");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("cookie-session");
const NaverStrategy = require("passport-naver").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const winston = require("../winston");

router.use(flash());
router.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

passport.serializeUser((user, done) => {
  done(null, { user: user.dataValues.PK_ID, auth: user.dataValues.token });
});

passport.deserializeUser((user, done) => {
  USER.findOne({ where: { token: user.token } })
    .then((result) => {
      // db에서 가져온 유저데이터 결과 result
      // winston.debug('디시리얼라이즈에서 찍히는 유저',user);
      const tokenUser = { user: result, token: user.token };
      done(null, tokenUser); // req.user 에 저장된다.
    }) // 조회한 정보를 req.user에 저장한다.
    .catch((error) => done(error));
});

//kakao
passport.use(
  "kakao",
  new KakaoStrategy(
    {
      clientID: kakao.clientID,
      clientSecret: kakao.clientSecret,
      callbackURL: kakao.redirect_uri,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      winston.debug("---> Kakao auth start");
      winston.debug(util.inspect(profile, false, null, true)); // winston.debug(accessToken); // winston.debug(refreshToken);
      let userInfo = {
        username: profile.username || profile._json.properties.nickname || "사용자",
        email: profile._json.kakao_account.email,
        provider: profile.provider || "kakao",
        birthday: null,
        token: accessToken,
      };
      winston.debug(util.inspect(userInfo, false, null, true));
      try {
        const result = await USER.findOrCreate({
          where: { email: userInfo.email, provider: userInfo.provider },
          defaults: {
            PK_ID: Math.random().toString(36).slice(2, 12),
            username: userInfo.username,
            birthday: userInfo.birthday,
            token: userInfo.token,
          },
        });
        const user = result[0];
        const created = result[1];
        if (created) {
          winston.debug("---> Create instance successfully(Kakao).");
        } else {
          await user.update({ username: userInfo.username, birthday: userInfo.birthday, token: userInfo.token });
          winston.debug("---> Already Exist, Database Update(Kakao)");
        }
        done(null, user);
      } catch (err) {
        winston.error(err);
      }
    }
  )
);

router.get("/kakao", passport.authenticate("kakao", { scope: ["account_email", "profile_nickname", "birthday"] }));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "https://smoosly.com/signup",
    failureFlash: true,
  }),
  async (req, res) => {
    winston.debug("---> In callback(Kakao)");
    res.cookie("user", req.user.dataValues.PK_ID, { overwrite: true });
    res.cookie("auth", req.user.dataValues.token, { overwrite: true });
    res.redirect(302, "https://smoosly.com");
    winston.debug("---> Cookie update, Kakao Login Success");
  }
);

//naver
passport.use(
  "naver",
  new NaverStrategy(
    {
      clientID: naver.clientID,
      clientSecret: naver.clientSecret,
      callbackURL: naver.callbackURL,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      winston.debug("---> Naver auth start");
      winston.debug(util.inspect(profile, false, null, true)); // winston.debug(accessToken); // winston.debug(refreshToken);
      let userInfo = {
        username: profile._json.name || profile._json.nickname || "사용자",
        email: profile._json.email,
        provider: profile.provider || "naver",
        birthday: null,
        token: accessToken,
      };
      winston.debug(util.inspect(userInfo, false, null, true));
      try {
        const result = await USER.findOrCreate({
          where: { email: userInfo.email, provider: userInfo.provider },
          defaults: {
            PK_ID: Math.random().toString(36).slice(2, 12),
            username: userInfo.username,
            birthday: userInfo.birthday,
            token: userInfo.token,
          },
        });
        const user = result[0];
        const created = result[1];
        if (created) {
          winston.debug("---> Create instance successfully(Naver).");
        } else {
          await user.update({ username: userInfo.username, birthday: userInfo.birthday, token: userInfo.token });
          winston.debug("---> Already Exist, Database Update(Naver)");
        }
        done(null, user);
      } catch (err) {
        winston.error(err);
      }
    }
  )
);

router.get("/naver", passport.authenticate("naver", { scope: ["profile", "email"] }));

router.get(
  "/naver/callback",
  passport.authenticate("naver", {
    failureRedirect: "https://smoosly.com/signup",
    failureFlash: true,
  }),
  async (req, res) => {
    winston.debug("---> In callback(Naver)");
    res.cookie("user", req.user.dataValues.PK_ID, { overwrite: true });
    res.cookie("auth", req.user.dataValues.token, { overwrite: true });
    res.redirect(302, "https://smoosly.com");
    winston.debug("---> Cookie update, Naver Login Success");
  }
);

//google
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: google.client_id,
      clientSecret: google.client_secret,
      callbackURL: google.redirect_uri,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      winston.debug("---> Google auth start");
      winston.debug(util.inspect(profile, false, null, true)); // winston.debug(accessToken); // winston.debug(refreshToken);
      let userInfo = {
        username: profile.displayName || profile._json.name || profile.name.familyName + profile.name.givenName || profile._json.family_name + profile._json.given_name || "사용자",
        email: profile._json.email,
        provider: profile.provider || "google",
        birthday: null,
        token: accessToken,
      };
      winston.debug(util.inspect(userInfo, false, null, true));
      try {
        const result = await USER.findOrCreate({
          where: { email: userInfo.email, provider: userInfo.provider },
          defaults: {
            PK_ID: Math.random().toString(36).slice(2, 12),
            username: userInfo.username,
            birthday: userInfo.birthday,
            token: userInfo.token,
          },
        });
        const user = result[0];
        const created = result[1];
        if (created) {
          winston.debug("---> Create instance successfully(Google).");
        } else {
          await user.update({ username: userInfo.username, birthday: userInfo.birthday, token: userInfo.token });
          winston.debug("---> Already Exist, Database Update(Google)");
        }
        done(null, user);
      } catch (err) {
        winston.error(err);
      }
    }
  )
);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email", "https://www.googleapis.com/auth/plus.login"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://smoosly.com/signup",
    failureFlash: true,
  }),
  async (req, res) => {
    winston.debug("---> In callback(Google)");
    res.cookie("user", req.user.dataValues.PK_ID, { overwrite: true });
    res.cookie("auth", req.user.dataValues.token, { overwrite: true });
    res.redirect(302, "https://smoosly.com");
    winston.debug("---> Cookie update, Google Login Success");
  }
);

module.exports = router;
