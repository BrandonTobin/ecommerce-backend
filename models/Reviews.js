const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  name: String,
  comment: String,
  review: {
    type: mongoose.Types.ObjectId,
    ref: "Reviews",
  },
});

const Reviews = mongoose.model("reviews", reviewsSchema);

module.exports = Reviews;