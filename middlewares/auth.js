require('dotenv').config();
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  // const token = req.headers.authorization && req.headers.authorization.replace('Bearer ', '');
  // // const token = req.headers.authorization.replace('Bearer ', '');
  // console.log(token);
  // if (!token) {
  //   throw new UnauthorizedError('Вы не авторизованы!');
  // }

  // let payload;
  // try {
  //   payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-key');
  // } catch (err) {
  //   next(UnauthorizedError('Вы не авторизованы??'));
  // }

  // req.user = payload;

  // next();

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    // next(new UnauthorizedError('Вы не авторизованы!'));
    throw new UnauthorizedError('Вы не авторизованы!');
    // return; выходим из функции при неудачной авторизации
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-key');
  } catch (err) {
    next(UnauthorizedError('Вы не авторизованы??'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next();
};
