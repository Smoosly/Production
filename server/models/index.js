const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';         // 개발용 환경 설정
const config = require('../config/config')[env];      // Sequelize 설정 파일
const db = {};

// Sequelize 인스턴스화
const sequelize = new Sequelize(config.database, config.username, config.password, config);  

db.Sequelize = Sequelize;  // db객체에 Sequelize 패키지 넣기
db.sequelize = sequelize;  // db객체에 Sequelize 인스턴스 넣기

db.AUTH_CODE = require('./AUTH_CODE')(sequelize, Sequelize);
db.BR_DETAIL = require('./BR_DETAIL')(sequelize, Sequelize);
db.BRA_FIX = require('./BRA_FIX')(sequelize, Sequelize);
db.BRA_RECOM = require('./BRA_RECOM')(sequelize, Sequelize);
db.BRA_REVIEW = require('./BRA_REVIEW')(sequelize, Sequelize);
db.BRA_STOCK = require('./BRA_STOCK')(sequelize, Sequelize);
db.BREAST_RESULT = require('./BREAST_RESULT')(sequelize, Sequelize);
db.BREAST_TEST = require('./BREAST_TEST')(sequelize, Sequelize);
db.DELETED_USER = require('./DELETED_USER')(sequelize, Sequelize);
db.HOME_FITTING = require('./HOME_FITTING')(sequelize, Sequelize);
db.KIT = require('./KIT')(sequelize, Sequelize);
db.RECOM_RESULT = require('./RECOM_RESULT')(sequelize, Sequelize);
db.USER = require('./USER')(sequelize, Sequelize);

module.exports = db;  // 모듈화