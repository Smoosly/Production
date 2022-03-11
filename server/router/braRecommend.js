'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
const util = require('util');
const fs = require('fs');
const { Op } = require('sequelize');
const { BREAST_RESULT, BRA_RECOM, BR_DETAIL, HOME_FITTING, BRA_FIX } = require('../models');
const winston = require('../winston');

const { isAuth } = require('../middleware/isAuth');
router.use(isAuth);

router.get('/isRecom', async (req, res) => {
  try {
    const result = await BRA_RECOM.findOne({ where: { PK_ID: req.cookies.user } });
    if (!result) {
      winston.info({ success: false, message: '1차 추천 브라 결과 없음', isRecom: false, userName: req.user.username });
      return res.json({ success: false, message: '1차 추천 브라 결과 없음', isRecom: false, userName: req.user.username });
    }
    const braFix = await BRA_FIX.findOne({ where: { PK_ID: req.cookies.user } });
    // winston.debug(util.inspect(braFix, false, null, true));
    if (!braFix || braFix.CHECK_ADMIN !== 2) {
      winston.info({ success: false, message: '브라 추천이 확정되지 않았습니다.', isRecom: false, userName: req.user.username });
      return res.json({ success: false, message: '브라 추천이 확정되지 않았습니다.', isRecom: false, userName: req.user.username });
    }
    winston.info({ success: true, message: '추천된 브라가 있습니다.', isRecom: true, userName: req.user.username });
    return res.json({ success: true, message: '추천된 브라가 있습니다.', isRecom: true, userName: req.user.username });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: '브라 추천 여부 가져오기 실패', isRecom: false, userName: req.user.username, err });
  }
});

