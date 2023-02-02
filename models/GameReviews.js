const mongoose = require("mongoose")
const Game = require("./Game")

const GameReviewSchema = new mongoose.Schema({

  rating: {
    type: Number,
    required: false,
    minlegnth: 1,
    maxlength: 10
  },
  comment: {
    type: String,
    required: false,
    max: 250
  },
  title: {
    type: mongoose.Types.ObjectId,
    ref: "Game",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

}, { timestamps: true })

const GameReview = mongoose.model("Review", GameReviewSchema)
module.exports = GameReview