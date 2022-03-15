'use strict';
const { sequelize, BRA_RECOM, BRA_FIX, KIT, BR_DETAIL, BRA_STOCK, HOME_FITTING } = require('../models');
const express = require('express');
const router = express.Router();
const slackInfo = require('../config/slack');
const winston = require('../winston');
const jasx = require('json-as-xlsx');
const Slack = require('slack-node');
const axios = require('axios');
const path = require('path');
const util = require('util');
const fs = require('fs');

const { isAuth } = require('../middleware/isAuth');
const { isAdmin } = require('../middleware/isAdmin');
router.use(isAuth);
router.use(isAdmin);

router.get('/getUserList', async (req, res) => {
  // const list = await BRA_RECOM.findAll();
  // const [list] = await sequelize.query('select Smoosly_dev.BRA_RECOM.PK_ID, Smoosly_dev.BRA_RECOM.SIZE, Smoosly_dev.BRA_RECOM.NUM, Smoosly_dev.BRA_RECOM.DECISION, Smoosly_dev.BRA_RECOM.COMPLETE, Smoosly_dev.BRA_FIX.PK_ID as "FIXED" from Smoosly_dev.BRA_RECOM left join Smoosly_dev.BRA_FIX on Smoosly_dev.BRA_RECOM.PK_ID = Smoosly_dev.BRA_FIX.PK_ID;');
  const [list] = await sequelize.query('select Smoosly.BRA_RECOM.PK_ID, Smoosly.BRA_RECOM.SIZE, Smoosly.BRA_RECOM.NUM, Smoosly.BRA_RECOM.DECISION, Smoosly.BRA_RECOM.COMPLETE, Smoosly.BRA_FIX.PK_ID as "FIXED" from Smoosly.BRA_RECOM left join Smoosly.BRA_FIX on Smoosly.BRA_RECOM.PK_ID = Smoosly.BRA_FIX.PK_ID;');
  // const braFix = await BRA_FIX.findAll();

  // winston.debug(util.inspect(list, false, null, true));
  try {
    if (!list) {
      winston.info({ success: false, message: '유저 목록 없음' });
      return res.json({ success: false, message: '유저 목록 없음' });
    }
    winston.info({ success: true, message: '유저 목록' });
    return res.json({ success: true, message: '유저 목록', list });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: '유저 목록 가져오기 실패', err });
  }
});

