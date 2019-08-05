const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  overview: { type: String, required: true },
  genres: [{ type: String, required: true }],
  release_date: { type: Date, required: true },
  poster_path: { type: String, required: true },
  movie_db_id: { type: Number, required: true }
}, {
  timestamps: true,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;