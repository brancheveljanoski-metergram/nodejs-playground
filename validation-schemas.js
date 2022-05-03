const Joi = require('joi');


const validMovie= Joi.object({

    Title: Joi.string(),
    Year: Joi.number()
        .min(1700),
    Rated: Joi.string()
        .min(2)
        .max(20),
    Released: Joi.date(),
    Runtime: Joi.string()
        .pattern(new RegExp('^[0-9]{1,} min')),
    Genre: Joi.array()
        .items(Joi.string()),
    Director: Joi.string()
        .min(3)
        .max(30),
    Writer: Joi.string()
        .min(3)
        .max(500),
    Actors: Joi.string(),
    Plot: Joi.string()
        .min(3)
        .max(2000),
    Language: Joi.string(),
    Country: Joi.string(),
    Awards: Joi.string()
        .min(3),
    Poster: Joi.string()
        .min(3)
        .max(1000)
        .pattern(new RegExp('[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)')),
    Metascore: [
        Joi.string().min(1).max(3),
        Joi.number().min(1).max(100)
    ],
    imdbRating: Joi.number()
        .precision(1)
        .min(0)
        .max(10),
    imdbVotes: Joi.string()
        .min(1)
        .max(15),
    imdbID: Joi.string()
    .pattern(new RegExp('(tt|nm|co|ev|ch|ni)\\w{5,10}')),
    Type: Joi.string()
        .max(20),
    totalSeasons: Joi.number()
        .min(1)
        .max(50),
    Response: Joi.boolean(),
    Images: Joi.array()
        .items(
            Joi.string()
            .pattern(new RegExp('[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}([-a-zA-Z0-9()@:%_\+.~#?&//=]*)'))
        )  
    
});

module.exports = {validMovie};