router.get('/getData/:PK_ID', async (req, res) => {
  const PK_ID = req.params.PK_ID;
  const breastSql = fs.readFileSync(path.resolve(__dirname, '../mySQL/testAnswer.sql')).toString();
  const dataSqlWithCode = breastSql.concat(` WHERE BREAST_TEST.PK_ID = '${req.params.PK_ID}';`);

  try {
    const [breastTest, metadata] = await sequelize.query(dataSqlWithCode);
    const braRecom = await BRA_RECOM.findOne({ where: { PK_ID: PK_ID } });

    let braDetails = [];
    for (let i = 1; i <= 10; i++) {
      const bra = await BR_DETAIL.findOne({ where: { PK_ITEM: braRecom[`PK_ITEM_${i}`], OLD_KEY: braRecom[`OLD_KEY_${i}`] } });
      braDetails = braDetails.concat(bra);
    }

    if (breastTest.length === 0) {
      winston.info({ success: false, message: '추천브라 후보 없음' });
      return res.json({ success: false, message: '추천브라 후보 없음' });
    }
    const breastTestValue = breastTest[0];
    // winston.debug(util.inspect(breastTestValue, false, null, true));
    if (breastTestValue.mINNER_LEN_L) breastTestValue.mINNER_LEN_L = Number(breastTestValue.mINNER_LEN_L.toFixed(2));
    if (breastTestValue.mOUTER_LEN_L) breastTestValue.mOUTER_LEN_L = Number(breastTestValue.mOUTER_LEN_L.toFixed(2));
    if (breastTestValue.mLOWER_LEN_L) breastTestValue.mLOWER_LEN_L = Number(breastTestValue.mLOWER_LEN_L.toFixed(2));
    if (breastTestValue.mINNER_LEN_R) breastTestValue.mINNER_LEN_R = Number(breastTestValue.mINNER_LEN_R.toFixed(2));
    if (breastTestValue.mOUTER_LEN_R) breastTestValue.mOUTER_LEN_R = Number(breastTestValue.mOUTER_LEN_R.toFixed(2));
    if (breastTestValue.mLOWER_LEN_R) breastTestValue.mLOWER_LEN_R = Number(breastTestValue.mLOWER_LEN_R.toFixed(2));

    let effect = breastTestValue.wBR_EFFECT.slice(0, -1).split(',');
    effect = effect.map((element) => {
      if (Number(element) === 0) {
        return '기능 원하지 않음';
      }
      if (Number(element) === 1) {
        return '조금 커보이기';
      }
      if (Number(element) === 10) {
        return '많이 커보이게';
      }
      if (Number(element) === 2) {
        return '조금 모아주기';
      }
      if (Number(element) === 20) {
        return '많이 모아주기';
      }
      if (Number(element) === 3) {
        return '조금 올려주기';
      }
      if (Number(element) === 30) {
        return '많이 올려주기';
      }
      if (Number(element) === 4) {
        return '받쳐주기';
      }
      if (Number(element) === 5) {
        return '작아보이기';
      }
      if (Number(element) === 6) {
        return '부유방 보정';
      }
      if (Number(element) === 7) {
        return '등살 보정';
      }
    });

    let type = breastTestValue.wTYPE.slice(0, -1).split(',');
    breastTestValue.wTYPE = type.map((element) => {
      if (Number(element) === 0) {
        return '와이어';
      }
      if (Number(element) === 1) {
        return '노와이어';
      }
      if (Number(element) === 2) {
        return '브라렛';
      }
      if (Number(element) === 3) {
        return '스포츠브라';
      }
    });

    let material = breastTestValue.wMATERIAL.slice(0, -1).split(',');
    breastTestValue.wMATERIAL = material.map((element) => {
      if (Number(element) === 0) {
        return '없음';
      }
      if (Number(element) === 1) {
        return '통기성 좋은 소재';
      }
      if (Number(element) === 2) {
        return '땀이 잘 흡수되는 소재';
      }
      if (Number(element) === 3) {
        return '심리스';
      }
      if (Number(element) === 4) {
        return '천연소재';
      }
      if (Number(element) === 5) {
        return '부드러운 소재';
      }
    });

    let design = breastTestValue.wDESIGN_CONCEPT.slice(0, -1).split(',');
    breastTestValue.wDESIGN_CONCEPT = design.map((element) => {
      if (Number(element) === 0) {
        return '상관없음';
      }
      if (Number(element) === 1) {
        return '레이스';
      }
      if (Number(element) === 2) {
        return '심플';
      }
      if (Number(element) === 3) {
        return '패션';
      }
      if (Number(element) === 4) {
        return '패턴';
      }
    });

    const breastTestResult = {
      PRICE_RANGE: breastTestValue.PRICE_RANGE, //가격 범위

      BIRTH_YEAR: breastTestValue.BIRTH_YEAR, //출생 연도
      AGE: breastTestValue.AGE, //나이(현재 연도에서 출생 연도를 뺀 값)

      mUNDER_BUST: breastTestValue.mUNDER_BUST, //밑가슴둘레
      mUPPER_BUST: breastTestValue.mUPPER_BUST, //윗가슴둘레
      SIZE: braRecom.SIZE,
      BRA_SIZE: breastTestValue.BRA_SIZE, //자주 입는 브라 사이즈

      len_left: [
        {
          mINNER_LEN_L: breastTestValue.mINNER_LEN_L !== null ? breastTestValue.mINNER_LEN_L : '결과 없음', // 왼쪽 안쪽 표면길이
          mOUTER_LEN_L: breastTestValue.mOUTER_LEN_L !== null ? breastTestValue.mOUTER_LEN_L : '결과 없음', // 왼쪽 바깥쪽 표면길이
          mLOWER_LEN_L: breastTestValue.mLOWER_LEN_L !== null ? breastTestValue.mLOWER_LEN_L : '결과 없음', // 왼쪽 아래쪽 표면길이
          mWIDTH_LC_L: breastTestValue.mWIDTH_LC_L !== null ? breastTestValue.mWIDTH_LC_L : '결과 없음',
          mVOLUME_L: breastTestValue.mVOLUME_L !== null ? breastTestValue.mVOLUME_L : '결과 없음',
          mHEIGHT_LC_L: breastTestValue.mHEIGHT_LC_L !== null ? breastTestValue.mHEIGHT_LC_L : '결과 없음',
        },
      ],
      len_right: [
        {
          mINNER_LEN_R: breastTestValue.mINNER_LEN_R !== null ? breastTestValue.mINNER_LEN_R : '결과 없음', // 오른쪽 안쪽 표면길이
          mOUTER_LEN_R: breastTestValue.mOUTER_LEN_R !== null ? breastTestValue.mOUTER_LEN_R : '결과 없음', // 오른쪽 바깥쪽 표면길이
          mLOWER_LEN_R: breastTestValue.mLOWER_LEN_R !== null ? breastTestValue.mLOWER_LEN_R : '결과 없음', // 오른쪽 아래쪽 표면길이
          mWIDTH_LC_R: breastTestValue.mWIDTH_LC_R !== null ? breastTestValue.mWIDTH_LC_R : '결과 없음',
          mVOLUME_R: breastTestValue.mVOLUME_R !== null ? breastTestValue.mVOLUME_R : '결과 없음',
          mHEIGHT_LC_R: breastTestValue.mHEIGHT_LC_R !== null ? breastTestValue.mHEIGHT_LC_R : '결과 없음',
        },
      ],

      NUM_BRATABASE: breastTestValue.NUM_BRATABASE, //브라타베이스 사진
      // 얘는 사진 자체를 불러와야 하는데 이건 내가 이미지 태그에 링크 걸어서 가져올게!!

      diff: [
        {
          DIFF_BT_GAP: breastTestValue.DIFF_BT_GAP, //가슴 사이 거리
          DIFF_BP_DIR: breastTestValue.DIFF_BP_DIR, //유두 벌어짐
          DIFF_BT_SAG: breastTestValue.DIFF_BT_SAG, //처짐 정도
          DIFF_STR: breastTestValue.DIFF_STR, //기타
        },
      ],

      type: [
        {
          TYPE_BT_SIZEDIFF: breastTestValue.TYPE_BT_SIZEDIFF, //양쪽 가슴 사이즈 차이
          // TYPE_SHOULDER: breastTestValue.TYPE_SHOULDER, //어깨
          TYPE_RIB: breastTestValue.TYPE_RIB, //흉곽
          TYPE_ACCBREAST: breastTestValue.TYPE_ACCBREAST, //부유방
          // TYPE_BT_FINISH_L: breastTestValue.TYPE_BT_FINISH_L, //왼쪽 가슴의 끝
          // TYPE_BT_FINISH_R: breastTestValue.TYPE_BT_FINISH_R, //오른쪽 가슴의 끝
          // TYPE_BT_FLESH: breastTestValue.TYPE_BT_FLESH, //가슴의 살결
        },
      ],

      want1: [
        {
          wPRESSURE: breastTestValue.wPRESSURE, //압박감 취향
          wTYPE: breastTestValue.wTYPE, //종류

          wPP: breastTestValue.wPP, //뽕브라 선호
          wBR_EFFECT: effect, //브라 원하는 기능
          wBR_EFFECT_MOST: breastTestValue.wBR_EFFECT_MOST, //브라 가장 원하는 기능
        },
      ],
      want2: [
        {
          wMATERIAL: breastTestValue.wMATERIAL, //원하는 소재
          wMATERIAL_STR: breastTestValue.wMATERIAL_STR, //원하는 소재 기타

          wDESIGN_CONCEPT: breastTestValue.wDESIGN_CONCEPT, //선호하는 디자인
          wCOLOR_TASTE: breastTestValue.wCOLOR_TASTE, //색상 취향
          wIMPORTANT: breastTestValue.wIMPORTANT, //브라에서 가장 중요한 항목
        },
      ],
    };

    const braRecomResult = {
      decision: [
        {
          SIZE: braRecom.SIZE,
          // CHECK_ALL: braRecom.CHECK_ALL,
          // H_FITTING_APPLY: braRecom.H_FITTING_APPLY,
          // GROUP_NUM: braRecom.GROUP_NUM, //edit
          NUM: braRecom.NUM, //editㄷ
          DECISION: braRecom.DECISION, //edit
          COMPLETE: braRecom.COMPLETE, //edit
        },
      ],
      bras: [
        {
          PK_ITEM: braRecom.PK_ITEM_1,
          OLD_KEY: braRecom.OLD_KEY_1,
          SIZE: braRecom.SIZE_1,
          SELECTED_COLOR: braRecom.SELECTED_COLOR_1 !== null ? braRecom.SELECTED_COLOR_1 : '',
          BREAST_SCORE: braRecom.BREAST_SCORE_1,
          EFFECT_SCORE: braRecom.EFFECT_SCORE_1,
          BRA_NAME: braDetails[0] ? braDetails[0].BRA_NAME : '',
          TAGS: braDetails[0] ? braDetails[0].TAGS.slice(0, -1).split(',') : '',
          LINK: braDetails[0] ? braDetails[0].LINK.slice(0, -1).split(',') : '',
          COLOR: braDetails[0] ? braDetails[0].COLOR.slice(0, -1).split(',') : '',
        },
        {
          PK_ITEM: braRecom.PK_ITEM_2,
          OLD_KEY: braRecom.OLD_KEY_2,
          SIZE: braRecom.SIZE_2,
          SELECTED_COLOR: braRecom.SELECTED_COLOR_2 !== null ? braRecom.SELECTED_COLOR_2 : '',
          BREAST_SCORE: braRecom.BREAST_SCORE_2,
          EFFECT_SCORE: braRecom.EFFECT_SCORE_2,
          BRA_NAME: braDetails[1] ? braDetails[1].BRA_NAME : '',
          TAGS: braDetails[1] ? braDetails[1].TAGS.slice(0, -1).split(',') : '',
          LINK: braDetails[1] ? braDetails[1].LINK.slice(0, -1).split(',') : '',
          COLOR: braDetails[1] ? braDetails[1].COLOR.slice(0, -1).split(',') : '',
        },
        {
          PK_ITEM: braRecom.PK_ITEM_3,
          OLD_KEY: braRecom.OLD_KEY_3,
          SIZE: braRecom.SIZE_3,
          SELECTED_COLOR: braRecom.SELECTED_COLOR_3 !== null ? braRecom.SELECTED_COLOR_3 : '',
          BREAST_SCORE: braRecom.BREAST_SCORE_3,
          EFFECT_SCORE: braRecom.EFFECT_SCORE_3,
          BRA_NAME: braDetails[2] ? braDetails[2].BRA_NAME : '',
          TAGS: braDetails[2] ? braDetails[2].TAGS.slice(0, -1).split(',') : '',
          LINK: braDetails[2] ? braDetails[2].LINK.slice(0, -1).split(',') : '',
          COLOR: braDetails[2] ? braDetails[2].COLOR.slice(0, -1).split(',') : '',
        },
        {
          PK_ITEM: braRecom.PK_ITEM_4,
          OLD_KEY: braRecom.OLD_KEY_4,
          SIZE: braRecom.SIZE_4,
          SELECTED_COLOR: braRecom.SELECTED_COLOR_4 !== null ? braRecom.SELECTED_COLOR_4 : '',
          BREAST_SCORE: braRecom.BREAST_SCORE_4,
          EFFECT_SCORE: braRecom.EFFECT_SCORE_4,
          BRA_NAME: braDetails[3] ? braDetails[3].BRA_NAME : '',
          TAGS: braDetails[3] ? braDetails[3].TAGS.slice(0, -1).split(',') : '',
          LINK: braDetails[3] ? braDetails[3].LINK.slice(0, -1).split(',') : '',
          COLOR: braDetails[3] ? braDetails[3].COLOR.slice(0, -1).split(',') : '',
        },
        {
          PK_ITEM: braRecom.PK_ITEM_5,
          OLD_KEY: braRecom.OLD_KEY_5,
          SIZE: braRecom.SIZE_5,
          SELECTED_COLOR: braRecom.SELECTED_COLOR_5 !== null ? braRecom.SELECTED_COLOR_5 : '',
          BREAST_SCORE: braRecom.BREAST_SCORE_5,
          EFFECT_SCORE: braRecom.EFFECT_SCORE_5,
          BRA_NAME: braDetails[4] ? braDetails[4].BRA_NAME : '',
          TAGS: braDetails[4] ? braDetails[4].TAGS.slice(0, -1).split(',') : '',
          LINK: braDetails[4] ? braDetails[4].LINK.slice(0, -1).split(',') : '',
          COLOR: braDetails[4] ? braDetails[4].COLOR.slice(0, -1).split(',') : '',
        },
        {
          PK_ITEM: braRecom.PK_ITEM_6,
          OLD_KEY: braRecom.OLD_KEY_6,
          SIZE: braRecom.SIZE_6,
          SELECTED_COLOR: braRecom.SELECTED_COLOR_6 !== null ? braRecom.SELECTED_COLOR_6 : '',
          BREAST_SCORE: braRecom.BREAST_SCORE_6,
          EFFECT_SCORE: braRecom.EFFECT_SCORE_6,
          BRA_NAME: braDetails[5] ? braDetails[5].BRA_NAME : '',
          TAGS: braDetails[5] ? braDetails[5].TAGS.slice(0, -1).split(',') : '',
          LINK: braDetails[5] ? braDetails[5].LINK.slice(0, -1).split(',') : '',
          COLOR: braDetails[5] ? braDetails[5].COLOR.slice(0, -1).split(',') : '',
        },
        {
          PK_ITEM: braRecom.PK_ITEM_7,
          OLD_KEY: braRecom.OLD_KEY_7,
          SIZE: braRecom.SIZE_7,
          SELECTED_COLOR: braRecom.SELECTED_COLOR_7 !== null ? braRecom.SELECTED_COLOR_7 : '',
          BREAST_SCORE: braRecom.BREAST_SCORE_7,
          EFFECT_SCORE: braRecom.EFFECT_SCORE_7,
          BRA_NAME: braDetails[6] ? braDetails[6].BRA_NAME : '',
          TAGS: braDetails[6] ? braDetails[6].TAGS.slice(0, -1).split(',') : '',
          LINK: braDetails[6] ? braDetails[6].LINK.slice(0, -1).split(',') : '',
          COLOR: braDetails[6] ? braDetails[6].COLOR.slice(0, -1).split(',') : '',
        },
        {
          PK_ITEM: braRecom.PK_ITEM_8,
          OLD_KEY: braRecom.OLD_KEY_8,
          SIZE: braRecom.SIZE_8,
          SELECTED_COLOR: braRecom.SELECTED_COLOR_8 !== null ? braRecom.SELECTED_COLOR_8 : '',
          BREAST_SCORE: braRecom.BREAST_SCORE_8,
          EFFECT_SCORE: braRecom.EFFECT_SCORE_8,
          BRA_NAME: braDetails[7] ? braDetails[7].BRA_NAME : '',
          TAGS: braDetails[7] ? braDetails[7].TAGS.slice(0, -1).split(',') : '',
          LINK: braDetails[7] ? braDetails[7].LINK.slice(0, -1).split(',') : '',
          COLOR: braDetails[7] ? braDetails[7].COLOR.slice(0, -1).split(',') : '',
        },
        {
          PK_ITEM: braRecom.PK_ITEM_9,
          OLD_KEY: braRecom.OLD_KEY_9,
          SIZE: braRecom.SIZE_9,
          SELECTED_COLOR: braRecom.SELECTED_COLOR_9 !== null ? braRecom.SELECTED_COLOR_9 : '',
          BREAST_SCORE: braRecom.BREAST_SCORE_9,
          EFFECT_SCORE: braRecom.EFFECT_SCORE_9,
          BRA_NAME: braDetails[8] ? braDetails[8].BRA_NAME : '',
          TAGS: braDetails[8] ? braDetails[8].TAGS.slice(0, -1).split(',') : '',
          LINK: braDetails[8] ? braDetails[8].LINK.slice(0, -1).split(',') : '',
          COLOR: braDetails[8] ? braDetails[8].COLOR.slice(0, -1).split(',') : '',
        },
        {
          PK_ITEM: braRecom.PK_ITEM_10,
          OLD_KEY: braRecom.OLD_KEY_10,
          SIZE: braRecom.SIZE_10,
          SELECTED_COLOR: braRecom.SELECTED_COLOR_10 !== null ? braRecom.SELECTED_COLOR_10 : '',
          BREAST_SCORE: braRecom.BREAST_SCORE_10,
          EFFECT_SCORE: braRecom.EFFECT_SCORE_10,
          BRA_NAME: braDetails[9] ? braDetails[9].BRA_NAME : '',
          TAGS: braDetails[9] ? braDetails[9].TAGS.slice(0, -1).split(',') : '',
          LINK: braDetails[9] ? braDetails[9].LINK.slice(0, -1).split(',') : '',
          COLOR: braDetails[9] ? braDetails[9].COLOR.slice(0, -1).split(',') : '',
        },
      ],
    };
    // winston.debug(util.inspect(breastTestResult, false, null, true));
    return res.json({
      success: true,
      message: '설문 데이터 + 추천브라 데이터 + 수정할 데이터',
      adminBreastTest: breastTestResult,
      adminBraRecom: braRecomResult,
    });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: '관리자페이지 정보 가져오기 실패', err });
  }
});

