let movies = require("../movie-manipulation");

const getMovies = (req, res) => {
  res.json(movies.getAllMovies());
};

const filterMovies = (req, res) => {
  const { genre, actor, imdbSort } = req.query;
  let allMovies = movies.getAllMovies();

  if (genre) allMovies = movies.filterByGenre(`${genre}`);
  else if (actor) allMovies = movies.filterByActor(`${actor}`);
  else if (imdbSort) {
    if (imdbSort === "DESC" || "desc")
      allMovies = movies.sortByRating(true, allMovies);
    if (imdbSort === "ASC" || "asc")
      allMovies = movies.sortByRating(false, allMovies);
  } else res.send("Invalid filter!");

  res.json(allMovies);
};

const getMovie = (req, res) => {
  const id = req.params.imdbID;
  const movie = movies.getSpecificMovie(id);
  res.json(movie);
};

const totalLength = (req, res) => {
  res.json(`${movies.totalLengthOfAllMovies()}`);
};

const movieLanguages = (req, res) => {
  res.json(movies.allLanguagues());
};

const movieUrls = (req, res) => {
  res.json(movies.imdbUrls());
};

const movieVotes = (req, res) => {
  res.json(movies.totalImdbVotes());
};

const newMovie = (req, res) => {
  if (err) return;
  if (movies.addNewMovie(req.body)) {
    res.send(`/movies/${req.body.imdbID}`);
  }
  res.end();
};

const movieDel = (req, res) => {
  const id = req.params.imdbID;
  if (movies.deleteExistingMovie(id)) {
    res.end();
  }
  res.end();
};

module.exports = {
  getMovies,
  filterMovies,
  getMovie,
  totalLength,
  movieLanguages,
  movieUrls,
  movieVotes,
  newMovie,
  movieDel,
};
