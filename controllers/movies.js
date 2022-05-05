let movies = require("../movie-manipulation");
const { authSchema } = require("../helpers/validation_schema");

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

const newMovie = async (req, res) => {
  try {
    const result = await authSchema.validateAsync(req.body);

    const doesExist = await movies.findOne({ imdbID: result.imdbID });

    if (doesExist)
      throw createError.Conflict(
        `A movie with id: ${result.imdbID} has already been registered`
      );

    const movie = new movies(result);
    const savedMovie = await movie.save();
    res.send(`/movies/${req.body.imdbID}`);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
  }
};

const updateMovie = async (req,res)=>{

  const result = await authSchema.validateAsync(req.body);
  const doesExist = await movies.findOne({ imdbID: result.imdbID })

  try{
    if(doesExist){
      const updated = req.body;
      movies.forEach(movie =>{
        if(movie.Title === req.params.title){
            movie.Title = updated.Title ? updated.Title : movie.Title;
            res.json(`Updated movie: ${movie}`)
        }
    })
    }
  }catch(error){
    if (error.isJoi === true) error.status = 422;
  }

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
  updateMovie,
  movieDel,
};
