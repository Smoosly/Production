"use strict";
const express = require("express");
const crypto = require("crypto");
const ejs = require("ejs");
const jwt = require("jsonwebtoken");
const secretKey = require("../config/jwt").secret;
const smtpTransport = require("../config/mailInfo");
const { USER, KIT, BREAST_TEST, BREAST_RESULT, HOME_FITTING, BRA_REVIEW, DELETED_USER, BRA_FIX } = require("../models");
const router = express.Router();
const { isAuth } = require("../middleware/isAuth");
const { unLink } = require("../middleware/unLink");
const winston = require("../winston");

const sendWelcomEmail = (email) => {
  //가입 환영 이메일
  let emailTemplete;
  let path = __dirname;
  path = path.replace("/router", "/template/signupMailTempleate.ejs");
  ejs.renderFile(path, { siteLink: "https://smoosly.com" }, (err, data) => {
    if (err) {
      return winston.error(err);
    }
    emailTemplete = data;
  });
  const mailOptions = {
    from: "스무슬리 <smoosly23@gmail.com>",
    to: email,
    subject: "Smoosly 가입을 환영합니다.",
    html: emailTemplete,
  };
  smtpTransport.sendMail(mailOptions, (err, responses) => {
    if (err) {
      return winston.error(err);
    }
    winston.debug("가입 환영 이메일 전송 성공");
    smtpTransport.close();
  });
};

//로그인
router.post("/login", async (req, res) => {
  try {
    const user = await USER.findOne({ where: { email: req.body.email, provider: "smoosly" } });
    if (!user) {
      winston.info({ success: false, message: "해당 이메일을 찾을 수 없습니다." });
      return res.json({ success: false, message: "해당 이메일을 찾을 수 없습니다." });
    }

    let dbPassword = user.password;
    let salt = user.salt;
    let hashPassword = crypto
      .createHash("sha512")
      .update(req.body.password + salt)
      .digest("hex");
    if (dbPassword !== hashPassword) {
      winston.info({ success: false, message: "비밀번호가 틀렸습니다." });
      return res.json({ success: false, message: "비밀번호가 틀렸습니다." });
    }

    const token = jwt.sign({ PK_ID: user.PK_ID, role: user.role }, secretKey, { expiresIn: "1d" });
    await user.update({ token: token });

    // res.cookie("user", user.PK_ID, { overwrite: true });
    // res.cookie("auth", token, { overwrite: true });
    winston.info({ success: true, message: "로그인 되었습니다.", userData: { PK_ID: user.PK_ID, token: token } });
    return res.json({ success: true, message: "로그인 되었습니다.", userData: { PK_ID: user.PK_ID, token: token } });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: "로그인 실패", err });
  }
});

//회원가입
router.post("/signup", async (req, res) => {
  let userInfo = {};
  Object.assign(userInfo, req.body);

  const PK_ID = Math.random().toString(36).slice(2, 12);
  const email = req.body.email;

  //비밀번호 암호화 후 userInfo에 넣기
  const salt = Math.round(new Date().valueOf() * Math.random());
  const hashPassword = crypto
    .createHash("sha512")
    .update(userInfo.password + salt)
    .digest("hex");
  userInfo.password = hashPassword;
  userInfo.salt = salt;
  userInfo.PK_ID = PK_ID;
  delete userInfo.email;

  try {
    const [user, created] = await USER.findOrCreate({
      where: { email: email, provider: "smoosly" },
      defaults: userInfo,
    });
    if (created) {
      winston.info({ success: true, message: `${userInfo.username} 님이 가입되었습니다.` });
      return res.json({ success: true, message: `${userInfo.username} 님이 가입되었습니다.` });
    }
    winston.info({ success: false, message: "이미 가입된 메일입니다." });
    return res.json({ success: false, message: "이미 가입된 메일입니다." });
  } catch (err) {
    winston.error(err);
    res.json({ success: false, message: "회원가입에 실패하였습니다.", err });
  }

  // sendWelcomEmail(req.body.email);
});

