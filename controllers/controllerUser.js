const modelUser = require("../models/modelUser");
const User = require("../models/modelUser");
const CatchAsync = require("../utilities/catchAsync");

// Render new user form
module.exports.renderNewUserForm = (req, res) => {
  res.locals.title = "Register";
  res.render("users/register");
};

// Render login form
module.exports.renderLoginForm = (req, res) => {
  res.locals.title = "Login";
  res.render("users/login");
};

// Add new user
module.exports.addNewUser = CatchAsync(async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Orlando Family Recipes!");
      res.redirect("/recipe");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
});

// Login User
module.exports.loginUser = (req, res) => {
  const redirectUrl = res.locals.returnTo || "/recipe";
  req.flash("success", "Welcome back!");
  res.redirect(redirectUrl);
};

// Logout User
module.exports.logoutUser = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    req.flash("success", "Successfully logged out!");
    res.redirect("/recipe");
  });
};

// Render About Page
module.exports.renderAboutPage = (req, res) => {
  res.locals.title = "About Sean";
  res.render("about");
};
