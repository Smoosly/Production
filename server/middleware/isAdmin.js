const winston = require('../winston');

const isAdmin = async (req, res, next) => {
  winston.debug('in isAdmin');
  try {
    if (req.user.role !== 'ADMIN') {
      winston.info({ success: false, message: '권한 없음', isAdmin: false });
      return res.json({ success: false, message: '권한 없음', isAdmin: false });
    } else {
      return next();
    }
  } catch (err) {
    winston.error(err);
  }
};

module.exports = { isAdmin };
