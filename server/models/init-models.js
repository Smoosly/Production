var DataTypes = require("sequelize").DataTypes;
var _AUTH_CODE = require("./AUTH_CODE");
var _BRA_FIX = require("./BRA_FIX");
var _BRA_RECOM = require("./BRA_RECOM");
var _BRA_REVIEW = require("./BRA_REVIEW");
var _BRA_STOCK = require("./BRA_STOCK");
var _BREAST_RESULT = require("./BREAST_RESULT");
var _BREAST_TEST = require("./BREAST_TEST");
var _BR_ALL = require("./BR_ALL");
var _BR_CH = require("./BR_CH");
var _BR_DETAIL = require("./BR_DETAIL");
var _BR_NUM = require("./BR_NUM");
var _DELETED_USER = require("./DELETED_USER");
var _HOME_FITTING = require("./HOME_FITTING");
var _KIT = require("./KIT");
var _RECOM_RESULT = require("./RECOM_RESULT");
var _USER = require("./USER");

function initModels(sequelize) {
  var AUTH_CODE = _AUTH_CODE(sequelize, DataTypes);
  var BRA_FIX = _BRA_FIX(sequelize, DataTypes);
  var BRA_RECOM = _BRA_RECOM(sequelize, DataTypes);
  var BRA_REVIEW = _BRA_REVIEW(sequelize, DataTypes);
  var BRA_STOCK = _BRA_STOCK(sequelize, DataTypes);
  var BREAST_RESULT = _BREAST_RESULT(sequelize, DataTypes);
  var BREAST_TEST = _BREAST_TEST(sequelize, DataTypes);
  var BR_ALL = _BR_ALL(sequelize, DataTypes);
  var BR_CH = _BR_CH(sequelize, DataTypes);
  var BR_DETAIL = _BR_DETAIL(sequelize, DataTypes);
  var BR_NUM = _BR_NUM(sequelize, DataTypes);
  var DELETED_USER = _DELETED_USER(sequelize, DataTypes);
  var HOME_FITTING = _HOME_FITTING(sequelize, DataTypes);
  var KIT = _KIT(sequelize, DataTypes);
  var RECOM_RESULT = _RECOM_RESULT(sequelize, DataTypes);
  var USER = _USER(sequelize, DataTypes);


  return {
    AUTH_CODE,
    BRA_FIX,
    BRA_RECOM,
    BRA_REVIEW,
    BRA_STOCK,
    BREAST_RESULT,
    BREAST_TEST,
    BR_ALL,
    BR_CH,
    BR_DETAIL,
    BR_NUM,
    DELETED_USER,
    HOME_FITTING,
    KIT,
    RECOM_RESULT,
    USER,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
