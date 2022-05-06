const EntitySchema = require('typeorm').EntitySchema;
const Movie = require('../models/movie').Movie;

module.exports = new EntitySchema({
    name: 'Movie',
    target: Movie,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        title: {
            type: 'varchar',
            require: true
        },
        year: {
            type: 'int',
            require: true
        },
        runtime: {
            type: 'int',
            require: true
        },
        imdbRating: {
            type: 'float',
            require: true
        },
        imdbVotes: {
            type: 'int',
            require: true
        }
    }
});