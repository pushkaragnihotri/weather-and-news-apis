const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env.config');

const checkAuthorization = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({
      status: 'Unauthorized',
      message: 'No Access token found',
    });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(403).json({
      status: 'Forbidden',
      message: 'Invalid or expired token',
    });
  }
  return false;
};

module.exports = checkAuthorization;
