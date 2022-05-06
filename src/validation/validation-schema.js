const Join = require('@hapi/joi')

const validationSchema = Joi.object({
    Title: Joi.string(),
    Actors: Joi.string(),
    Year: Joi.number(),
    Rated: Joi.string(),
    Released: Joi.date(),
    Runtime: Joi.string()
        .pattern(new RegExp('^[0-9]{1,} min')),
    Genre: Joi.array()
        .items(Joi.string()),
    Actors: Joi.string(),
    Language: Joi.string(),
    Country: Joi.string(),
    imdbRating: Joi.number()
        .precision(1)
        .min(0)
        .max(10),
    imdbVotes: Joi.string()
        .min(1)
        .max(15),
    imdbID: Joi.string()
        .pattern(new RegExp('(tt|nm|co|ev|ch|ni)\\w{5,10}')),
})

module.exports = {
    validationSchema
}
