const router = require('express').Router();
const rp = require("request-promise-native");

// discover endpoint: fetches new movies from the movie database
router.route('/').get( async (req, res) => {
    const discoverMovies = async () => {
        // define options objects for movie and genre GET requests:
        var nowPlayingOptions = { method: 'GET',
            uri: 'https://api.themoviedb.org/3/movie/now_playing',
            qs: { api_key: "80cf41f7feca9aa68ad793fa07babefe", language: 'en-US', page: 1 , region: 'US' }
          };
      
        var genreOptions = { method: 'GET',
          uri: 'https://api.themoviedb.org/3/genre/movie/list',
          qs: { api_key: "80cf41f7feca9aa68ad793fa07babefe" }
        };
      
        // define fetch functions for both movies and genres:
        const fetchMovies = async () => {
          const results = await rp(nowPlayingOptions);
          const movies = JSON.parse(results);
      
          return movies;
        };
      
        const fetchGenres = async () => {
          const results = await rp(genreOptions);
          const genres = JSON.parse(results);
      
          return genres;
        }
      
        // define function to map genre ids to names (used in movie object destructuring):
        const genreMap = function (genreIds) {
          const mappedGenres = genreIds.map(x => { return genres.genres.find(a => { return Number(a.id) === Number(x)})});
      
          const mappedGenreNames = [];
          mappedGenres.forEach(a => { mappedGenreNames.push(a.name) });
      
          return mappedGenreNames;
        }
      
        // fetch genres (response is fine as is):
        const genres = await fetchGenres();
      
        // fetch movies, strip metadata + superfluous data, map genre ids to names:
        const moviesResponse = await fetchMovies();
      
        const moviesArr = [];
      
        for (var { id: i, title: t, overview: o, release_date: r, genre_ids: g, poster_path: p} of moviesResponse.results) {
          moviesArr.push({ movie_db_id: i, title: t, overview: o, genres: genreMap(g), release_date: r, poster_path: p });
        }
        
        return { movies: moviesArr };
        }

    res.send(await discoverMovies());
});

module.exports = router;