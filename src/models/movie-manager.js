const movies = require("../../movies");

class MovieManager {

    getAllMovies({ actor, genre, imdbSort }) {
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

    sortMoviesByRating(movieList) {
        const sortedMovies = movieList.sort((movie1, movie2) => movie1.imdbRating - movie2.imdbRating);
        const result = sortedMovies.map(movie => ({ Title: movie.Title, imdbRating: movie.imdbRating }))

        return result;

    }

    getSpecificMovieById(id) {
        return movies.find(movie => movie.imdbID == id)
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

    addNewMovie(newMovie) {
        const newMovie = {
            title: req.body.Title,
            genre: req.body.Genre
        }
        if (!newMovie.title || !newMovie.genre) {
            return ({ msg: 'Please include a title and genre' })
        }

        movies.push(newMovie)

    }

    editExistingMovie(movieToEdit) {
        const found = movies.some(movie => movie.Title === movieToEdit.title)

        if (found) {
            const updMovie = req.body;
            movies.forEach(movie => {
                if (movie.Title === movieToEdit.title) {
                    movie.Title = updMovie.Title ? updMovie.Title : movie.Title;
                    movie.Genre = updMovie.Genre ? updMovie.Genre : movie.Genre;

                    return ({ msg: 'Movie updated', movie })
                }
            })
        } else {
            return ({ msg: `No movie with the actor name of ${movieToEdit.title}` })
        }
    }

    deleteExistingMovie(movieToDelete) {
        const found = movies.some(movie => movie.Title === movieToDelete.title)

        if (found) {
            return ({
                msg: 'Movie deleted', movies: movies.filter(movie =>
                    movie.Title !== movieToDelete.title)
            })
        } else {
            return ({ msg: `No movie with the title name of ${movieToDelete.title}` })
        }
    }
}

module.exports = { MovieManager }