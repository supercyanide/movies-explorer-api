const router = require('express').Router();

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const signin = require('./signin');
const signup = require('./signup');
const auth = require('../middlewares/auth');

router.use('/signin', signin);
router.use('/signup', signup);
router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

module.exports = router;
