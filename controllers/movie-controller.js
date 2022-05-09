const movies = require('../services/movie-service');
const { wrap } = require('../lib/error-handler');

const getAll = wrap((req, res) => {
    return movies.getAll(req.query);
})

const getSingle = wrap((req, res) => {

    const imdbID = req.params.imdbID;
    const movie = movies.getSingle(imdbID);
    if (!movie) {
        throw new CodeError(`Movie with imdbID of ${imdbID} not found!`, code = 404);
    }
    return movie;
})

const getData = wrap((req, res) => {
    return movies.getData(req.params.dataType);
})

const addMovie = wrap((req, res) => {

    const { error } = validator.validMovie.validate(req.body);

    if (error) {
        throw new CodeError(error.details, 400);
    }

    movies.addMovie(req.body)

    return { path: `${req.baseUrl}/${req.body.imdbID}` };
})

const updateOrAdd = wrap((req, res) => {

    const { error } = validator.validMovie.validate(req.body);

    if (error) {
        throw new CodeError(error.details, 400);
    }

    const movieID = req.body.imdbID;

    if (movies.getSingle(movieID)) {

        movies.editMovie(req.body)

        return {
            status: 'edited',
            data: movies.getSingle(movieID),
            path: `${req.baseUrl}/${req.body.imdbID}`
        }

    } else {

        movies.addMovie(req.body)

        return {
            status: 'created',
            data: movies.getSingle(movieID),
            path: `${req.baseUrl}/${req.body.imdbID}`
        }
    }

})

const remove = wrap((req, res) => {

    movies.deleteMovie(req.params.imdbID);

    return {};
});



module.exports = { getAll, getSingle, getData, addMovie, updateOrAdd, remove }