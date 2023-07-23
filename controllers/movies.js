const { ObjectId } = require('mongodb');
const Movie = require('../models/movie');
const {
  CREATED,
} = require('../utils/statusConstants');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

function getMovies(req, res, next) {
  const userId = new ObjectId(req.user._id);
  Movie.find({ owner: userId })
    .populate(['owner'])
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
}

// POST /movies — создаёт фильм с переданными в теле данными
const createMovie = (req, res, next) => {
  const {
    country,
    duration,
    year,
    rating,
    genre,
    description,
    image,
    trailerLink,
    movieId,
    name,
  } = req.body;
  Movie.create({
    country,
    duration,
    year,
    rating,
    genre,
    description,
    image,
    trailerLink,
    movieId,
    name,
    owner: req.user._id,
  })
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findByIdAndRemove(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      if (req.user._id === movie.owner.toString()) {
        res.send({ message: 'Фильм успешно удален' });
      } else {
        next(new ForbiddenError('Вы можете удалять только свои фильмы'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Фильм с данным ID не найдена'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
