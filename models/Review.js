const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  name: String,
  comment: String,
  game: {
    type: mongoose.Types.ObjectId,
    ref: "Game",
  },
});

const Review = mongoose.model("Reviews", reviewsSchema);

module.exports = Review;