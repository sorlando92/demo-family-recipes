const express = require("express");
const router = express.Router({ mergeParams: true });

const ControlRecipe = require("../controllers/controllerRecipe");
const { isLoggedIn, validateRecipe, isAuthor } = require("../utilities/middleware");

router.route("/").get(ControlRecipe.index).post(isLoggedIn, validateRecipe, ControlRecipe.createNewRecipe);
router.get("/new", isLoggedIn, ControlRecipe.renderNewForm);

router.route("/:id").get(ControlRecipe.getRecipe).put(isLoggedIn, isAuthor, validateRecipe, ControlRecipe.updateRecipe).delete(isLoggedIn, ControlRecipe.deleteRecipe);
router.get("/:id/edit", isLoggedIn, isAuthor, ControlRecipe.editRecipe);

module.exports = router;
