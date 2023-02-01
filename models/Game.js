const mongoose = require("mongoose");

const gamesSchema = new mongoose.Schema({
  title: String,
  photo: String,
  body: String,
  //   users: {
  //     type: mongoose.Types.ObjectId,
  //     ref: "User",
  //   },
});

const Game = mongoose.model("Game", gamesSchema);

module.exports = Game;