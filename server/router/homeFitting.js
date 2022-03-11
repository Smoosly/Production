'use strict';
const express = require('express');
const router = express.Router();
const { sequelize, KIT, HOME_FITTING, BRA_FIX, BRA_REVIEW } = require('../models');
const winston = require('../winston');
const deliveryInfo = require('../config/delivery');
const util = require('util');
const axios = require('axios');
const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');
dayjs.extend(timezone);
dayjs.extend(utc);

const { isAuth } = require('../middleware/isAuth');

router.post('/apply', isAuth, async (req, res) => {
  let homeFitting = {};
  Object.assign(homeFitting, req.body);
  homeFitting.state = 1;
  try {
    const [result, created] = await HOME_FITTING.findOrCreate({
      where: { PK_ID: req.cookies.user },
      defaults: homeFitting,
    });
    winston.debug(util.inspect(result, false, null, true));
    winston.debug(created);
    if (!created) {
      winston.info({ success: false, message: '이미 홈 피팅 서비스 신청 내역이 있습니다.' });
      return res.json({ success: false, message: '이미 홈 피팅 서비스 신청 내역이 있습니다.' });
    }
    const update = await BRA_FIX.update({ H_FITTING_APPLY: 1 }, { where: { PK_ID: req.cookies.user } });
    if (result && update) {
      winston.info({ success: true, message: '홈 피팅 서비스 신청 성공' });
      return res.json({ success: true, message: '홈 피팅 서비스 신청 성공' });
    }
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: '홈 피팅 서비스 신청 실패', err });
  }
});

router.get('/checkRecom', isAuth, async (req, res) => {
  try {
    const braFix = await BRA_FIX.findOne({ where: { PK_ID: req.cookies.user } });
    if (!braFix || braFix.CHECK_ADMIN !== 2) {
      return res.json({ success: true, isRecom: false, message: '아직 추천브라가 정해지지 않았습니다.' });
    } else {
      return res.json({ success: true, isRecom: true, message: '추천브라가 선정되었습니다.' });
    }
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: '추천여부 확인 실패', err });
  }
});

router.get('/getMyInfo', isAuth, async (req, res) => {
  try {
    const homeFitting = await HOME_FITTING.findOne({
      where: { PK_ID: req.cookies.user },
      attributes: [[sequelize.fn('date_format', sequelize.col('createdAt'), '%Y-%m-%d'), 'createdAt'], [sequelize.fn('REPLACE', sequelize.col('invoice'), '-', ''), 'invoice'], 'state', 'return', 'returnDate'],
    });
    if (!homeFitting) {
      winston.info({ success: false, message: '홈 피팅 서비스 신청 내역이 없습니다.' });
      return res.json({ success: false, message: '홈 피팅 서비스 신청 내역이 없습니다.' });
    }
    winston.debug(util.inspect(homeFitting.dataValues, false, null, true));
    const sweettracker = await axios.get(`https://info.sweettracker.co.kr/api/v1/trackingInfo?t_key=${deliveryInfo.api_key}&t_code=${deliveryInfo.code}&t_invoice=${homeFitting.invoice}`);
    if (!sweettracker) {
      winston.info({ success: false, message: '배송 조회할 수 없습니다.' });
      return res.json({ success: false, message: '배송 조회할 수 없습니다.' });
    }
    winston.debug(util.inspect(sweettracker.data, false, null, true));
    if (sweettracker.status === true) {
      await HOME_FITTING.update({ state: sweettracker.data.complete ? 3 : 2 }, { where: { PK_ID: req.cookies.user } });
    }
    winston.info({ success: true, message: '홈 피팅 서비스 배송 정보', homeFitting: homeFitting, deliveryInfo: deliveryInfo });
    return res.json({ success: true, message: '홈 피팅 서비스 배송 정보', homeFitting: homeFitting, deliveryInfo: deliveryInfo });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: '홈 피팅 서비스 정보를 가져오지 못했습니다.', err });
  }
});

router.get('/getCanReturn', isAuth, async (req, res) => {
  try {
    const homeFitting = await HOME_FITTING.findOne({ where: { PK_ID: req.cookies.user }, attributes: ['state'] });
    const braReview = await BRA_REVIEW.findAll({ where: { PK_ID: req.cookies.user }, attributes: ['ID'] });
    const braFix = await BRA_FIX.findOne({ where: { PK_ID: req.cookies.user }, attributes: ['NUM'] });
    if (homeFitting && braFix.NUM === braReview.length && homeFitting.return !== 0) {
      // 홈피팅 브라가 배송완료되고 리뷰를 다 썼는데 아직 반송신청 안한 경우
      winston.info({ success: true, message: '반송 가능한지 여부 가져오기 성공', canReturn: true });
      return res.json({ success: true, message: '반송 가능한지 여부 가져오기 성공', canReturn: true });
    }
    winston.info({ success: true, message: '반송 가능한지 여부 가져오기 성공', canReturn: false });
    return res.json({ success: true, message: '반송 가능한지 여부 가져오기 성공', canReturn: false });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: '반송 가능한지 여부 가져오기 성공', err });
  }
});

router.post('/returning', isAuth, async (req, res) => {
  try {
    const result = await HOME_FITTING.findOne({ where: { PK_ID: req.cookies.user } });
    if (!result) {
      winston.info({ success: false, message: '홈 피팅 서비스를 신청한적 있는지 확인하세요.' });
      return res.json({ success: false, message: '홈 피팅 서비스를 신청한적 있는지 확인하세요.' });
    }
    if (result.return === 0) {
      result.update({ return: 1, returnDate: dayjs(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' })).format('YYYY-MM-DD') });
      winston.info({ success: true, message: '반송 신청 성공' });
      return res.json({ success: true, message: '반송 신청 성공' });
    }
    winston.info({ success: false, message: '이미 반송신청 내역이 있습니다.' });
    return res.json({ success: false, message: '이미 반송신청 내역이 있습니다.' });
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: '반송 신청 실패', err });
  }
});

router.delete('/cancel', async (req, res) => {
  try {
    const result = await HOME_FITTING.findOne({ where: { PK_ID: req.cookies.user } });
    if (!result) {
      winston.info({ success: false, message: '홈 피팅 신청 내역이 없습니다.' });
      return res.json({ success: false, message: '홈 피팅 신청 내역이 없습니다.' });
    }
    if (result.state === 2) {
      winston.info({ success: false, message: '배송중인 홈 피팅 브라가 배송중입니다.' });
      return res.json({ success: false, message: '배송중인 홈 피팅 브라가 배송중입니다.' });
    }
    if (result.state === 3) {
      winston.info({ success: false, message: '배송 완료되었습니다.' });
      return res.json({ success: false, message: '배송 완료되었습니다.' });
    }
    const destroyed = await HOME_FITTING.destroy({ where: { PK_ID: req.cookies.user } });
    if (destroyed) {
      winston.info({ success: true, message: '홈 피팅 신청 취소 성공' });
      return res.json({ success: true, message: '홈 피팅 신청 취소 성공' });
    }
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: '홈 피팅 신청 취소 실패', err });
  }
});
module.exports = router;
