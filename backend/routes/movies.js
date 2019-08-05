const router = require('express').Router();
let Movie = require('../models/movie.model');

router.route('/').get((req, res) => {
  Movie.find()
    .then(movies => res.json(movies))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const title = req.body.title;
  const overview = req.body.overview;
  const genres = req.body.genres;
  const release_date = Date.parse(req.body.release_date);
  const poster_path = req.body.poster_path;
  const movie_db_id = req.body.id;

  const newMovie = new Movie({
    username,
    title,
    overview,
    genres,
    release_date, 
    poster_path, 
    movie_db_id
  });

  newMovie.save()
  .then(() => res.json('Movie added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;