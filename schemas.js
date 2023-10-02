/* 
Utilzling node package JOI to perform verification on recipes and reviews before inserting
into our mongo database.

This file outlines the validation schemas for both recipes and reviews.
*/

const Joi = require("joi");
const JOI = require("joi");

module.exports.recipeSchema = JOI.object({
  recipe: JOI.object({
    title: JOI.string().required(),
    image: JOI.string().required(),
    description: JOI.string().required(),
    ingredients: JOI.array().items(JOI.string()).required(),
    steps: JOI.array().items(JOI.string()).required(),
  }).required(),
});

module.exports.reviewSchema = JOI.object({
  review: JOI.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required(),
  }).required(),
});
