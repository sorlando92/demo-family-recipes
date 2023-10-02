//#region Express, General, and Engines
/* 
General express parameters, session, and overrides
Additionally, we set overrides and specific engines to utilize EJS properly
*/
const express = require("express");
const app = express();
const path = require("path");

const session = require("express-session");
const sessionConfig = {
  secret: "abc123",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));

const flash = require("connect-flash");
app.use(flash());

const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

const ExpressError = require("./utilities/ExpressError");
//#endregion

//#region Mongoose Parameters and Connection
/* 
Requiring Mongoose and requiring our models for recipes and reviews.
Additionally, utilizing JOI for Mongo verification before inserting  
*/
const mongoose = require("mongoose");

const Recipe = require("./models/recipe");
const Review = require("./models/review");
const { recipeSchema } = require("./schemas");

mongoose.connect("mongodb://localhost:27017/dbFamilyRecipes");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => {
  console.log("Database connected");
});
//#endregion

//#region User Authentication
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/modelUser");

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
//#endregion

//#region Routes
/*
Utilize Express Router and routes files to break-up app.js to more readable format. 
*/
const routeRecipe = require("./routes/routesRecipes");
app.use("/recipe", routeRecipe);

const routeReviews = require("./routes/routesReviews");
app.use("/recipe/:id/reviews", routeReviews);

const routeUsers = require("./routes/routesUser");
app.use("/", routeUsers);

app.get("/", (req, res) => {
  res.redirect("/recipe");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) {
    err.message = "Oh no, something went wrong!";
  }
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
//#endregion
