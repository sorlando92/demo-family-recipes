const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const RecipeSchema = new Schema({
  title: String,
  image: String,
  description: String,
  ingredients: [String],
  steps: [String],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

RecipeSchema.post("findOneAndDelete", async function (doc) {
  console.log(doc);
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Recipe", RecipeSchema);
