const fs = require('fs');
const { USER, KIT, BREAST_TEST, BREAST_RESULT, HOME_FITTING, BRA_REVIEW, DELETED_USER, BRA_FIX } = require('../server/models');

const getNotUploadKit = async () => {
  //모든 유저 가져오기
  let users = await USER.findAll();
  users = users.map((user) => {
    return user.dataValues;
  });
  console.log(users);

  //키트업로드 한 유저 가져오기
  let test = await BREAST_TEST.findAll({ where });

  //설문 완료한 유저 가져오기
};

const getNotCompleteTest = async () => {
  //모든 유저 가져오기
  let users = await USER.findAll({ attributes: ['PK_ID', 'username'] });
  users = users.map((user) => {
    return user.dataValues;
  });
  console.log(users);

  //키트업로드 한 유저 가져오기

  //설문 완료한 유저 가져오기
  let results = await BREAST_RESULT.findAll({ attributes: ['PK_ID'] });
  results = results.map((result) => {
    return result.dataValues.PK_ID;
  });
  console.log(results);

  let count = 0;
  users.map((user) => {
    if (!results.includes(user.PK_ID)) {
      console.log(user.username);

      let data = `${user.username}\n`;
      if (count === 0) {
        ++count;
        fs.writeFileSync('list.txt', data, 'utf8', function (err) {
          if (err) {
            console.log(err);
          }
          console.log('write end');
        });
      } else {
        fs.appendFileSync('list.txt', data, 'utf8', function (err) {
          if (err) {
            console.log(err);
          }
          console.log('write end');
        });
      }
    }
  });
};

// getNotUploadKit();
getNotCompleteTest();
