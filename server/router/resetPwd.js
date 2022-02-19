"use strict";
const express = require("express");
const crypto = require("crypto");
const ejs = require("ejs");
const jwt = require("jsonwebtoken");
const secretKey = require("../config/jwt").secret;
const smtpTransport = require("../config/mailInfo");
const { USER } = require("../models");
const router = express.Router();
const winston = require("../winston");

router.post("/sendEmail", async (req, res) => {
  //토큰 생성
  const token = jwt.sign({ email: req.body.email }, secretKey, { expiresIn: "1d" });

  try {
    await USER.update({ token: token }, { where: { email: req.body.email, provider: "smoosly" } });

    let emailTemplete;
    const changePwdlink = `https://smoosly.com/resetpassword?token=${token}`;

    let path = __dirname;
    path = path.replace("/router", "/template/changePwdTemplate.ejs");

    ejs.renderFile(path, { changePwdlink: changePwdlink }, (err, data) => {
      if (err) {
        winston.error(err);
      }
      emailTemplete = data;
    });

    const mailOptions = {
      from: "스무슬리 <smoosly23@gmail.com>",
      to: req.body.email,
      subject: "Smoosly 비밀번호 변경 요청",
      html: emailTemplete,
    };

    smtpTransport.sendMail(mailOptions, (err, responses) => {
      if (err) {
        winston.error(err);
        return res.json({ success: false, message: "비밀번호 변경메일 전송에 실패하였습니다.", err });
      }
      winston.info({ success: true, message: "비밀번호 변경메일이 전송되었습니다." });
      res.json({ success: true, message: "비밀번호 변경메일이 전송되었습니다." });
      smtpTransport.close();
    });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: "비밀번호 변경메일 전송에 실패하였습니다.", err });
  }
});

router.post("/setNew", async (req, res) => {
  try {
    const user = await USER.findOne({ where: { token: req.body.token } });
    if (!user) {
      winston.info({ success: false, message: "일치하는 유저가 없습니다. 비밀번호 변경 메일 전송을 다시 요청하세요." });
      return res.json({ success: false, message: "일치하는 유저가 없습니다. 비밀번호 변경 메일 전송을 다시 요청하세요." });
    }
    jwt.verify(req.body.token, secretKey, (err, decoded) => {
      if (err) {
        winston.error(err);
        return res.json({ success: false, message: "토큰 확인 실패", err });
      }
      winston.debug(decoded);
      if (decoded.email !== user.email) {
        winston.error(err);
        return res.json({ success: false, message: "인증에 실패했습니다. 비밀번호 변경 메일 전송을 다시 요청하세요." });
      }
    });
    //비밀번호 암호화
    const salt = user.salt;
    const hashPassword = crypto
      .createHash("sha512")
      .update(req.body.newPassword + salt)
      .digest("hex");
    user.update({ password: hashPassword });
    winston.info({ success: true, message: "비밀번호가 변경되었습니다." });
    return res.json({ success: true, message: "비밀번호가 변경되었습니다." });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: "인증에 실패했습니다. 비밀번호 변경 메일 전송을 다시 요청하세요.", err });
  }
});

module.exports = router;
