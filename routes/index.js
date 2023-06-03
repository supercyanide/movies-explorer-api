const router = require('express').Router();

const userRouter = require('./users');
const moviesRouter = require('./movies');
const signInRouter = require('./signin');
const signUpRouter = require('./signup');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use(signInRouter);
router.use(signUpRouter);
router.use(auth);
router.use(userRouter);
router.use(moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('URL не найден'));
});

module.exports = router;
