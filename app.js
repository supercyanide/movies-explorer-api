require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { limiter } = require('./middlewares/rateLimiter');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const errorHandler = require('./middlewares/error-handler');
const cors = require('./middlewares/cors');

const PORT = process.env.PORT || 3030;
const app = express();
app.use(cors);
app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://supercyanide:08246353Dd@movies-db.ip1yica.mongodb.net/?retryWrites=true&w=majority');
    // await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
    app.listen(PORT, () => {
      console.log(`🚀 Listening on ${PORT} port`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
