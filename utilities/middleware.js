const { recipeSchema, reviewSchema } = require("../schemas");
const Recipe = require("../models/recipe");
const Review = require("../models/review");
const ExpressError = require("./ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be logged in first!");
    return res.redirect("/login");
  }
  next();
};

module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
    console.log(res.locals.returnTo);
  }

  next();
};

module.exports.validateRecipe = (req, res, next) => {
  const { error } = recipeSchema.validate(req.body);
  console.log(error);

  if (error) {
    const msg = error.details.map((err) => err.message).join(", ");
    throw new ExpressError(result.error.details, 400);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id);

  if (!recipe.author.equals(req.user._id)) {
    req.flash("error", "You do not have permissions to do that!");
    return res.redirect(`/recipe/${id}`);
  }

  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permissions to do that!");
    return res.redirect(`/recipe/${id}`);
  }

  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(result.error.details, 400);
  } else {
    next();
  }
};
