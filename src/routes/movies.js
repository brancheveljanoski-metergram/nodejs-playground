const express = require("express");
const { wrap } = require("../lib/error-handler");
const { MovieManager } = require("../models/movie-manager");

const router = express.Router();

/**
 * Get all movies
 * Supports filtering by genre, actor and rating
 */
router.get(
    "/",
    wrap((req, _res) => {
        const movies = new MovieManager().getMovies(req.query);

        return { movies, total: movies.length };
    })
);

/**
 * Get all movies
 * Supports filtering by genre, actor and rating
 */
router.get(
    "/statistics",
    wrap(() => {
        return new MovieManager().getMoviesData();
    })
);

module.exports = router;
