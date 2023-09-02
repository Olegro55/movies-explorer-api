const mongoose = require('mongoose');
const { linkRegex } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      match: linkRegex,
    },
    trailerLink: {
      type: String,
      required: true,
      match: linkRegex,
    },
    thumbnail: {
      type: String,
      required: true,
      match: linkRegex,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
);

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;