router.get("/logout", isAuth, async (req, res) => {
  try {
    await req.user.update({ token: null });
    winston.info({ success: true, message: "로그아웃 되었습니다." });
    return res.json({ success: true, message: "로그아웃 되었습니다." });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: "로그아웃 실패", err });
  }
});

router.get("/getUserInfo", isAuth, async (req, res) => {
  try {
    const user = await USER.findOne({
      where: { PK_ID: req.cookies.user },
      attributes: ["username", "email", "role", "phone", "birthday", "agreePromotion", "postcode", "address", "extraAddress", "message"],
    });
    if (user) {
      winston.info({ success: true, message: "회원 정보 불러오기 성공", userInfo: user });
      return res.json({ success: true, message: "회원 정보 불러오기 성공", userInfo: user });
    }
    winston.info({ success: false, message: "회원 정보가 없습니다." });
    res.json({ success: false, message: "회원 정보가 없습니다." });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: "회원 정보 불러오기 실패", err });
  }
});

router.get("/getState", isAuth, async (req, res) => {
  // 1. **첫 방문**
  // STEP 1 가슴측정 키트 신청 → [키트 배송 신청]으로 이동
  try {
    const kit = await KIT.findOne({ where: { PK_ID: req.cookies.user } });
    if (!kit) {
      winston.debug("Main state -> 0");
      return res.json({ success: true, state: 0, step: 1, content: "가슴측정 키트 신청" });
    }
    // 2. **키트 신청 완료**
    // STEP 2 가슴 테스트 →  [키트 사용법 페이지]  or [설문 페이지]로 이동
    // 즉, 유저 상태에 따라 페이지 위치 달라짐
    // - 1) 키트 업로드 전 → [키트 사용법 페이지]로 이동
    // - 2) 키트 업로드 후 ~ 설문 완료 전 → [설문 페이지]로 이동
    const breastResult = await BREAST_RESULT.findOne({ where: { PK_ID: req.cookies.user } });
    const breastTest = await BREAST_TEST.findOne({ where: { PK_ID: req.cookies.user }, attributes: ["STEP"] });
    if (!breastResult && (!breastTest || (breastTest && breastTest.STEP < 2))) {
      winston.debug("Main state -> 1");
      return res.json({ success: true, state: 1, step: 2, content: "키트 사용하기" });
    } else if (!breastResult && breastTest && breastTest.STEP < 100) {
      winston.debug("Main state -> 2");
      return res.json({ success: true, state: 2, step: 2, content: "가슴 테스트", page: breastTest.STEP === 15 ? breastTest.STEP : breastTest.STEP + 1 });
    }

    // 3. **키트 업로드& 설문 응답 모두 완료**
    // STEP 2 가슴 테스트 결과 확인 →  [가슴 결과 페이지]로 이동
    const braFix = await BRA_FIX.findOne({ where: { PK_ID: req.cookies.user }, attributes: ["NUM", "CHECK_ALL", "CHECK_ADMIN"] });
    BREAST_TEST.update({ STEP: 100 }, { where: { PK_ID: req.cookies.user } });
    if (breastResult && (!braFix || braFix.CHECK_ADMIN !== 2)) {
      winston.debug("Main state -> 3");
      return res.json({ success: true, state: 3, step: 2, content: "가슴 테스트 결과 확인" });
    }

    // 4. **추천된 브라 DB 등록 완료**
    // STEP 3 추천브라 확인 →  [추천브라 미리보기 페이지]로 이동
    if (braFix && braFix.NUM > braFix.CHECK_ALL) {
      winston.debug("Main state -> 4");
      return res.json({ success: true, state: 4, step: 3, content: "추천브라 확인" });
    }

    // 5. **추천 브라 미리보기 페이지 모두 한번씩 클릭 완료**
    // STEP 4 홈 피팅 서비스 신청 →  [추천브라 미리보기 페이지]로 이동
    const homeFitting = await HOME_FITTING.findOne({ where: { PK_ID: req.cookies.user }, attributes: ["state"] });
    if (braFix && braFix.NUM === braFix.CHECK_ALL && !homeFitting) {
      winston.debug("Main state -> 5");
      return res.json({ success: true, state: 5, step: 4, content: "홈 피팅 서비스 신청" });
    }

    // 6. **홈 피팅 서비스 배송 완료**
    // 리뷰 쓰기 → [리뷰 페이지]로 이동
    const braReview = await BRA_REVIEW.findAll({ where: { PK_ID: req.cookies.user }, attributes: ["PURCHASE"] });
    if (homeFitting && braReview && braFix && braReview.length < braFix.NUM) {
      winston.debug("Main state -> 6");
      return res.json({ success: true, state: 6, step: 4, content: "리뷰 쓰기" });
    }

    // 7. **리뷰 작성 완료**
    // 구매하기 → [추천 브라 미리보기 페이지]로 이동
    let PURCHASE = false;
    braReview.forEach((review) => {
      if (review.PURCHASE === 1) {
        PURCHASE = true;
      }
    });
    if (braFix && braFix.NUM === braReview.length && PURCHASE === false) {
      winston.debug("Main state -> 7");
      return res.json({ success: true, state: 7, step: 4, content: "구매하기" });
    }

    if (braFix && braFix.NUM === braReview.length && PURCHASE === true) {
      winston.debug("Main state -> 8");
      return res.json({ success: true, state: 8, step: 4, content: "추천 브라 구매 완료" });
    }

    winston.debug("Main state -> 0");
    return res.json({ success: true, state: 0, step: 1, content: "가슴측정 키트 신청", noCheck: "noCheck" });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: "회원 상태 가져오기 실패", err });
  }
});

