const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const validateLoginParams = (req, res, next) => {
  let error = null;
  if (!req.body.email || req.body.email.length === 0) {
    error = 'Email cannot be empty';
  } else if (!req.body.password || req.body.password.length === 0) {
    error = 'Passowrd cannot be empty';
  } else if (!req.body.email.match(emailFormat)) {
    error = 'Invalid email format';
  }
  if (error) {
    return res.status(400).json({
      status: 'Bad Request',
      message: error,
    });
  }
  next();
};

module.exports = validateLoginParams;
