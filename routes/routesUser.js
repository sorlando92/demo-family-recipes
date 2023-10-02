const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const { storeReturnTo } = require("../utilities/middleware");
const ControlUser = require("../controllers/controllerUser");

router.route("/register").get(ControlUser.renderNewUserForm).post(ControlUser.addNewUser);

router
  .route("/login")
  .get(ControlUser.renderLoginForm)
  .post(storeReturnTo, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), ControlUser.loginUser);

router.get("/logout", ControlUser.logoutUser);

router.get("/about", ControlUser.renderAboutPage);

module.exports = router;
