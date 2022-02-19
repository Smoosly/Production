const SequelizeAuto = require("sequelize-auto");

const auto = new SequelizeAuto("Smoosly", "ihibisu", "ihibiscusyou8!", {
  host: "3.37.194.219",
  port: "3306",
  dialect: "mysql",
  output: "models/",
  tables: ["BRA_FIX", "BRA_STOCK", "BR_ALL", "BR_DETAIL", "BR_NUM", "BR_CH", "USER", "KIT", "BREAST_TEST", "BREAST_RESULT", "BRA_RECOM", "BRA_REVIEW", "RECOM_RESULT", "HOME_FITTING", "DELETED_USER", "AUTH_CODE"],
  // "COUPON", "NOTIFICATION"
});

auto.run((err) => {
  if (err) throw err;
});
