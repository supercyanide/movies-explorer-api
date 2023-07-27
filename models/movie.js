const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(avatar) {
        return validator.isURL(avatar, {
          protocols: ['http', 'https'],
          require_protocol: true,
        });
      },
      message: 'Некорректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
