"use strict";
const express = require("express");
const multer = require("multer");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const util = require("util");
const router = express.Router();
const winston = require("../winston");
const { sequelize, KIT, USER, BREAST_TEST } = require("../models");

const { isAuth } = require("../middleware/isAuth");
router.use(isAuth);

let Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "KitUploads/");
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.replace(path.extname(file.originalname), "");
    cb(null, `${filename}_${formatDate()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: Storage }).fields([
  { name: "left", maxCount: 1 },
  { name: "right", maxCount: 1 },
  { name: "data", maxCount: 1 },
]);

/* ==================== Img ==================== */
const isValidImg = async (leftImg, rightImg) => {
  return new Promise(async (resolve, reject) => {
    const data = {
      type: 0, // 가슴키트
      leftImgPath: leftImg,
      rightImgPath: rightImg,
    };
    //Flask server에 요청
    winston.debug(util.inspect(data, false, null, true));
    const result = await axios.post("http://localhost:5000/isKitImgValid", data);
    winston.debug(util.inspect(result, false, null, true));
    if (!result) {
      resolve({ success: false, message: "재업로드해주세요" });
    }
    if (result.data.success === "yes") {
      resolve({ success: true, message: "이미지 업로드 성공" });
    } else {
      const errCode = Number(result.data.error);
      winston.debug(errCode);
      let errMessage = "";
      switch (errCode) {
        case 0:
          errMessage = "박스 4개가 제대로 보이지 않습니다, 4개가 모두 보이도록 사진을 재촬영해주세요";
          break;
        case 1:
          errMessage = "사진이 위아래로 뒤집힌 것 같습니다. 사진의 방향을 다시 확인해주세요.";
          break;
        case 2:
          errMessage = "가슴 안쪽 길이 박스가 훼손되었거나 제대로 촬영되지 않은 것 같습니다. 혹시 테이프를 박스 선에 너무 가깝게 붙인 건 아니신가요? 확인 후 재촬영해주세요.";
          break;
        case 3:
          errMessage = "가슴 아래쪽 길이 박스가 훼손되었거나 제대로 촬영되지 않은 것 같습니다. 혹시 테이프를 박스 선에 너무 가깝게 붙인 건 아니신가요? 확인 후 재촬영해주세요.";
          break;
        case 4:
          errMessage = "가슴 밑선 모양 박스가 훼손되었거나 제대로 촬영되지 않은 것 같습니다. 혹시 철사를 박스 선에 너무 가깝게 붙인 건 아니신가요? 확인 후 재촬영해주세요.";
          break;
        case 5:
          errMessage = "겨드랑이쪽 길이 박스가 훼손되었거나 제대로 촬영되지 않은 것 같습니다. 혹시 테이프를 박스 선에 너무 가깝게 붙인 건 아니신가요? 확인 후 재촬영해주세요.";
          break;
        case 6:
          errMessage = "가슴 안쪽 길이 박스의 테이프가 인식되지 않습니다. 혹시 테이프를 박스 선에 너무 가깝게 붙인 건 아니신가요? 확인 후 재촬영해주세요.";
          break;
        case 7:
          errMessage = "가슴 아래쪽 길이 박스의 테이프가 인식되지 않습니다. 혹시 테이프를 박스 선에 너무 가깝게 붙인 건 아니신가요? 확인 후 재촬영해주세요.";
          break;
        case 8:
          errMessage = "밑선모양 박스의 철사가 인식되지 않습니다. 혹시 철사를 박스 선에 너무 가깝게 붙인 건 아니신가요? 확인 후 재촬영해주세요.";
          break;
        case 9:
          errMessage = "겨드랑이쪽 길이 박스의 테이프가 인식되지 않습니다. 혹시 테이프를 박스 선에 너무 가깝게 붙인 건 아니신가요? 확인 후 재촬영해주세요.";
          break;
        case 10:
          errMessage = "이미지 경로가 존재하지 않습니다. 재시도해주세요.";
          break;
        default:
          errMessage = "오류 원인 파악이 불가합니다. 재시도해주세요.";
          break;
      }
      resolve({ success: false, message: errMessage });
    }
  });
};

const formatDate = () => {
  let now = new Date();
  let month = now.getMonth() + 1 >= 10 ? `${now.getMonth() + 1}` : `0${now.getMonth() + 1}`;
  let day = now.getDate() >= 10 ? `${now.getDate()}` : `0${now.getDate()}`;
  let hour = now.getHours() >= 10 ? now.getHours() : "0" + now.getHours();
  let minute = now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes();
  let second = now.getSeconds() >= 10 ? now.getSeconds() : "0" + now.getSeconds();
  let formatted_date = `${now.getFullYear()}${month}${day}${hour}${minute}${second}`;
  return formatted_date;
};

router.post("/img/upload", async (req, res) => {
  winston.debug("---> Image Upload Start");
  upload(req, res, async (err) => {
    if (err) {
      winston.error(err);
      return res.json({ success: false, message: "이미지 업로드 실패", err });
    }
    if (!req.files) {
      winston.info({ success: false, message: "이미지가 없습니다." });
      return res.json({ success: false, message: "이미지가 없습니다." });
    }

    const PK_ID = JSON.parse(req.body.data).PK_ID;
    const leftImg = req.files["left"] && req.files["left"][0];
    const rightImg = req.files["right"] && req.files["right"][0];

    try {
      //BREAST_TEST 생성하고 Progress 를 1단계 성공으로 설정하기
      const test = await BREAST_TEST.findOrCreate({
        where: { PK_ID: PK_ID },
        defaults: {
          PK_ID: PK_ID,
          WHERE_BT: leftImg && rightImg ? 2 : leftImg ? 0 : 1,
          STEP: 0,
        },
      });
      const data = test[0];
      const created = test[1];
      winston.debug(util.inspect(data.dataValues, false, null, true));
      winston.debug(created, "true->새로만들어짐, false->update");

      //왼쪽 이미지
      if (leftImg && !rightImg) {
        const test = await BREAST_TEST.findOne({ where: { PK_ID: PK_ID } });
        let leftImgPath = path.join(__dirname, `../../KitUploads/${leftImg.filename}`);

        // Flask 서버에 요청하기
        const flask = await isValidImg(leftImg.filename, "");
        winston.debug("left flask : ", flask);
        if (!flask.success) {
          fs.unlinkSync(leftImgPath);
          await BREAST_TEST.destroy({ where: { PK_ID: PK_ID } });
          winston.info({ success: false, message: flask.message, leftImgValid: false });
          return res.json({ success: false, message: flask.message, leftImgValid: false });
        }
        //옛날 이미지 지우기
        const oldLeftImgPath = test && test.LEFT_IMG_PATH && path.join(__dirname, `../../KitUploads/${test.LEFT_IMG_PATH}`);
        const oldLeftLowerImgPath = test && test.LEFT_IMG_PATH && path.join(__dirname, `../../LowerShapes/${test.LEFT_IMG_PATH}`);
        try {
          oldLeftImgPath && fs.unlinkSync(oldLeftImgPath);
          oldLeftLowerImgPath && fs.unlinkSync(oldLeftLowerImgPath);
        } catch (err) {
          winston.error(err);
        }
      }
      //오른쪽 이미지
      if (!leftImg && rightImg) {
        const test = await BREAST_TEST.findOne({ where: { PK_ID: PK_ID } });
        let rightImgPath = path.join(__dirname, `../../KitUploads/${rightImg.path}`);

        //Flask 서버에 요청하기
        const flask = await isValidImg("", rightImg.filename);
        winston.debug("right flask : ", flask);
        if (!flask.success) {
          fs.unlinkSync(rightImgPath);
          await BREAST_TEST.destroy({ where: { PK_ID: PK_ID } });
          winston.info({ success: false, message: flask.message, rightImgValid: false });
          return res.json({ success: false, message: flask.message, rightImgValid: false });
        }

        //옛날 이미지 지우기
        const oldRightImgPath = test && test.RIGHT_IMG_PATH && path.join(__dirname, `../../KitUploads/${test.RIGHT_IMG_PATH}`);
        const oldRightLowerImgPath = test && test.RIGHT_IMG_PATH && path.join(__dirname, `../../LowerShapes/${test.RIGHT_IMG_PATH}`);
        try {
          oldRightImgPath && fs.unlinkSync(oldRightImgPath);
          oldRightLowerImgPath && fs.unlinkSync(oldRightLowerImgPath);
        } catch (err) {
          winston.error(err);
        }
      }
      if (leftImg && rightImg) {
        const test = await BREAST_TEST.findOne({ where: { PK_ID: PK_ID } });
        const leftImgPath = path.join(__dirname, `../../KitUploads/${leftImg.filename}`);
        const rightImgPath = path.join(__dirname, `../../KitUploads/${rightImg.filename}`);

        // Flask 서버에 요청하기
        const flask = await isValidImg(leftImg.filename, rightImg.filename);
        winston.debug("flask : ", flask);
        if (!flask.success) {
          fs.unlinkSync(leftImgPath);
          fs.unlinkSync(rightImgPath);
          await BREAST_TEST.destroy({ where: { PK_ID: PK_ID } });
          winston.info({ success: false, message: flask.message, leftImgValid: false, rightImgValid: false });
          return res.json({ success: false, message: flask.message, leftImgValid: false, rightImgValid: false });
        }

        //옛날 이미지 지우기
        const oldLeftImgPath = test && test.LEFT_IMG_PATH && path.join(__dirname, `../../KitUploads/${test.LEFT_IMG_PATH}`);
        const oldLeftLowerImgPath = test && test.LEFT_IMG_PATH && path.join(__dirname, `../../LowerShapes/${test.LEFT_IMG_PATH}`);
        const oldRightImgPath = test && test.RIGHT_IMG_PATH && path.join(__dirname, `../../KitUploads/${test.RIGHT_IMG_PATH}`);
        const oldRightLowerImgPath = test && test.RIGHT_IMG_PATH && path.join(__dirname, `../../LowerShapes/${test.RIGHT_IMG_PATH}`);
        try {
          oldLeftImgPath && fs.unlinkSync(oldLeftImgPath);
          oldLeftLowerImgPath && fs.unlinkSync(oldLeftLowerImgPath);
          oldRightImgPath && fs.unlinkSync(oldRightImgPath);
          oldRightLowerImgPath && fs.unlinkSync(oldRightLowerImgPath);
        } catch (err) {
          winston.error(err);
        }
      }

      winston.debug("업로드 성공");
      const result = await BREAST_TEST.findOne({ where: { PK_ID: PK_ID } });
      if (result) {
        // 원래 있었다면 경로 바꿔주기
        result.update({ STEP: 1 });
        leftImg && result.update({ LEFT_IMG_PATH: leftImg.filename });
        rightImg && result.update({ RIGHT_IMG_PATH: rightImg.filename });
      }

      winston.info({ success: true, message: "이미지 업로드 성공" });
      return res.json({ success: true, message: "이미지 업로드 성공" });
    } catch (err) {
      winston.error(err);
      return res.json({ success: false, message: "이미지 업로드 실패", err });
    }
  });
});

router.get("/getImg/:where", async (req, res) => {
  const where = req.params.where;
  const test = await BREAST_TEST.findOne({ where: { PK_ID: req.cookies.user } });
  if (!test) {
    res.end();
    return;
  }
  const newLeftImgPath = test.LEFT_IMG_PATH && path.join(__dirname, `../../KitUploads/${test.LEFT_IMG_PATH}`);
  const newRightImgPath = test.RIGHT_IMG_PATH && path.join(__dirname, `../../KitUploads/${test.RIGHT_IMG_PATH}`);
  newLeftImgPath && where === "left" && res.sendFile(newLeftImgPath);
  newRightImgPath && where === "right" && res.sendFile(newRightImgPath);
});

router.get("/checkImg", async (req, res) => {
  try {
    const test = await BREAST_TEST.findOne({
      where: { PK_ID: req.cookies.user },
      attributes: ["LEFT_IMG_PATH", "RIGHT_IMG_PATH"],
    });
    if (test) {
      //왼쪽만 0, 오른쪽만 1, 둘다 2
      if (test.LEFT_IMG_PATH) {
        if (test.RIGHT_IMG_PATH) {
          return res.json({ success: true, where: 2 });
        }
        return res.json({ success: true, where: 0 });
      }
      if (test.RIGHT_IMG_PATH) {
        return res.json({ success: true, where: 1 });
      }
    }
    winston.info({ success: false, message: "가슴 테스트 내역 없음" });
    return res.json({ success: false, message: "가슴 테스트 내역 없음" });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: "키트 이미지 체크 실패", err });
  }
});

router.post("/request", async (req, res) => {
  // 체험단 여부 판별하기
  const user = await USER.findOne({ where: { PK_ID: req.body.PK_ID }, attributes: ["role"] });
  const kit = await KIT.findOne({ where: { PK_ID: req.body.PK_ID } });
  if (user.role === "3MVP" && kit) {
    winston.info({ success: false, message: "이미 키트 신청 내역이 있는지 확인하세요." });
    return res.json({ success: false, message: "이미 키트 신청 내역이 있는지 확인하세요." });
  } else {
    await USER.update(
      { phone: req.body.phone, postcode: req.body.postcode, address: req.body.address, extraAddress: req.body.extraAddress },
      { where: { PK_ID: req.body.PK_ID } }
    );
    // const coupon = await COUPON.findOne({ where: { CODE: req.body.couponCode } });
    // if (!coupon) {
    //   return res.json({ success: false, message: "존재하지 않는 쿠폰번호입니다." });
    // }
    // if (coupon.USED) {
    //   return res.json({ success: false, message: "이미 등록된 쿠폰번호입니다." });
    // }
    let kitReqInfo = {};
    Object.assign(kitReqInfo, req.body);
    delete kitReqInfo.PK_ID;
    kitReqInfo.state = 1;
    // delete kitReqInfo.couponCode;
    try {
      const [kit, created] = await KIT.findOrCreate({
        where: { PK_ID: req.body.PK_ID },
        defaults: kitReqInfo,
      });
      if (created) {
        // await USER.update({ role: coupon.TYPE }, { where: { PK_ID: req.body.PK_ID } });
        // await coupon.update({ PK_ID: req.body.PK_ID, REGISTER_DATE: new Date(), USED: 1 });
        winston.info({ success: true, message: "키트가 성공적으로 신청되었습니다.", kit });
        return res.json({ success: true, message: "키트가 성공적으로 신청되었습니다.", kit });
      } else {
        winston.info({ success: false, message: "이미 키트 신청 내역이 있는지 확인하세요." });
        return res.json({ success: false, message: "이미 키트 신청 내역이 있는지 확인하세요." });
      }
    } catch (err) {
      winston.error(err);
      return res.json({ success: false, message: "키트 신청에 실패하였습니다.", err });
    }
  }
});

router.get("/getMyInfo", async (req, res) => {
  try {
    const kit = await KIT.findOne({
      where: { PK_ID: req.cookies.user },
      attributes: ["state", [sequelize.fn("date_format", sequelize.col("createdAt"), "%Y-%m-%d"), "createdAt"]],
    });
    if (kit) {
      winston.info({ success: true, message: "키트 배송 정보 가져오기 성공", kitInfo: kit });
      return res.json({ success: true, message: "키트 배송 정보 가져오기 성공", kitInfo: kit });
    }
    winston.info({ success: false, message: "키트 배송 신청 정보가 없습니다." });
    return res.json({ success: false, message: "키트 배송 신청 정보가 없습니다." });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: "키트 배송 정보를 가져오지 못했습니다.", err });
  }
});

module.exports = router;
