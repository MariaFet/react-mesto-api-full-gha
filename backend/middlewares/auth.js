require('dotenv').config();
const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/NotAuthorizedError');

const { JWT_SECRET, NODE_ENV } = process.env;
// const JWT_SECRET = 'df740be8e1dd975abfe3aee5fecab33b700a4c3da01e44ba135240a0cccb1ac5';
// const NODE_ENV = 'production';

const handleAuthError = (res, next) => {
  next(new NotAuthorizedError('Необходима авторизация.'));
};

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    return handleAuthError(res, next);
  }
  req.user = payload;
  return next();
};