router.get('/getBraDetails', async (req, res) => {
  winston.debug('getBraDetails');
  try {
    const [braFix] = await BRA_FIX.findAll({
      where: { PK_ID: req.cookies.user },
      attributes: ['CHECK_ADMIN', 'NUM', 'PK_ITEM_1', 'OLD_KEY_1', 'SIZE_1', 'PK_SIZE_1', 'PK_ITEM_2', 'OLD_KEY_2', 'SIZE_2', 'PK_SIZE_2', 'PK_ITEM_3', 'OLD_KEY_3', 'SIZE_3', 'PK_SIZE_3', 'PK_ITEM_4', 'OLD_KEY_4', 'SIZE_4', 'PK_SIZE_4'],
      limit: 1,
      order: [['createdAt', 'ASC']],
    });

    if (!braFix || braFix.CHECK_ADMIN !== 2 || braFix.NUM < 3) {
      winston.debug(util.inspect({ success: false, message: '추천브라가 선정되지 않았습니다.' }, false, null, true));
      return res.json({ success: false, message: '추천브라가 선정되지 않았습니다.' });
    }

    let fixInfo = [
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

    let preview = [
      {
        brandName: fixInfo[0].BD_NAME,
        braName: fixInfo[0].BRA_NAME,
        tags: fixInfo[0].TAGS.slice(0, -1).split(','),
        tagNum: fixInfo[0].TAGS.slice(0, -1).split(',').length,
      },
      {
        brandName: fixInfo[1].BD_NAME,
        braName: fixInfo[1].BRA_NAME,
        tags: fixInfo[1].TAGS.slice(0, -1).split(','),
        tagNum: fixInfo[1].TAGS.slice(0, -1).split(',').length,
      },
      {
        brandName: fixInfo[2].BD_NAME,
        braName: fixInfo[2].BRA_NAME,
        tags: fixInfo[2].TAGS.slice(0, -1).split(','),
        tagNum: fixInfo[2].TAGS.slice(0, -1).split(',').length,
      },
    ];
    if (braFix.NUM === 4) {
      preview = preview.concat({
        brandName: fixInfo[3].BD_NAME,
        braName: fixInfo[3].BRA_NAME,
        tags: fixInfo[3].TAGS.slice(0, -1).split(','),
        tagNum: fixInfo[3].TAGS.slice(0, -1).split(',').length,
      });
    }

    const [breastData] = await BREAST_RESULT.findAll({
      where: { PK_ID: req.cookies.user },
      limit: 1,
      order: [['createdAt', 'DESC']],
    });
    if (!breastData) {
      winston.info({ success: true, message: '가슴 결과 데이터가 없습니다.' });
      return res.json({ success: true, message: '가슴 결과 데이터가 없습니다.' });
    }

    let bra1 = {};
    let bra2 = {};
    let bra3 = {};
    let bra4 = null;

    for (let i = 0; i < 4; i++) {
      //fixInfo
      if (i === 3 && braFix.NUM === 3) {
        break;
      }
      const braInfo = {
        braName: fixInfo[i].BRA_NAME,
        brandName: fixInfo[i].BD_NAME,
        tags: fixInfo[i].TAGS.slice(0, -1).split(','),
        tagNum: fixInfo[i].TAGS.slice(0, -1).split(',').length,
        recomSize: braFix[`SIZE_${i + 1}`].slice(0, -1).split(','),
        price: fixInfo[i].PRICE, //000마다 ,붙이기
        color: fixInfo[i].COLOR.slice(0, -1).split(','),
        link: fixInfo[i].LINK.slice(0, -1).split(','), // 색깔 배열과 동일하게
      };

      const breastMatch = {
        leftBreastLowerShape: breastData.LEFT_WIDTH_LC ? breastData.LEFT_WIDTH_LC.toFixed(2) : null,
        rightBreastLowerShape: breastData.RIGHT_WIDTH_LC ? breastData.RIGHT_WIDTH_LC.toFixed(2) : null,
        braLowerShape: fixInfo[i].mWIDTH_LC.toFixed(2),
        rib:
          breastData.RIB !== 0
            ? {
                type: Number(breastData.RIB), // 0-> 해당없음, 1->오목, 2->새
                content1:
                  breastData.RIB === 1 ? '오목가슴의 경우, 브라의 중심이 뜨는 경우가 많기에, 중심에 힘이 없어 잘 뜨는 낮은 중심의 브라는 피하는 것이 좋습니다.' : '새가슴의 경우, 브라의 중심이 높게 올라오면, 가슴의 중심을 눌러 답답함을 줄 수 있기에, 중심이 너무 높은 브라는 피하는 것이 좋습니다',
                content2: breastData.RIB === 1 ? '이 브라는 중심이 높에 올라와 가슴 중앙이 뜨는 것을 방지하고 가슴을 안정감있게 잡아줍니다.' : '이 브라는 중심이 높지 않아, 가슴의 중심을 답답하게 누르지 않습니다.',
              }
            : null,
      };

      const funcMatch = {
        bigger: [fixInfo[i].BIGGER_SCORE, fixInfo[i].BIGGER_DEGREE === 0 ? '하' : fixInfo[i].BIGGER_DEGREE === 1 ? '중' : '상'],
        gather: [fixInfo[i].GATHER_SCORE, fixInfo[i].GATHER_DEGREE === 0 ? '하' : fixInfo[i].GATHER_DEGREE === 1 ? '중' : '상'],
        pushup: [fixInfo[i].PUSHUP_SCORE, fixInfo[i].PUSHUP_DEGREE === 0 ? '하' : fixInfo[i].PUSHUP_DEGREE === 1 ? '중' : '상'],
        under: [fixInfo[i].SUPPORT_SCORE, fixInfo[i].SUPPORT_DEGREE === 0 ? '하' : fixInfo[i].SUPPORT_DEGREE === 1 ? '중' : '상'],
        accBreast: [fixInfo[i].ACCBREAST_SCORE, fixInfo[i].ACCBREAST_DEGREE === 0 ? '하' : fixInfo[i].ACCBREAST_DEGREE === 1 ? '중' : '상'],
        accBack: [fixInfo[i].BACK_SCORE, fixInfo[i].BACK_DEGREE === 0 ? '하' : fixInfo[i].BACK_DEGREE === 1 ? '중' : '상'],

        //없는 경우는 Null
        cupShape:
          fixInfo[i].CUP_SHAPE === 0
            ? {
                title: '컵모양: 풀컵',
                content: '풀컵은 가슴을 전체적으로 감싸주어, 안정감있는 착용감을 줍니다. 또한 풀컵은 가슴의 윗쪽과 겨드랑이 근방까지 덮어주어 부유방을 보완하기 좋습니다.',
              }
            : null,

        //없는 경우는 Null
        cover:
          fixInfo[i].UPPER_COVER === 1
            ? {
                title: '상컵 덮개',
                content: '상컵 덮개가 있어, 컵이 더욱 밀착되어 윗쪽 컵이 뜨는 것을 보완해줍니다.',
              }
            : null,

        //항상
        bbong: {
          title:
            fixInfo[i].EXISTENCE_PP === 0
              ? fixInfo[i].mTHICKNESS_DETACH_PP === null
                ? '뽕 없음'
                : fixInfo[i].mTHICKNESS_DETACH_PP === 0
                ? '뽕 있음(빼서 착용 권장)'
                : '뽕 있음'
              : fixInfo[i].mTHICKNESS_DETACH_PP === null
              ? '뽕 있음'
              : fixInfo[i].mTHICKNESS_DETACH_PP === 0
              ? '뽕 있음 (탈부착 뽕은 빼는걸 권장)'
              : '뽕 있음',
          value:
            fixInfo[i].EXISTENCE_PP === 0 && (fixInfo[i].mTHICKNESS_DETACH_PP === null || fixInfo[i].mTHICKNESS_DETACH_PP === 0)
              ? null
              : {
                  thick: fixInfo[i].EXISTENCE_PP === 0 ? '0cm' : `${fixInfo[i].mTHICKNESS_PP}cm`,
                  detachThick: fixInfo[i].mTHICKNESS_DETACH_PP === null ? '탈부착 뽕 없음' : fixInfo[i].mTHICKNESS_DETACH_PP === 0 ? '빼서 착용 권장' : `${fixInfo[i].mTHICKNESS_DETACH_PP}cm`,
                  loc: fixInfo[i].LOC_PP,
                  locString: fixInfo[i].LOC_PP === 0 ? '옆' : fixInfo[i].LOC_PP === 1 ? '아래' : fixInfo[i].LOC_PP === 2 ? '옆아래' : '전체', // 옆(0), 1(아래), 옆아래(2), 전체(3)
                },
          content:
            fixInfo[i].EXISTENCE_PP === 0
              ? fixInfo[i].mTHICKNESS_DETACH_PP === null
                ? '뽕이 없어 가벼운 착용감을 줍니다.'
                : fixInfo[i].mTHICKNESS_DETACH_PP === 0
                ? '탈부착 뽕이 있지만, 체형과 취향을 분석한 결과 빼서 입는 것을 권장합니다.'
                : `탈부착이 가능한 ${fixInfo[i].mTHICKNESS_DETACH_PP}cm의 뽕이 컵의 ${fixInfo[i].LOC_PP === 0 ? '옆' : fixInfo[i].LOC_PP === 1 ? '아래' : fixInfo[i].LOC_PP === 2 ? '옆아래' : '전체'}에 위치하여, 커보이기, 모아주기, 올려주기 효과를 줍니다.`
              : fixInfo[i].mTHICKNESS_DETACH_PP === null
              ? `내장형 뽕이 컵의 ${fixInfo[i].LOC_PP === 0 ? '옆' : fixInfo[i].LOC_PP === 1 ? '아래' : fixInfo[i].LOC_PP === 2 ? '옆아래' : '전체'}에 위치하여, 커보이기, 모아주기, 올려주기 효과를 줍니다.`
              : fixInfo[i].mTHICKNESS_DETACH_PP === 0
              ? `뽕이 컵의 ${fixInfo[i].LOC_PP === 0 ? '옆' : fixInfo[i].LOC_PP === 1 ? '아래' : fixInfo[i].LOC_PP === 2 ? '옆아래' : '전체'}에 위치하여, 커보이기, 모아주기, 올려주기 효과를 줍니다.`
              : `뽕이 컵의 ${fixInfo[i].LOC_PP === 0 ? '옆' : fixInfo[i].LOC_PP === 1 ? '아래' : fixInfo[i].LOC_PP === 2 ? '옆아래' : '전체'}에 위치하여, 커보이기, 모아주기, 올려주기 효과를 줍니다.`,
        },

        //항상
        wing: {
          title: fixInfo[i].mWIDTH_INNER_WING >= 9 ? '넓은 날개' : '넓지 않은 날개', //(괄호안에 값+cm)
          content: fixInfo[i].mWIDTH_INNER_WING >= 9 ? '넓은 날개 너비는 가슴 옆부분의 살을 잘 잡아주어, 등살, 부유방을 보정해주고, 안정감 있는 착용감을 줍니다.' : '넓지 않은 날개 너비는 가슴 옆부분과 옆구리의 압박감 없이 편안한 착용감을 줍니다.',
          value: fixInfo[i].mWIDTH_INNER_WING,
        },

        //항상
        sidebone: {
          title: '사이드본', //(괄호안에 값+개)
          content: fixInfo[i].NUM_SIDEBONE === 0 ? '사이드본이 없어 가슴 옆부분의 압박감 없이 편안한 착용감을 줍니다.' : '사이드본은 위,아래,옆의 가슴의 살을 잘 끌어모아서, 안정적으로 잡아주고 살이 삐져나가는 것을 방지해줍니다.',
          value: fixInfo[i].NUM_SIDEBONE,
        },

        //없는 경우는 Null
        shoulderStrap:
          fixInfo[i].mTHICKNESS_STRAP >= 1.5
            ? {
                title: '넓은 어깨끈',
                content: '넓은 어깨끈이 가슴을 안정적으로 지탱해주며, 압박감을 넓게 분산해, 어깨끈 압박감도 적습니다.',
              }
            : null,
      };

      const addInfo = {
        wire: {
          title: fixInfo[i].WIRE === 0 ? '와이어 없음' : fixInfo[i].WIRE === 1 ? '와이어 있음' : '소프트 와이어 있음',
          content: fixInfo[i].WIRE === 0 ? '와이어가 없어 압박감 없는 편안한 착용감을 줍니다.' : fixInfo[i].WIRE === 1 ? '와이어가 있어 가슴의 중량을 안정감있게 받쳐줍니다.' : '상대적으로 부드러운 와이어가 가슴을 지탱해주면서도, 답답하지 않은 느낌을 줍니다.',
          value: fixInfo[i].WIRE,
        },
        cupShape:
          fixInfo[i].CUP_SHAPE !== 0
            ? {
                title: fixInfo[i].CUP_SHAPE === 1 ? '컵 모양 : 3/4컵' : '컵 모양 : 반컵',
                content: fixInfo[i].CUP_SHAPE == 1 ? '가슴을 적당하게 3/4정도 가려주어, 옷 태를 살려줍니다.' : '가슴을 반만 가려주어 목부분이 파인 옷을 입을 때 주로 입는 컵으로, 옷 태를 살려줍니다.',
                value: fixInfo[i].CUP_SHAPE,
              }
            : null,
        cupType:
          fixInfo[i].CUP_TYPE !== 0
            ? {
                title: fixInfo[i].CUP_TYPE === 1 ? '부직포 컵' : '홑겹',
                content:
                  fixInfo[i].CUP_TYPE === 1 ? '컵이 하나하나 수작업으로 만들어진 봉제컵이라, 기능적으로 가슴을 더 잘 잡아줍니다.' : '얇은 천 하나로 컵을 만들어 가슴을 답답함 없이 감싸주고, 매우 가벼운 착용감을 줍니다. 하지만 잡아주는 기능은 약하고, BP점이 도드라진 분들은 신경쓰일 수 있습니다.',
                value: fixInfo[i].CUP_TYPE,
              }
            : null,
        hookEye: {
          title: fixInfo[i].HOOK === -1 ? '앞후크' : `${fixInfo[i].HOOK} 후크 ${fixInfo[i].EYE * fixInfo[i].HOOK} 아이`,
          value:
            fixInfo[i].HOOK === -1
              ? null
              : {
                  hook: fixInfo[i].HOOK,
                  eye: fixInfo[i].EYE,
                },
          content:
            fixInfo[i].HOOK === -1
              ? '후크를 앞에서 채워, 가슴을 효과적으로 모을 수 있고, 브라를 입을 때 빠르고 편리합니다.'
              : fixInfo[i].HOOK === 2 && fixInfo[i].EYE === 3
              ? '일반적인 후크로 압박감이 적은 데일리 용도입니다.'
              : fixInfo[i].HOOK === 2 && fixInfo[i].EYE === 4
              ? '일반적인 후크로 압박감이 적은 데일리 용도입니다.'
              : fixInfo[i].HOOK === 3 && fixInfo[i].EYE === 3
              ? '후크 개수가 많아, 가슴을 더욱 안정적으로 받쳐줍니다.'
              : '후크, 아이 개수가 많아, 가슴을 더욱 안정적으로 받쳐줍니다.',
        },
      };

      if (i === 0) {
        bra1 = { braInfo, breastMatch, funcMatch, addInfo };
      }
      if (i === 1) {
        bra2 = { braInfo, breastMatch, funcMatch, addInfo };
      }
      if (i === 2) {
        bra3 = { braInfo, breastMatch, funcMatch, addInfo };
      }
      if (i === 3) {
        bra4 = { braInfo, breastMatch, funcMatch, addInfo };
      }
    }

    const braDetails = bra4 ? [bra1, bra2, bra3, bra4] : [bra1, bra2, bra3];
    // winston.debug(util.inspect(braDetails, false, null, true));
    return res.json({
      success: true,
      message: '브라 정보 가져오기 성공',
      braNum: braFix.NUM,
      isOrderedHomeserv: (await HOME_FITTING.findOne({ where: { PK_ID: req.cookies.user } })) ? true : false,
      preview,
      braDetails,
    });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: '브라 상세정보 가져오기 실패', err });
  }
});

