const { isLoggedIn, validateRecipe, isAuthor } = require("../utilities/middleware");
const catchAsync = require("../utilities/catchAsync");

const Recipe = require("../models/recipe");

// Render index "All Recipes" page
module.exports.index = catchAsync(async (req, res) => {
  const recipes = await Recipe.find({});
  res.locals.title = "All Recipes";
  res.render("recipe/index", { recipes });
});

// Render new recipe form
module.exports.renderNewForm = (req, res) => {
  res.locals.title = "New Recipe";
  res.render("recipe/new");
};

// Create a new recipe
module.exports.createNewRecipe = catchAsync(async (req, res) => {
  const recipe = new Recipe(req.body.recipe);
  recipe.author = req.user._id;

  await recipe.save();

  req.flash("success", "Recipe successfully saved!");
  res.redirect(`/recipe/${recipe._id}`);
});

// Get individual recipe
module.exports.getRecipe = catchAsync(async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("author");

    res.locals.title = recipe.title;
    res.render("recipe/show", { recipe });
  } catch (error) {
    req.flash("error", "Could not find recipe!");
    res.redirect("/recipe");
  }
});

// Edit recipe
module.exports.editRecipe = catchAsync(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    req.flash("error", "Could not find that recipe!");
    res.redirect("/recipe");
  }

  res.render("recipe/edit", { recipe });
});

// Update recipe
module.exports.updateRecipe = catchAsync(async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipe.findByIdAndUpdate(id, { ...req.body.recipe });
  req.flash("success", "Successfully updated recipe!");
  res.redirect(`/recipe/${recipe._id}`);
});

// Delete recipe
module.exports.deleteRecipe = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Recipe.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted recipe!");
  res.redirect("/recipe");
});