router.post('/saveTemp/:PK_ID', async (req, res) => {
  // winston.debug(util.inspect(req.body, false, null, true));
  try {
    const [updated] = await BRA_RECOM.update(req.body, { where: { PK_ID: req.params.PK_ID } });
    // winston.debug(updated);
    if (updated) {
      return res.json({ success: true, message: '임시 저장 성공' });
    }
    return res.json({ success: true, message: '임시 저장 성공(변동사항 없음)' });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: '임시 저장 실패', err });
  }
});

router.post('/saveComplete/:PK_ID', async (req, res) => {
  // winston.debug('saveComplete');
  // winston.debug(util.inspect(req.body, false, null, true));
  try {
    const [updated] = await BRA_RECOM.update(req.body, { where: { PK_ID: req.params.PK_ID } });
    if (updated) {
      return res.json({ success: true, message: '추천 브라 확정 성공' });
    }
    return res.json({ success: true, message: '추천 브라 확정 성공(변동사항 없음)' });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: '브라 추천 확정 실패', err });
  }
});

router.post('/braStockManage', async (req, res) => {
  // 재고 관리
  try {
    console.log(req.body.PK_IDs);
    const result = await axios.post('http://127.0.0.1:5000/braResult', { PK_IDs: req.body.PK_IDs });
    // winston.debug(util.inspect(result.data, false, null, true));
    if (result.data.success === 'yes') {
      return res.json({ success: true, message: '재고관리 코드 실행 성공' });
    } else {
      return res.json({ success: false, message: '재고관리 코드 실행 실패' });
    }
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: '재고관리 코드 실행 실패', err });
  }
});

