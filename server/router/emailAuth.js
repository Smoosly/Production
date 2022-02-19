"use strict";
const express = require("express");
const ejs = require("ejs");
const smtpTransport = require("../config/mailInfo");
const router = express.Router();
const winston = require("../winston");
const { AUTH_CODE } = require("../models");

router.post("/sendEmail", async (req, res) => {
  try {
    const authNum = Math.random().toString().slice(2, 7);
    const code = await AUTH_CODE.findOne({ where: { EMAIL: req.body.email } });
    if (!code) {
      await AUTH_CODE.create({ EMAIL: req.body.email, CODE: authNum });
    } else {
      await AUTH_CODE.update({ CODE: authNum }, { where: { EMAIL: req.body.email } });
    }
    //인증번호 보내기
    let emailTemplete;
    let path = __dirname;
    path = path.replace("/router", "/template/emailAuthTemplate.ejs");
    ejs.renderFile(path, { authCode: authNum }, (err, data) => {
      if (err) {
        winston.error(err);
        return res.json({ sucess: false, message: "인증메일 발송에 실패하였습니다.", err });
      }
      emailTemplete = data;
    });
    const mailOptions = {
      from: "스무슬리 <smoosly23@gmail.com>",
      to: req.body.email,
      subject: "Smoosly 이메일 인증",
      html: emailTemplete,
    };
    smtpTransport.sendMail(mailOptions, (err, responses) => {
      if (err) {
        winston.error(err);
        return res.json({ sucess: false, message: "인증메일 발송에 실패하였습니다.", err });
      }
      smtpTransport.close();
      winston.info({ success: true, message: "인증메일이 발송되었습니다." });
      return res.json({ success: true, message: "인증메일이 발송되었습니다." });
    });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: "인증메일 발송에 실패하였습니다.", err });
  }

  setTimeout(async () => {
    winston.debug("timeout -> destoy code");
    await AUTH_CODE.destroy({ where: { EMAIL: req.body.email } });
  }, 180000); //3분 후에는 인증 불가
});

router.post("/checkAuthNum", async (req, res) => {
  const check = await AUTH_CODE.findOne({ where: { EMAIL: req.body.email } });
  if (!check) {
    winston.info({ success: false, message: "이메일 인증을 다시 시도해주세요." });
    return res.json({ success: false, message: "이메일 인증을 다시 시도해주세요." });
  }
  if (check.CODE === req.body.authNum) {
    winston.debug("success -> destoy code");
    await AUTH_CODE.destroy({ where: { EMAIL: req.body.email } });
    winston.info({ success: true, message: "이메일 인증에 성공하였습니다." });
    return res.json({ success: true, message: "이메일 인증에 성공하였습니다." });
  }
  winston.info({ success: false, message: "인증번호가 틀렸습니다." });
  res.json({ success: false, message: "인증번호가 틀렸습니다." });
});

module.exports = router;
