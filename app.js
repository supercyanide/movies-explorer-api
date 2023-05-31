require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimiter');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/error-handler');
const cors = require('./middlewares/cors');

const { PORT = 3000, MONGODB_URI = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

mongoose.connect(MONGODB_URI, {
  autoIndex: true,
});

const app = express();
app.use(cors);
app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(router);

app.use('*', (req, res, next) => {
  next(new NotFoundError('URL не найден'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 Listening on ${PORT} port`));
