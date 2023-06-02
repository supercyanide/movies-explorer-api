const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, getMe, updateProfile } = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getMe);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(2).max(30),
    name: Joi.string().min(2).max(30),
  }),
}), updateProfile);

module.exports = router;
