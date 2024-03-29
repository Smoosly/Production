'use strict';
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const util = require('util');
const router = express.Router();
const winston = require('../winston');
const { sequelize, KIT, USER, BREAST_TEST } = require('../models');
const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');
dayjs.extend(timezone);
dayjs.extend(utc);

const { isAuth } = require('../middleware/isAuth');
router.use(isAuth);

let Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'KitUploads/');
  },
  filename: (req, file, cb) => {
    const filename = req.cookies.user.concat(file.originalname.replace(path.extname(file.originalname), ''));
    cb(null, `${filename}_${formatDate()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: Storage }).fields([
  { name: 'left', maxCount: 1 },
  { name: 'right', maxCount: 1 },
  { name: 'data', maxCount: 1 },
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
    // winston.debug(util.inspect(data, false, null, true));
    const result = await axios.post('http://127.0.0.1:5000/isKitImgValid', data);
    if (!result) {
      resolve({ success: false, message: '재업로드해주세요' });
    }
    // winston.debug(util.inspect(result.data, false, null, true));
    if (result.data.success === 'yes') {
      resolve({ success: true, message: '이미지 업로드 성공' });
    } else {
      winston.debug('check here');
      winston.debug(util.inspect(result.data, false, null, true));
      winston.debug(result.data.error);
      winston.debug(typeof result.data.error);
      const errCode = Number(result.data.error);
      winston.debug(errCode);
      let errMessage = '';
      switch (errCode) {
        case 0:
          errMessage = '박스 4개가 제대로 보이지 않습니다, 4개가 모두 보이도록 사진을 재촬영해주세요';
          break;
        case 1:
          errMessage = '사진이 위아래로 뒤집힌 것 같습니다. 사진의 방향을 다시 확인해주세요.';
          break;
        case 2:
          errMessage = '가슴 안쪽 길이 박스가 훼손되었거나 제대로 촬영되지 않은 것 같습니다. 혹시 테이프를 박스 선에 너무 가깝게 붙인 건 아니신가요? 확인 후 재촬영해주세요.';
          break;
        case 3:
          errMessage = '가슴 아래쪽 길이 박스가 훼손되었거나 제대로 촬영되지 않은 것 같습니다. 혹시 테이프를 박스 선에 너무 가깝게 붙인 건 아니신가요? 확인 후 재촬영해주세요.';
          break;
        case 4:
          errMessage = '가슴 밑선 모양 박스가 훼손되었거나 제대로 촬영되지 않은 것 같습니다. 혹시 철사를 박스 선에 너무 가깝게 붙인 건 아니신가요? 확인 후 재촬영해주세요.';
          break;
        case 5:
          errMessage = '겨드랑이쪽 길이 박스가 훼손되었거나 제대로 촬영되지 않은 것 같습니다. 혹시 테이프를 박스 선에 너무 가깝게 붙인 건 아니신가요? 확인 후 재촬영해주세요.';
          break;
        case 6:
          errMessage = '가슴 안쪽 길이 박스의 테이프가 인식되지 않습니다. 혹시 테이프를 박스 선에 너무 가깝게 붙인 건 아니신가요? 확인 후 재촬영해주세요.';
          break;
        case 7:
          errMessage = '가슴 아래쪽 길이 박스의 테이프가 인식되지 않습니다. 혹시 테이프를 박스 선에 너무 가깝게 붙인 건 아니신가요? 확인 후 재촬영해주세요.';
          break;
        case 8:
          errMessage = '밑선모양 박스의 철사가 인식되지 않습니다. 혹시 철사를 박스 선에 너무 가깝게 붙인 건 아니신가요? 확인 후 재촬영해주세요.';
          break;
        case 9:
          errMessage = '겨드랑이쪽 길이 박스의 테이프가 인식되지 않습니다. 혹시 테이프를 박스 선에 너무 가깝게 붙인 건 아니신가요? 확인 후 재촬영해주세요.';
          break;
        case 10:
          errMessage = '이미지 경로가 존재하지 않습니다. 재시도해주세요.';
          break;
        default:
          errMessage = '키트 사진을 인식할 수 없어요! 다시 업로드 부탁드려요 :)';
          break;
      }
      resolve({ success: false, message: errMessage });
    }
  });
};

const formatDate = () => {
  const now2 = dayjs(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' })).format('YYYYMMDDHHmmss');
  return now2;
};

router.post('/img/upload', async (req, res) => {
  winston.debug('---> Image Upload Start');
  upload(req, res, async (err) => {
    if (err) {
      winston.error(err);
      return res.json({ success: false, message: '이미지 업로드 실패', err });
    }
    if (!req.files) {
      winston.info({ success: false, message: '이미지가 없습니다.' });
      return res.json({ success: false, message: '이미지가 없습니다.' });
    }
    // const PK_ID = JSON.parse(req.body.data).PK_ID;
    const yesLeft = JSON.parse(req.body.data).yesLeft;
    const yesRight = JSON.parse(req.body.data).yesRight;
    console.log(yesLeft);
    console.log(yesRight);
    const leftImg = req.files['left'] && req.files['left'][0];
    const rightImg = req.files['right'] && req.files['right'][0];

    try {
      //BREAST_TEST 생성하고 Progress 를 1단계 성공으로 설정하기
      const [test, created] = await BREAST_TEST.findOrCreate({
        where: { PK_ID: req.cookies.user },
        defaults: {
          PK_ID: req.cookies.user,
          WHERE_BT: leftImg && rightImg ? 2 : leftImg ? 0 : 1,
          STEP: 0,
        },
      });
      winston.debug(util.inspect(test.dataValues, false, null, true));
      winston.debug(created, 'true->새로만들어짐, false->update');

      //왼쪽 이미지
      if (leftImg && !rightImg) {
        let leftImgPath = path.join(__dirname, `../../KitUploads/${leftImg.filename}`);

        // Flask 서버에 요청하기
        const flask = await isValidImg(leftImg.filename, '');
        winston.debug('left flask : ', flask);
        if (!flask.success) {
          leftImgPath && fs.unlinkSync(leftImgPath);
          // await BREAST_TEST.destroy({ where: { PK_ID: PK_ID } });
          winston.info({ success: false, message: flask.message, leftImgValid: false });
          return res.json({ success: false, message: flask.message, leftImgValid: false });
        }
      }
      //오른쪽 이미지
      if (!leftImg && rightImg) {
        let rightImgPath = path.join(__dirname, `../../KitUploads/${rightImg.path}`);

        //Flask 서버에 요청하기
        const flask = await isValidImg('', rightImg.filename);
        winston.debug('right flask : ', flask);
        if (!flask.success) {
          rightImgPath && fs.unlinkSync(rightImgPath);
          // await BREAST_TEST.destroy({ where: { PK_ID: PK_ID } });
          winston.info({ success: false, message: flask.message, rightImgValid: false });
          return res.json({ success: false, message: flask.message, rightImgValid: false });
        }
      }
      if (leftImg && rightImg) {
        const leftImgPath = path.join(__dirname, `../../KitUploads/${leftImg.filename}`);
        const rightImgPath = path.join(__dirname, `../../KitUploads/${rightImg.filename}`);

        // Flask 서버에 요청하기
        const flask = await isValidImg(leftImg.filename, rightImg.filename);
        winston.debug('flask : ', flask);
        if (!flask.success) {
          leftImgPath && fs.unlinkSync(leftImgPath);
          rightImgPath && fs.unlinkSync(rightImgPath);
          // await BREAST_TEST.destroy({ where: { PK_ID: PK_ID } });
          winston.info({ success: false, message: flask.message, leftImgValid: false, rightImgValid: false });
          return res.json({ success: false, message: flask.message, leftImgValid: false, rightImgValid: false });
        }
      }

      //옛날 이미지 지우기
      console.log('delete');

      const oldLeftImgPath = test && test.LEFT_IMG_PATH && path.join(__dirname, `../../KitUploads/${test.LEFT_IMG_PATH}`);
      console.log('oldLeftImgPath');
      console.log(oldLeftImgPath);
      !yesLeft && oldLeftImgPath && fs.unlinkSync(oldLeftImgPath);

      if (!yesLeft && oldLeftImgPath) {
        let index = test.LEFT_IMG_PATH.indexOf('.');
        let leftPath = test.LEFT_IMG_PATH.slice(0, index);
        leftPath = leftPath.concat('.png');
        console.log('leftPath');
        console.log(leftPath);
        const oldLeftLowerImgPath = test && test.LEFT_IMG_PATH && path.join(__dirname, `../../LowerShapes/${leftPath}`);
        console.log('oldLeftLowerImgPath');
        console.log(oldLeftLowerImgPath);
        oldLeftLowerImgPath && fs.unlinkSync(oldLeftLowerImgPath);
        oldLeftLowerImgPath && test.update({ LEFT_IMG_PATH: null });
      }

      const oldRightImgPath = test && test.RIGHT_IMG_PATH && path.join(__dirname, `../../KitUploads/${test.RIGHT_IMG_PATH}`);
      console.log('oldRightImgPath');
      console.log(oldRightImgPath);
      !yesRight && oldRightImgPath && fs.unlinkSync(oldRightImgPath);

      if (!yesRight && oldRightImgPath) {
        let index = test.RIGHT_IMG_PATH.indexOf('.');
        let rightPath = test.RIGHT_IMG_PATH.slice(0, index);
        rightPath = rightPath.concat('.png');
        console.log('rightPath');
        console.log(rightPath);
        const oldRightLowerImgPath = test && test.RIGHT_IMG_PATH && path.join(__dirname, `../../LowerShapes/${rightPath}`);
        console.log('oldRightLowerImgPath');
        console.log(oldRightLowerImgPath);
        oldRightLowerImgPath && fs.unlinkSync(oldRightLowerImgPath);
        oldRightLowerImgPath && test.update({ RIGHT_IMG_PATH: null });
      }

      winston.debug('업로드 성공');
      const result = await BREAST_TEST.findOne({ where: { PK_ID: req.cookies.user } });
      if (result) {
        // 원래 있었다면 경로 바꿔주기
        result.update({ STEP: 1 });
        leftImg && result.update({ LEFT_IMG_PATH: leftImg.filename });
        rightImg && result.update({ RIGHT_IMG_PATH: rightImg.filename });
      }

      winston.info({ success: true, message: '이미지 업로드 성공' });
      return res.json({ success: true, message: '이미지 업로드 성공' });
    } catch (err) {
      winston.error(err);
      return res.json({ success: false, message: '이미지 업로드 실패', err });
    }
  });
});

router.get('/getImg/:where', async (req, res) => {
  const where = req.params.where;
  const test = await BREAST_TEST.findOne({ where: { PK_ID: req.cookies.user } });
  if (!test) {
    res.end();
    return;
  }
  const newLeftImgPath = test.LEFT_IMG_PATH && path.join(__dirname, `../../KitUploads/${test.LEFT_IMG_PATH}`);
  const newRightImgPath = test.RIGHT_IMG_PATH && path.join(__dirname, `../../KitUploads/${test.RIGHT_IMG_PATH}`);
  newLeftImgPath && where === 'left' && res.sendFile(newLeftImgPath);
  newRightImgPath && where === 'right' && res.sendFile(newRightImgPath);
});

router.get('/checkImg', async (req, res) => {
  try {
    const test = await BREAST_TEST.findOne({
      where: { PK_ID: req.cookies.user },
      attributes: ['LEFT_IMG_PATH', 'RIGHT_IMG_PATH'],
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
    winston.info({ success: false, message: '가슴 테스트 내역 없음' });
    return res.json({ success: false, message: '가슴 테스트 내역 없음' });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: '키트 이미지 체크 실패', err });
  }
});

router.post('/request', async (req, res) => {
  // 체험단 여부 판별하기
  const user = await USER.findOne({ where: { PK_ID: req.cookies.user }, attributes: ['role'] });
  const kit = await KIT.findOne({ where: { PK_ID: req.cookies.user } });
  if (user.role === '3MVP' && kit) {
    winston.info({ success: false, message: '이미 키트 신청 내역이 있는지 확인하세요.' });
    return res.json({ success: false, message: '이미 키트 신청 내역이 있는지 확인하세요.' });
  } else {
    await USER.update({ phone: req.body.phone, postcode: req.body.postcode, address: req.body.address, extraAddress: req.body.extraAddress }, { where: { PK_ID: req.cookies.user } });
    let kitReqInfo = {};
    Object.assign(kitReqInfo, req.body);
    delete kitReqInfo.PK_ID;
    kitReqInfo.state = 1;
    // delete kitReqInfo.couponCode;
    try {
      const [kit, created] = await KIT.findOrCreate({
        where: { PK_ID: req.cookies.user },
        defaults: kitReqInfo,
      });
      if (created) {
        winston.info({ success: true, message: '키트가 성공적으로 신청되었습니다.', kit });
        return res.json({ success: true, message: '키트가 성공적으로 신청되었습니다.', kit });
      } else {
        winston.info({ success: false, message: '이미 키트 신청 내역이 있는지 확인하세요.' });
        return res.json({ success: false, message: '이미 키트 신청 내역이 있는지 확인하세요.' });
      }
    } catch (err) {
      winston.error(err);
      return res.json({ success: false, message: '키트 신청에 실패하였습니다.', err });
    }
  }
});

router.get('/getMyInfo', async (req, res) => {
  try {
    const kit = await KIT.findOne({
      where: { PK_ID: req.cookies.user },
      attributes: ['state', [sequelize.fn('date_format', sequelize.col('createdAt'), '%Y-%m-%d'), 'createdAt']],
    });
    if (kit) {
      winston.info({ success: true, message: '키트 배송 정보 가져오기 성공', kitInfo: kit });
      return res.json({ success: true, message: '키트 배송 정보 가져오기 성공', kitInfo: kit });
    }
    winston.info({ success: false, message: '키트 배송 신청 정보가 없습니다.' });
    return res.json({ success: false, message: '키트 배송 신청 정보가 없습니다.' });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: '키트 배송 정보를 가져오지 못했습니다.', err });
  }
});

router.delete('/cancel', async (req, res) => {
  try {
    const result = await KIT.findOne({ where: { PK_ID: req.cookies.user } });
    if (!result) {
      winston.info({ success: false, message: '키트 신청 내역이 없습니다.' });
      return res.json({ success: false, message: '키트 신청 내역이 없습니다.' });
    }
    if (result.state === 2) {
      winston.info({ success: false, message: '배송중인 키트는 취소할 수 없습니다.' });
      return res.json({ success: false, message: '배송중인 키트는 취소할 수 없습니다.' });
    }
    if (result.state === 3) {
      winston.info({ success: false, message: '배송 완료된 키트입니다.' });
      return res.json({ success: false, message: '배송 완료된 키트입니다.' });
    }
    const destroyed = await KIT.destroy({ where: { PK_ID: req.cookies.user } });
    if (destroyed) {
      winston.info({ success: true, message: '키트 신청 취소 성공' });
      return res.json({ success: true, message: '키트 신청 취소 성공' });
    }
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: '키트 신청 취소 실패', err });
  }
});

module.exports = router;
