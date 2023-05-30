require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const crashTestRouter = require('./routes/crash');
const userRouter = require('./routes/users');
const signInRouter = require('./routes/signin');
const signUpRouter = require('./routes/signup');
const moviesRouter = require('./routes/movies');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/error-handler');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
const app = express();
app.use(cors);
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(requestLogger);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});
app.use(limiter);
app.use(crashTestRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(auth);
app.use(userRouter);
app.use(moviesRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('URL не найден'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => console.log(`🚀 Listening on ${PORT} port`));