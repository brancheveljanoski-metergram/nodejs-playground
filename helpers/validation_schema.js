const Joi = require("joi");

const authSchema = Joi.object({
  Title: Joi.string(),

  Year: Joi.number().min(1900).max(2022),
  Released: Joi.date(),

  imdbID: Joi.string().pattern(
    new RegExp("/evd{7}/d{4}(-d)?|(ch|co|ev|nm|tt)d{7}/")
  ),
});

module.exports = {
  authSchema,
};
