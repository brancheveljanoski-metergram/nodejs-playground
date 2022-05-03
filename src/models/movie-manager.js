const movies = require("../../movies");
const { sortItems } = require("../lib/helpers");

class MovieManager {

    getMovies({ actor, genre, imdbSort }) {
        let moviesFiltered = movies;
        if (genre) {
            moviesFiltered = movies.filter(m => m.Genre.includes(genre));
        }
        if (actor) {
            moviesFiltered = movies.filter(m => m.Actors.toLowerCase().includes(actor.toLowerCase()));
        }
        if (imdbSort) {
            moviesFiltered = sortItems(moviesFiltered, "imdbRating", imdbSort.toLowerCase() === 'desc')
        }
        return moviesFiltered;
    }

    getMoviesData() {
        return {
            totalLengthOfAllMovies: movies.reduce(
                (totalLength, movie) => movie.Runtime !== 'N/A'
                    ? totalLength + parseInt(movie.Runtime)
                    : totalLength,
                0
            ),
            imdbUrls: movies.map(movie => `https://www.imdb.com/title/${movie.imdbID}`),
            totalImdbVotes: movies.reduce(
                (totalVotes, movie) =>
                    movie.imdbVotes !== 'N/A'
                        ? totalVotes + parseInt(movie.imdbVotes.replace(/[^0-9]/g, ''))
                        : totalVotes,
                0
            ),
            allLanguagues: [...new Set(
                movies.reduce((languages, movie) => languages.concat(movie.Language.split(', ')), [])
            )]
        };
    }
    
    // Add other Movie related logic below
    // ...
}

module.exports = { MovieManager };
