"use strict";
const express = require("express");
const router = express.Router();
const util = require("util");
const { Op } = require("sequelize");
const { BRA_RECOM, BRA_REVIEW, BR_DETAIL, BRA_FIX } = require("../models");
const winston = require("../winston");

const { isAuth } = require('../middleware/isAuth');
router.use(isAuth);

router.post("/save/:braNum", async (req, res) => {
  winston.debug(util.inspect(req.body, false, null, true));
  const braNum = req.params.braNum;
  let reviewData = {};
  Object.assign(reviewData, req.body);
  // delete reviewData.PK_ID;
  delete reviewData.RANKING;
  reviewData.COMPLETE = 1;
  winston.debug(util.inspect(reviewData, false, null, true));
  try {
    const [review, created] = await BRA_REVIEW.findOrCreate({
      where: {
        PK_ID: req.cookies.user,
        RANKING: braNum,
      },
      defaults: reviewData,
    });
    if (created) {
      winston.info({ success: true, message: `${braNum}번째 브라 리뷰가 저장되었습니다.` });
      return res.json({ success: true, message: `${braNum}번째 브라 리뷰가 저장되었습니다.` });
    } else {
      winston.info({ success: false, message: "이미 작성된 리뷰가 있습니다." });
      return res.json({ success: false, message: "이미 작성된 리뷰가 있습니다." });
    }
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: "리뷰 저장 실패", err });
  }
});

router.get("/getQuestionData", async (req, res) => {
  try {
    const [braRecom] = await BRA_RECOM.findAll({
      where: { PK_ID: req.cookies.user },
      attributes: ["wBR_EFFECT"],
      limit: 1,
      order: [["createdAt", "DESC"]],
    });
    const [braFix] = await BRA_FIX.findAll({
      where: { PK_ID: req.cookies.user },
      limit: 1,
      order: [["createdAt", "DESC"]],
    });

    let braFunc = new Array(5).fill(false);
    let yesFunc = false;
    let func = braRecom.wBR_EFFECT.slice(0, -1).split(",");
    func.forEach((element) => {
      if (element[0] === "2") { 
        braFunc[0] = true;
        yesFunc = true;
      }
      if (element[0] === "3") { 
        braFunc[1] = true;
        yesFunc = true;
      }
      if (element[0] === "4") { 
        braFunc[2] = true;
        yesFunc = true;
      }
      if (element[0] === "6") { 
        braFunc[3] = true;
        yesFunc = true;
      }
      if (element[0] === "7") { 
        braFunc[4] = true;
        yesFunc = true;
      }
    });

    const fixInfo = [
      await BR_DETAIL.findOne({ where: { [Op.and]: [{ PK_ITEM: braFix.PK_SIZE_1 }, { OLD_KEY: braFix.OLD_KEY_1 }] } }),
      await BR_DETAIL.findOne({ where: { [Op.and]: [{ PK_ITEM: braFix.PK_SIZE_2 }, { OLD_KEY: braFix.OLD_KEY_2 }] } }),
      await BR_DETAIL.findOne({ where: { [Op.and]: [{ PK_ITEM: braFix.PK_SIZE_3 }, { OLD_KEY: braFix.OLD_KEY_3 }] } }),
      braFix.NUM === 4 ? await BR_DETAIL.findOne({ where: { [Op.and]: [{ PK_ITEM: braFix.PK_SIZE_4 }, { OLD_KEY: braFix.OLD_KEY_4 }] } }) : null,
    ];
    for (let i = 0; i < 4; i++) {
      if (!fixInfo[i]) {
        fixInfo[i] = await BR_DETAIL.findOne({ where: { [Op.and]: [{ PK_ITEM: braFix[`PK_ITEM_${i + 1}`] }, { OLD_KEY: braFix[`OLD_KEY_${i + 1}`] }] } });
      }
    }

    const questionData = [
      {
        pkItem: braFix.PK_ITEM_1,
        oldKey: braFix.OLD_KEY_1,
        brandName: fixInfo[0].BD_NAME,
        braName: fixInfo[0].BRA_NAME,
        recommendSize: braFix.SIZE_1.slice(0, -1).split(","),
        sizeNum: braFix.SIZE_1.slice(0, -1).split(",").length,
        hookNum: fixInfo[0].EYE,
      },
      {
        pkItem: braFix.PK_ITEM_2,
        oldKey: braFix.OLD_KEY_2,
        brandName: fixInfo[1].BD_NAME,
        braName: fixInfo[1].BRA_NAME,
        recommendSize: braFix.SIZE_2.slice(0, -1).split(","),
        sizeNum: braFix.SIZE_2.slice(0, -1).split(",").length,
        hookNum: fixInfo[1].EYE,
      },
      {
        pkItem: braFix.PK_ITEM_3,
        oldKey: braFix.OLD_KEY_3,
        brandName: fixInfo[2].BD_NAME,
        braName: fixInfo[2].BRA_NAME,
        recommendSize: braFix.SIZE_3.slice(0, -1).split(","),
        sizeNum: braFix.SIZE_3.slice(0, -1).split(",").length,
        hookNum: fixInfo[2].EYE,
      },
    ];
    if (braFix.NUM === 4) {
      questionData.push({
        pkItem: braFix.PK_ITEM_4,
        oldKey: braFix.OLD_KEY_4,
        brandName: fixInfo[3].BD_NAME,
        braName: fixInfo[3].BRA_NAME,
        recommendSize: braFix.SIZE_4.slice(0, -1).split(","),
        sizeNum: braFix.SIZE_4.slice(0, -1).split(",").length,
        hookNum: fixInfo[3].EYE,
      });
    }
    // winston.debug(util.inspect({ success: true, message: "Recommend complete", braFunc: braFunc, yesFunc: yesFunc, questionData: questionData }, false, null, true));
    return res.json({ success: true, message: "Recommend complete", braFunc: braFunc, yesFunc: yesFunc, questionData: questionData });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: "리뷰 가져오기 실패", err });
  }
});

router.get("/getReviewData", async (req, res) => {
  try {
    const review = await BRA_REVIEW.findAll({ where: { PK_ID: req.cookies.user } });
    if (review.length === 0) {
      winston.info({ success: false, message: "저장된 리뷰가 없습니다." });
      return res.json({ success: false, message: "저장된 리뷰가 없습니다." });
    }
    winston.info({ success: true, message: "리뷰 가져오기 성공", review });
    return res.json({ success: true, message: "리뷰 가져오기 성공", review });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: "리뷰 가져오기 실패", err });
  }
});

module.exports = router;