router.get('/getImg/:what/:ranking', async (req, res) => {
  const what = req.params.what;
  const ranking = Number(req.params.ranking);
  winston.debug(what, ranking);
  try {
    const [braFix] = await BRA_FIX.findAll({
      where: { PK_ID: req.cookies.user },
      attributes: ['CHECK_ADMIN', 'NUM', 'PK_ITEM_1', 'OLD_KEY_1', 'PK_SIZE_1', 'PK_ITEM_2', 'OLD_KEY_2', 'PK_SIZE_2', 'PK_ITEM_3', 'OLD_KEY_3', 'PK_SIZE_3', 'PK_ITEM_4', 'OLD_KEY_4', 'PK_SIZE_4'],
      limit: 1,
      order: [['createdAt', 'ASC']],
    });
    if (!braFix || braFix.CHECK_ADMIN !== 2) {
      winston.info({ success: true, message: '추천 브라 데이터가 없습니다.' });
      return res.json({ success: true, message: '추천 브라 데이터가 없습니다.' });
    }

    if (what === 'bra') {
      winston.debug(`bra -> ranking: ${ranking}, ${braFix[`OLD_KEY_${ranking}`]}`);
      if (!(ranking === 4 && braFix.NUM === 3)) {
        return res.sendFile(path.join(__dirname, `../../BraImages/${braFix[`OLD_KEY_${ranking}`]}.png`));
      }
      return res.end();
    } else if (what === 'braLowerShape') {
      if (!fs.existsSync(path.join(__dirname, `../../BraLowerShapes/${braFix[`PK_SIZE_${ranking}`]}_${braFix[`OLD_KEY_${ranking}`]}.png`))) {
        return res.sendFile(path.join(__dirname, `../../BraLowerShapes/${braFix[`PK_ITEM_${ranking}`]}_${braFix[`OLD_KEY_${ranking}`]}.png`));
      }
      return res.sendFile(path.join(__dirname, `../../BraLowerShapes/${braFix[`PK_SIZE_${ranking}`]}_${braFix[`OLD_KEY_${ranking}`]}.png`));
    }
  } catch (err) {
    winston.error(err);
    return res.json({ success: true, message: '추천 브라 이미지 불러오기 실패', err });
  }
});

router.put('/braCheck/:ranking', async (req, res) => {
  const ranking = Number(req.params.ranking) + 1;
  try {
    BRA_FIX.update({ CHECK_ALL: ranking }, { where: { PK_ID: req.cookies.user, CHECK_ALL: { [Op.lt]: ranking } } });
  } catch (err) {
    winston.error(err);
  }
  res.end();
});

module.exports = router;