router.get('/getKitInfo', async (req, res) => {
  try {
    const kits = await KIT.findAll();
    res.json({ success: true, message: '키트 DB 정보 가져오기 성공', kitInfo: kits });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: '브라 추천 일괄 확정 실패', err });
  }
});

router.put('/changeKitState/:state', async (req, res) => {
  try {
    const state = Number(req.params.state);
    const PK_IDs = req.body.PK_IDs;
    const result = await KIT.update({ state: state }, { where: { PK_ID: PK_IDs } });
    if (result) {
      winston.info({ success: true, message: '키트 배송 상태 변경 성공' });
      return res.json({ success: true, message: '키트 배송 상태 변경 성공' });
    }
    winston.info({ success: true, message: '변경 사항 없음' });
    return res.json({ success: true, message: '변경 사항 없음' });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: '키트 배송 상태 변경 실패', err });
  }
});

router.get('/getBraStockData', async (req, res) => {
  try {
    const stock = await BRA_STOCK.findAll({
      attributes: ['ID', 'PK_ITEM', 'OLD_KEY', 'PK_SIZE', 'PK_ID', 'COLOR', 'SEND_REAL', 'PROBLEM', 'NEED_WASH', 'NUM_WASH', [sequelize.fn('date_format', sequelize.col('createdAt'), '%Y-%m-%d %r'), 'createdAt'], [sequelize.fn('date_format', sequelize.col('updatedAt'), '%Y-%m-%d %r'), 'updatedAt']],
    });
    if (stock.length > 0) {
      winston.info({ success: true, message: '키트 배송 상태 변경 성공', stock });
      return res.json({ success: true, message: '키트 배송 상태 변경 성공', stock });
    }
    winston.info({ success: false, message: '데이터 없음' });
    return res.json({ success: false, message: '데이터 없음' });
  } catch (error) {
    winston.error(err);
    return res.json({ success: false, message: '재고 데이터 가져오기 실패', err });
  }
});

