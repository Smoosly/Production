'use strict';
const express = require('express');
const router = express.Router();
const { sequelize, KIT, HOME_FITTING, BRA_FIX, BRA_REVIEW } = require('../models');
const winston = require('../winston');
const deliveryInfo = require('../config/delivery');
const jasx = require('json-as-xlsx');
const util = require('util');
const axios = require('axios');
const slack = require('slack-node');

const { isAuth } = require('../middleware/isAuth');

router.post('/apply', isAuth, async (req, res) => {
  let homeFitting = {};
  Object.assign(homeFitting, req.body);
  delete homeFitting.PK_ID;
  homeFitting.state = 1;
  try {
    const [result, created] = await HOME_FITTING.findOrCreate({
      where: { PK_ID: req.body.PK_ID },
      defaults: homeFitting,
    });
    winston.debug(util.inspect(result, false, null, true));
    winston.debug(created);
    if (!created) {
      winston.info({ success: false, message: '이미 홈 피팅 서비스 신청 내역이 있습니다.' });
      return res.json({ success: false, message: '이미 홈 피팅 서비스 신청 내역이 있습니다.' });
    }
    const update = await BRA_FIX.update({ H_FITTING_APPLY: 1 }, { where: { PK_ID: req.body.PK_ID } });
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
      attributes: [[sequelize.fn('date_format', sequelize.col('createdAt'), '%Y-%m-%d'), 'createdAt'], 'invoice', 'state', 'return', 'returnDate', 'returnInvoice'],
    });
    // const { data } = await axios.get(`https://apis.tracker.delivery/carriers/kr.cjlogistics/tracks/${homeFitting.invoice}`);
    // const tracker = await axios.get(`http://nplus.doortodoor.co.kr/web/detail.jsp?slipno=${homeFitting.invoice}`);
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
    if (homeFitting && homeFitting.state === 3 && braFix.NUM === braReview.length) {
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
    const result = await HOME_FITTING.findOne({ where: { PK_ID: req.body.PK_ID } });
    if (!result) {
      winston.info({ success: false, message: '홈 피팅 서비스를 신청한적 있는지 확인하세요.' });
      return res.json({ success: false, message: '홈 피팅 서비스를 신청한적 있는지 확인하세요.' });
    }
    if (result.return === 0) {
      result.update({ return: 1, returnDate: req.body.returnDate });
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

router.post('/invoice/:what', async (req, res) => {
  var Slack = require('slack-node');

  webhookUri = '__uri___';

  slack = new Slack();
  slack.setWebhook(webhookUri);

  // slack emoji
  slack.webhook(
    {
      channel: '#general',
      username: 'webhookbot',
      icon_emoji: ':ghost:',
      text: 'test message, test message',
    },
    function (err, response) {
      console.log(response);
    }
  );
  
  const what = req.params.what;
  console.log(what);
  try {
    if (what === 'kit') {
      const kits = await KIT.findAll({ attributes: ['recipient', 'phone', [sequelize.fn('concat', sequelize.col('address'), ' ', sequelize.col('extraAddress')), 'fulladdress']] });
      winston.debug(util.inspect(kits, false, null, true));
      const kitdata = kits.map((kit) => {
        return kit.dataValues;
      });
      console.log(kitdata);
      winston.debug(util.inspect(kitdata, false, null, true));
      const data = [
        {
          sheet: 'Info',
          columns: [
            { label: 'recipient', value: 'recipient' }, // Top level data
            { label: 'phone', value: 'phone' }, // Top level data
            // { label: 'address', value: 'address' }, // Top level data
            // { label: 'extraAddress', value: 'extraAddress' }, // Top level data
            { label: 'fulladdress', value: 'fulladdress' }, // Top level data
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
      winston.info({ success: true, message: '키트 송장출력용 엑셀파일 생성 성공' });
      return res.json({ success: true, message: '키트 송장출력용 엑셀파일 생성 성공' });
    } else if (what === 'homeFitting') {
      const homeFitting = await HOME_FITTING.findAll();
      const data = [
        {
          sheet: 'Info',
          columns: [
            { label: 'PK_ID', value: 'PK_ID' },
            { label: 'recipient', value: 'recipient' },
            { label: 'phone', value: 'phone' },
            { label: 'postcode', value: 'postcode' },
            { label: 'address', value: 'address' },
            { label: 'extraAddress', value: 'extraAddress' },
            { label: 'message', value: 'message' },
          ],
          content: homeFitting,
        },
      ];

      const settings = {
        fileName: 'HomeFittingInvoices',
        extraLength: 3,
        writeOptions: {},
      };

      jasx(data, settings);
      winston.info({ success: true, message: '홈피팅 송장출력용 엑셀파일 생성 성공' });
      return res.json({ success: true, message: '홈피팅 송장출력용 엑셀파일 생성 성공' });
    }
  } catch (err) {
    winston.error(err);
    return res.json({ success: false, message: '송장출력용 엑셀파일 생성 실패', err });
  }
});

module.exports = router;
