const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Games = require("../models/Games");

//index
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
//show
router.get("/:id", async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.id);
    const userGames = await Games.find({ user: req.params.id });

    res.status(200).json({ user: foundUser, games: userGames });
  } catch (err) {
    res.status(400).json({ error: err });
    next(err);
  }
});
//create
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

module.exports = router;