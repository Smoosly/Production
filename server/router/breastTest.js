"use strict";
const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const util = require("util");
const dayjs = require("dayjs");
const { survey } = require("../Survey");
const totalPageNum = Object.keys(survey).length + 1;
const { sequelize, USER, BREAST_TEST, BREAST_RESULT } = require("../models");
const winston = require("../winston");

const { isAuth } = require("../middleware/isAuth");
router.use(isAuth);

router.post("/save/:pageId", async (req, res) => {
  const PK_ID = req.body.PK_ID;
  const pageId = Number(req.params.pageId);
  try {
    const test = await BREAST_TEST.findOne({ where: { PK_ID: PK_ID } });
    if (!test) {
      winston.info({ success: false, message: "테스트 정보를 찾을 수 없습니다." });
      return res.json({ success: false, message: "테스트 정보를 찾을 수 없습니다." });
    }
    let data = {};
    Object.assign(data, req.body);
    delete data.PK_ID;

    //STEP 가 DB저장된 값보다 높아졌을 때만 저장
    if (pageId > test.STEP) {
      data.STEP = pageId;
    }
    winston.debug(util.inspect(data, false, null, true));
    await BREAST_TEST.update(data, { where: { PK_ID: PK_ID } });

    if (pageId === 15) {
      // 생일 바꾸기
      const user = await USER.findOne({ where: { PK_ID: PK_ID } });
      await user.update({
        birthday: user.birthday ? user.birthday.replace(dayjs(user.birthday).$y, req.body[survey.page15[1].column]) : `${req.body[survey.page15[1].column]}-01-01`,
        birthyear: req.body[survey.page15[1].column],
      });
    }
    winston.info({ success: true, message: "테스트 데이터 저장 성공", pageId: pageId });
    return res.json({ success: true, message: "테스트 데이터 저장 성공", pageId: pageId });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: "테스트 데이터 저장 실패", err });
  }
});

router.get("/getData/:pageId", async (req, res) => {
  const PK_ID = req.cookies.user;
  const pageId = Number(req.params.pageId);
  const this_page = "page" + pageId.toString();
  const questions = Object.values(survey[this_page]);

  try {
    const test = await BREAST_TEST.findOne({ where: { PK_ID: PK_ID } });
    if (!test) {
      winston.info({ success: false, message: "테스트 정보를 찾을 수 없습니다." });
      return res.json({ success: false, message: "테스트 정보를 찾을 수 없습니다." });
    }
    let responses = questions.map((question, idx, source) => {
      return { [question.column]: test[question.column] };
    });

    //min-max 일때만
    if (pageId === 14) {
      responses = questions.map((question, idx, source) => {
        if (question.id === 28) {
          return { [question.column[0]]: test[question.column[0]], [question.column[1]]: test[question.column[1]] };
        }
        return { [question.column]: test[question.column] };
      });
    }

    let record = {};
    for (let res of responses) record = Object.assign(record, res);
    record !== {} && res.json({ success: true, message: "테스트 데이터 가져오기 성공", record });
    record === {} && res.json({ success: true, message: "저장된 테스트 데이터 없음" });
  } catch (err) {
    winston.error(err);
    return res.json({ success: true, message: "테스트 데이터 가져오기 실패", err });
  }
});

router.get("/getProgress", (req, res) => {
  BREAST_TEST.findOne({ where: { PK_ID: req.cookies.user } })
    .then((test) => {
      if (!test) {
        return res.json({ success: false, message: "테스트 정보 없음" });
      }
      const progress = (test.STEP / totalPageNum) * 100 > 100 ? 100 : (test.STEP / totalPageNum) * 100;
      return res.json({ success: true, message: "진행상황 가져오기 성공", Progress: progress });
    })
    .catch((err) => {
      winston.error(err);
      return res.json({ success: false, message: "진행상황 가져오기 실패", err });
    });
});