router.post("/editUserInfo", isAuth, async (req, res) => {
  try {
    const user = await USER.update(
      {
        username: req.body.username,
        phone: req.body.phone,
        birthday: req.body.birthday,
        agreePromotion: req.body.agreePromotion,
        postcode: req.body.postcode,
        address: req.body.address,
        extraAddress: req.body.extraAddress,
        message: req.body.message,
      },
      { where: { PK_ID: req.body.PK_ID } }
    );
    winston.info({ success: true, message: "회원 정보가 수정되었습니다." });
    return res.json({ success: true, message: "회원 정보가 수정되었습니다." });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: "회원 정보가 수정에 실패하였습니다.", err });
  }
});

router.delete("/delete", isAuth, unLink, async (req, res) => {
  const PK_ID = req.cookies.user;
  try {
    const user = await USER.findOne({ where: { PK_ID: PK_ID } });
    const userData = user.dataValues;
    delete userData.id;
    await DELETED_USER.create(userData);
    await USER.destroy({ where: { PK_ID: PK_ID } });
    winston.info({ success: true, message: "회원탈퇴 되었습니다." });
    return res.json({ success: true, message: "회원탈퇴 되었습니다." });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: "회원 탈퇴 실패", err });
  }
});

//로그인 안한상태에서
router.post("/checkUser", async (req, res) => {
  try {
    const users = await USER.findAll({ where: { email: req.body.email }, attributes: ["provider"] });
    if (users.length === 0) {
      winston.info({ success: true, message: "해당 이메일로 가입된 정보가 없습니다.", provider: null });
      return res.json({ success: true, message: "해당 이메일로 가입된 정보가 없습니다.", provider: null });
    }
    if (users.length === 1 && users[0].provider !== "smoosly") {
      const provider = users[0].provider === "kakao" ? "카카오" : users[0].provider === "naver" ? "네이버" : "구글";
      winston.info({ success: true, message: `${provider} 소셜 가입된 계정입니다.`, provider: users[0].provider });
      return res.json({ success: true, message: `${provider} 소셜 가입된 계정입니다.`, provider: users[0].provider });
    }
    users.forEach((user) => {
      if (user.provider === "smoosly") {
        winston.info({ success: true, message: "스무슬리 가입 계정입니다.", provider: user.provider });
        return res.json({ success: true, message: "스무슬리 가입 계정입니다.", provider: user.provider });
      }
    });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: "유저 확인 실패", err });
  }
});

module.exports = router;
