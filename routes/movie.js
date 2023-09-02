const router = require('express').Router();
const validation = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');

router.get('/', getMovies);

router.post('/', validation.createMovieData, createMovie);

router.delete('/:movieId', deleteMovie);

module.exports = router;
