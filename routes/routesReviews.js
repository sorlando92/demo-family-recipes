const express = require("express");
const router = express.Router({ mergeParams: true });

const ControlReview = require("../controllers/controllerReview");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../utilities/middleware");

router.post("/", isLoggedIn, validateReview, ControlReview.addReview);
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, ControlReview.deleteReview);

module.exports = router;
