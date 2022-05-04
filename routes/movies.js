const express = require('express');
const movies = require('../models/movie-manager');
const validator = require('../validation-schemas');

const router = express.Router();

router.get('/', (req, res) => {

    console.log(`Router get with req body ${req.query}`);
    let movieList = movies.getAll(req.query)

    res.status(200).json(movieList);

});

router.get('/:imdbID', (req, res) => {

    const imdbID = req.params.imdbID;
    const movie = movies.getSingle(imdbID);
    if (!movie) {
        res.status(404).send(`Movie with imdbID of ${imdbID} not found!`);
    }
    res.status(200).json(movie);
});


router.get('/data/:dataType', (req, res) => {
    res.status(200).json(movies.getData(req.params.dataType));
});

router.post('/', (req, res) => {

    const { error } = validator.validMovie.validate(req.body);

    if (error) {
        res.status(400).json(error.details);
        return;
    }

    if (movies.addMovie(req.body)) {
        res.status(201).send(`/${req.body.imdbID}`);
    }

    res.status(400).end();
});

router.put('/', (req, res) => {

    const { error } = validator.validMovie.validate(req.body);

    if (error) {
        return res.status(400).json(error.details);
    }

    const movieID = req.body.imdbID;

    if (movies.getByID(movieID)) {
        if (movies.editMovie(req.body)) {
            res.status(200).json({
                status: 'ok',
                data: movies.getByID(movieID),
                path: `/${req.body.imdbID}`
            });
        }
        return;
    } else if (movies.addMovie(req.body)) {
        res.status(201).json({
            status: 'created',
            data: movies.getByID(movieID),
            path: `/${req.body.imdbID}`
        });
        return;
    }

    res.status(400).end();
});

router.delete('/:imdbID', (req, res) => {
    const movieID = req.params.imdbID;
    if (movies.deleteMovie(movieID)) {
        return res.status(200).end();
    }
    res.status(400).end();
});

module.exports = router;