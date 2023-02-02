const mongoose = require("mongoose")
const GameReview = require("./GameReviews")

const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title required"]
  },
  agerating: {
    type: String,
    required: [true, "age rating required"]
  },
  image: {
    type: String,
    required: [true, "Image required"]
  },
  desc: {
    type: String,
    required: [true, "Title required"]
  },
  year: {
    type: String,
    required: [true, "date required"]
  },
}, { timestamps: true });

const Game = mongoose.model("Game", GameSchema);
module.exports = Game;