router.get('/getHomeFittingInfo', async (req, res) => {
  try {
    const homeFitting = await HOME_FITTING.findAll({ attributes: ['PK_ID', 'recipient', 'phone', 'postcode', [sequelize.fn('concat', sequelize.col('address'), ' ', sequelize.col('extraAddress')), 'fullAddress'], 'state', 'invoice', 'return', 'returnDate'] });
    if (homeFitting.length > 0) {
      winston.info({ success: true, message: '홈피팅 신청 데이터 가져오기 성공', homeFitting });
      return res.json({ success: true, message: '홈피팅 신청 데이터 가져오기 성공', homeFitting });
    }
    winston.info({ success: false, message: '데이터 없음' });
    return res.json({ success: false, message: '데이터 없음' });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: '홈피팅 신청 데이터 가져오기 실패', err });
  }
});

router.post('/invoice/:what', async (req, res) => {
  const slack = new Slack(slackInfo.token);
  const what = req.params.what;
  try {
    if (what === 'kit') {
      const kits = await KIT.findAll({ attributes: ['recipient', 'phone', [sequelize.fn('concat', sequelize.col('address'), ' ', sequelize.col('extraAddress')), 'fulladdress']] });
      // winston.debug(util.inspect(kits, false, null, true));
      const kitdata = kits.map((kit) => {
        return kit.dataValues;
      });
      // winston.debug(util.inspect(kitdata, false, null, true));
      const data = [
        {
          sheet: 'Info',
          columns: [
            { label: 'recipient', value: 'recipient' }, // Top level data
            { label: 'phone', value: 'phone' },
            { label: 'fulladdress', value: 'fulladdress' },
            // { label: "Age", value: (row) => row.age + " years" }, // Run functions
            // { label: "Phone", value: (row) => (row.more ? row.more.phone || "" : "") }, // Deep props
          ],
          // content: [
          //   { user: "Andrea", age: 20, more: { phone: "11111111" } },
          //   { user: "Luis", age: 21, more: { phone: "12345678" } },
          // ],
          content: kitdata,
        },
      ];

      const settings = {
        fileName: 'KitInvoices', // Name of the resulting spreadsheet
        extraLength: 3, // A bigger number means that columns will be wider
        writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
      };
      jasx(data, settings); // Will download the excel file

      const fileName = path.join(__dirname, '../../KitInvoices.xlsx');
      slack.api(
        'files.upload',
        {
          channels: slackInfo.channelId,
          file: fs.createReadStream(fileName),
          initial_comment: '키트 송장 출력용 엑셀파일입니다. :smile:',
        },
        function (err, response) {
          if (err) {
            winston.error(err);
          }
          // winston.debug(util.inspect(response, false, null, true));
        }
      );

      winston.info({ success: true, message: '키트 송장출력용 엑셀파일 생성 성공' });
      return res.json({ success: true, message: '키트 송장출력용 엑셀파일 생성 성공' });
    } else if (what === 'homeFitting') {
      const homeFitting = await HOME_FITTING.findAll({ attributes: ['PK_ID', 'recipient', 'phone', 'postcode', [sequelize.fn('concat', sequelize.col('address'), ' ', sequelize.col('extraAddress')), 'fulladdress'], 'message'] });
      const hfdata = homeFitting.map((hf) => {
        return hf.dataValues;
      });
      const hfdata_copy = Object.assign(hfdata);
      const fixhfdata = hfdata_copy.filter((element) => {
        return req.body.list.includes(element.PK_ID);
      });
      fixhfdata.map((hf) => {
        hf.category = '의류';
        hf.money = 2800;
      });
      const data = [
        {
          sheet: 'Info',
          columns: [
            { label: '주문번호', value: 'PK_ID' },
            { label: '받는사람', value: 'recipient' },
            { label: '번호', value: 'phone' },
            { label: '주소', value: 'fulladdress' },
            { label: '품목명', value: 'category' },
            { label: '기본운임', value: 'money' },
            { label: '배송메시지', value: 'message' },
          ],
          content: fixhfdata,
        },
      ];

      const settings = {
        fileName: 'HomeFittingInvoices',
        extraLength: 3,
        writeOptions: {},
      };

      jasx(data, settings);

      const fileName = path.join(__dirname, '../../HomeFittingInvoices.xlsx');
      slack.api(
        'files.upload',
        {
          channels: slackInfo.channelId,
          file: fs.createReadStream(fileName),
          initial_comment: '홈피팅 송장 출력용 엑셀파일입니다. :smile:',
        },
        function (err, response) {
          if (err) {
            winston.error(err);
          }
          // winston.debug(util.inspect(response, false, null, true));
        }
      );

      winston.info({ success: true, message: '홈피팅 송장출력용 엑셀파일 생성 성공' });
      return res.json({ success: true, message: '홈피팅 송장출력용 엑셀파일 생성 성공' });
    } else {
      winston.info({ success: false, message: '라우터를 다시 검토하세요.' });
      return res.json({ success: false, message: '라우터를 다시 검토하세요.' });
    }
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: '송장출력용 엑셀파일 생성 실패', err });
  }
});

module.exports = router;
