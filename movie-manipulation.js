const fs = require("fs");
let file = "./movies.json";
const moviefile = fs.readFileSync(file);
let movies = JSON.parse(moviefile);

function getAllMovies() {
  return movies;
}

function filterByGenre(genre) {
  return (genreMovies = movies.filter((movie) => movie.Genre.includes(genre)));
}

function filterByActor(actor) {
  return (actorMovies = movies.filter((movie) => movie.Actors.includes(actor)));
}

function sortByRating(isDESC, allMovies) {
  let result;
  if (isDESC) {
    result = allMovies.sort((x, y) => y.imdbRating - x.imdbRating);
  } else {
    result = allMovies.sort((x, y) => x.imdbRating - y.imdbRating);
  }
  return (resultFinal = result.map((m) => ({
    Title: m.Title,
    imdbRating: m.imdbRating,
  })));
}

function getSpecificMovie(id) {
  return (movie = movies.find((movie) => movie.imdbID == id));
}

function totalLengthOfAllMovies() {
  const result = movies.reduce((sum, movie) => {
    const length = parseInt(movie.Runtime);
    return length ? length + sum : sum;
  }, 0);
  let num = result;
  let hours = num / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  return `${rhours} hours and ${rminutes} minutes.`;
}

function imdbUrls() {
  const imdburls = movies.map((movie) => {
    return `https://www.imdb.com/title/${movie.imdbID}/`;
  });
  return imdburls;
}

function totalImdbVotes() {
  const result = movies.reduce((sum, movie) => {
    const votes = parseInt(movie.imdbVotes.replace(/,/g, ""));
    return votes ? votes + sum : sum;
  }, 0);

  return result;
}

function onlyUnique(allLanguages, index, self) {
  return self.indexOf(allLanguages) === index;
}

function allLanguagues() {
  const allLanguages = movies.reduce((languages, movie) => {
    return languages.concat(movie.Language.split(", "));
  }, (languages = []));
  return (unique = allLanguages.filter(onlyUnique));
}

function writeJSON(data) {
  // fs.writeFile(file, JSON.stringify(data, null, "\t"), (err)=>{
  //     if(err)
  //         return false;
  // });

  // return true;
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, "\t"));
  } catch (err) {
    return false;
  }
  return true;
}

function addNewMovie(movie) {
  if (getSpecificMovie(movie.imdbID) == undefined) {
    movies.push(movie);
    if (writeJSON(movies)) {
      return true;
    }
  }
  return false;
}

function deleteExistingMovie(id) {
  const index = movies.findIndex((m) => m.imdbID == id);
  if (index != -1) {
    movies.splice(index, 1);
    if (writeJSON(movies)) {
      return true;
    }
    return false;
  }
  return false;
}

module.exports = {
  getAllMovies,
  filterByActor,
  filterByGenre,
  imdbUrls,
  sortByRating,
  getSpecificMovie,
  totalImdbVotes,
  totalLengthOfAllMovies,
  allLanguagues,
  addNewMovie,
  deleteExistingMovie,
};
