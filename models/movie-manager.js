const { json } = require('express/lib/response');
const fs = require('fs');
const CodeError = require('../lib/custom-error');

let path = './movies.json';
const rawData = fs.readFileSync(path);
let movies = JSON.parse(rawData);


//---------------------JSON Reading-----------------------

function getAll({ genre, actor, imdbSort }) {

    let movieList = movies;

    if (actor) {
        movieList = filterBy('Actors', actor)
    }

    if (genre) {
        movieList = filterBy('Genre', genre)
    }

    if (imdbSort) {
        console.log(imdbSort);
        if (imdbSort.toUpperCase() === 'ASC') {
            movieList = sortByRating(true, movieList)
        }
        else if (imdbSort.toUpperCase() === 'DESC') {
            movieList = sortByRating(false, movieList)
        }
    }
    return movieList;
}

function getSingle(ID) {
    return movies.find(movie => movie.imdbID == ID);

}

function filterBy(filter, value) {
    return movies.filter(m => m[filter].includes(value));
}

function sortByRating(isASC, movieList) {
    let sortedMovies;

    if (isASC) {
        sortedMovies = movieList
            .sort((movieA, movieB) => movieA.imdbRating - movieB.imdbRating)
    } else {
        sortedMovies = movieList
            .sort((movieA, movieB) => movieB.imdbRating - movieA.imdbRating)
    }

    const movieTitleAndRating = sortedMovies
        .map(m => ({ Title: m.Title, imdbRating: m.imdbRating }))

    return movieTitleAndRating;
}

function getData(type) {

    switch (type) {
        case 'length':
            {
                const len = movies.reduce((total, movie) => {
                    const movieLen = parseInt(movie.Runtime);
                    return !isNaN(movieLen) ? movieLen + total : total;
                }, 0)

                return `${len} min`
            }
        case 'urls':

            return movies.map(movie => {
                return `https://www.imdb.com/title/${movie.imdbID}/`;
            });

        case 'votes':

            return movies.reduce((total, movie) => {
                const movieVotes = parseInt(movie.imdbVotes.replace(/,/g, ''));
                return !isNaN(movieVotes) ? movieVotes + total : total;
            }, 0);

        case 'languages':
            {

                const allLanguages = movies.reduce((languages, movie) => (
                    languages.concat(movie.Language.split(", "))
                ), [])

                return [...new Set(allLanguages)];
            }

        default:
            throw new CodeError('Data Type Not Supported', 400)
    }
}

//----------------------JSON Writing----------------

function writeToJSON(data) {

    try {
        fs.writeFileSync(path, JSON.stringify(data, null, "\t"));
    } catch (error) {
        return false;
    }
    return true;
}

function addMovie(newMovie) {

    if (getSingle(newMovie.imdbID) != undefined) {
        throw new CodeError('Movie Already Exists', 400);
    }
    movies.push(newMovie);

    if (writeToJSON(movies)) {
        return true
    };

    throw new Error('Could Not Create Movie', 500);
}


function editMovie(editedMovie) {

    const movieIndex = movies.findIndex(movie => movie.imdbID == editedMovie.imdbID);
    movies[movieIndex] = editedMovie;

    if (writeToJSON(movies)) {
        return true
    };

    throw new CodeError('Could Not Edit Movie', 500);
}

function deleteMovie(movieID) {
    const movieIndex = movies.findIndex(movie => movie.imdbID == movieID);
    if (movieIndex != -1) {
        movies.splice(movieIndex, 1);
        if (writeToJSON(movies)) {
            return true
        };

        return false;
    }

    throw new CodeError('Movie Does Not Exist', 400);
}


module.exports = { getAll, getSingle, filterBy, sortByRating, addMovie, editMovie, deleteMovie, getData };