router.post("/complete", async (req, res) => {
  try {
    const breastResult = await BREAST_RESULT.findAll({ where: { PK_ID: req.body.PK_ID } });
    if (breastResult.length > 0) {
      winston.info({ success: false, message: "이미 테스트 결과가 있습니다." });
      return res.json({ success: false, message: "이미 테스트 결과가 있습니다." });
    }
    const result = await axios.post("http://localhost:5000/breastResult", { PK_ID: req.body.PK_ID });
    const recommend = await axios.post("http://localhost:5000/braRecommend", { PK_ID: req.body.PK_ID });
    winston.debug("result: ", result.data);
    winston.debug("recommend: ", recommend.data);
    if (result.data.success === "yes" && recommend.data.success === "yes") {
      await BREAST_TEST.update({ STEP: 100 }, { where: { PK_ID: req.body.PK_ID } });
      winston.info({ success: true, message: "가슴 테스트 결과 처리 및 브라추천 성공" });
      return res.json({ success: true, message: "가슴 테스트 결과 처리 및 브라추천 성공" });
    }
    winston.info({ success: false, message: "가슴 테스트 결과 처리 및 브라추천 실패", error: result.data.error + " In PYTHON" });
    return res.json({ success: false, message: "가슴 테스트 결과 처리 및 브라추천 실패", error: result.data.error + " In PYTHON" });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: "가슴 테스트 결과 처리 및 브라추천 실패", err });
  }
});

router.get("/isComplete", async (req, res) => {
  try {
    const test = await BREAST_TEST.findOne({ where: { PK_ID: req.cookies.user } });
    if (!test) {
      winston.info({ success: false, message: "저장된 테스트 없음" });
      return res.json({ success: false, message: "저장된 테스트 없음" });
    }
    const result = await BREAST_RESULT.findOne({ where: { PK_ID: req.cookies.user } });
    if (!result) {
      if (test.STEP < 100) {
        winston.info({ success: true, message: "진행중인 설문이 있습니다.", isComplete: false, step: test.STEP === 15 ? test.STEP : test.STEP + 1 });
        return res.json({ success: true, message: "진행중인 설문이 있습니다.", isComplete: false, step: test.STEP === 15 ? test.STEP : test.STEP + 1 });
      }
    }
    winston.info({ success: true, message: "설문을 완료하였습니다.", isComplete: true });
    return res.json({ success: true, message: "설문을 완료하였습니다.", isComplete: true });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: "테스트 완료여부 가져오기 실패", err });
  }
});

router.get("/getResult", async (req, res) => {
  const PK_ID = req.cookies.user;
  const dataSql = fs.readFileSync(path.resolve(__dirname, "../mySQL/resultData.sql")).toString();
  const dataSqlWithCode = dataSql.concat(` WHERE BREAST_RESULT.PK_ID = '${PK_ID}';`);
  try {
    const [result, metadata] = await sequelize.query(dataSqlWithCode);
    if (result.length) {
      winston.info({ success: true, message: "테스트 결과 가져오기 성공", result });
      res.json({ success: true, message: "테스트 결과 가져오기 성공", result });
    } else {
      winston.info({ success: false, message: "테스트 결과 없음" });
      res.json({ success: false, message: "테스트 결과 없음" });
    }
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: "테스트 결과 가져오기 실패", err });
  }
});

router.get("/getLowerImg/:where", async (req, res) => {
  const where = req.params.where;
  try {
    const result = await BREAST_RESULT.findOne({ where: { PK_ID: req.cookies.user } });
    if (!result) {
      return res.end();
    }
    if (where === "left") {
      const lowerLeftImgPath = result.LEFT_LOWER_SHAPE_IMG_PATH && path.join(__dirname, `../../LowerShapes/${result.LEFT_LOWER_SHAPE_IMG_PATH}`);
      lowerLeftImgPath && res.sendFile(lowerLeftImgPath);
    }
    if (where === "right") {
      const lowerRightImgPath = result.RIGHT_LOWER_SHAPE_IMG_PATH && path.join(__dirname, `../../LowerShapes/${result.RIGHT_LOWER_SHAPE_IMG_PATH}`);
      lowerRightImgPath && res.sendFile(lowerRightImgPath);
    }
  } catch (err) {
    winston.error(err);
    return res.end();
  }
});

module.exports = router;
