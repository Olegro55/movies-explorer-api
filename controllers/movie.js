const Movie = require('../models/movies');
const { statusCodes } = require('../utils/constants');
const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require('../errors');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const data = req.body;
  data.owner = req.user._id;

  Movie.create(data)
    .then((movie) => res.status(statusCodes.CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).orFail()
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Forbidden.'));
      }

      return movie.deleteOne()
        .then((deletedMovie) => res.send(deletedMovie));
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточка с указанным _id не найдена.'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
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
