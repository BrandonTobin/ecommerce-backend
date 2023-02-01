const mongoose = require("mongoose");

const gamesSchema = new mongoose.Schema({
  title: String,
  photo: String,
  body: String,
  users: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
});

const Games = mongoose.model("games", gamesSchema);

module.exports = Games;