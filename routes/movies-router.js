const express = require('express');
const movies = require('../services/movie-service');
const validator = require('../lib/validation-schemas');
const { wrap } = require('../lib/error-handler');
const CodeError = require('../lib/custom-error');
const movieController = require('../controllers/movie-controller');

const router = express.Router();

router.use(express.json());


router.route('/')
    .get(movieController.getAll)
    .post(movieController.addMovie)
    .put(movieController.updateOrAdd);

router.route('/:imdbID')
    .get(movieController.getSingle)
    .delete(movieController.remove)


router.route('/data/:dataType')
    .get(movieController.getData);

module.exports = router;