const catchAsync = require("../utilities/catchAsync");

const Recipe = require("../models/recipe");
const Review = require("../models/review");

// Create a new review
module.exports.addReview = catchAsync(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  const review = new Review(req.body.review);

  review.author = req.user._id;
  recipe.reviews.push(review);

  await review.save();
  await recipe.save();

  req.flash("success", "Created new review!");
  res.redirect(`/recipe/${recipe._id}`);
});

// Delete Review
module.exports.deleteReview = catchAsync(async (req, res) => {
  const { id, reviewId } = req.params;

  await Recipe.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Successfully deleted review!");
  res.redirect(`/recipe/${id}`);
});
