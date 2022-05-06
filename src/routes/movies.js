const express = require("express");
const { wrap } = require("../lib/error-handler");
const movies = require("../models/movie-manager");
const { validationSchema } = require('../validation/validation-schema')
const router = express.Router()

router.get('/', wrap((req, res) => {

    const movies = new MovieManager().getAllMovies(req.query);
    return { movies, total: movies.length };

}))

router.get('/:imbdID', wrap((req, res) => {

    if (movies.getSpecificMovieById(req.params.imdbID)) {
        return movieById;
    }

}))

router.get('/data', wrap((req, res) => {
    return movies.getMoviesData();
}))

router.post('/', wrap((req, res) => {

    const result = validationSchema.validate(req.body)

    if (!result) {
        movies.addNewMovie(req.body)
    }


}))

router.put('/', wrap((req, res) => {
    const movieTitle = req.body.Title;

    if (movies.editExistingMovie(movieTitle)) {
        movies.editExistingMovie(req.body)
    }

}))

router.delete('/:imbdID', wrap((req, res) => {
    movies.deleteExistingMovie(req.params.imbdID)

    return {}
}))

module.exports = router 
