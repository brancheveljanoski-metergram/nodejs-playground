const express = require('express');
const movies = require('../models/movie-manager');
const validator = require('../validation-schemas');
const { wrap } = require('../lib/error-handler');
const CodeError = require('../lib/custom-error');

const router = express.Router();

router.use(express.json());

router.get('/', wrap((req, res) => {

    return movies.getAll(req.query);

}));



router.get('/:imdbID', wrap((req, res) => {

    const imdbID = req.params.imdbID;
    const movie = movies.getSingle(imdbID);
    if (!movie) {
        throw new CodeError(`Movie with imdbID of ${imdbID} not found!`, code = 404);
    }
    return movie;
}));


router.get('/data/:dataType', wrap((req, res) => {
    return movies.getData(req.params.dataType);
}));

router.post('/', wrap((req, res) => {

    const { error } = validator.validMovie.validate(req.body);

    if (error) {
        throw new CodeError(error.details, 400);
    }

    movies.addMovie(req.body)

    return `/movies/${req.body.imdbID}`;

}));

router.put('/', wrap((req, res) => {

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
            path: `/movies/${req.body.imdbID}`
        }

    } else {

        movies.addMovie(req.body)

        return {
            status: 'created',
            data: movies.getSingle(movieID),
            path: `/movies/${req.body.imdbID}`
        }
    }

}));

router.delete('/:imdbID', wrap((req, res) => {

    movies.deleteMovie(req.params.imdbID);

    return {};
}));

module.exports = router;