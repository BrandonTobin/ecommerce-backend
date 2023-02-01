const express = require("express");
const router = express.Router();
const Games = require("../models/Game");
const Reviews = require("../models/Review");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//index
router.get("/", async (req, res, next) => {
  try {
    const allGames = await Games.find({}).populate("User");
    res.status(200).json(allGames);
  } catch (err) {
    res.status(400).json({ error: err });
    next(err);
  }
});
//show
router.get("/:id", async (req, res, next) => {
  try {
    const foundGame = await Games.findById(req.params.id);
    const gameReviews = await Reviews.find({ game: req.params.id });
    res.status(200).json({ game: foundGame, reviews: gameReviews });
  } catch (err) {
    res.status(400).json({ error: err });
    next(err);
  }
});
//create
router.post("/", async (req, res) => {
  try {
    const newGame = await Games.create(req.body);
    res.status(201).json(newGame);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});
//update
router.put("/:id", async (req, res) => {
  try {
    const updateGame = await Games.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(updateGame);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
//destroy
router.delete("/:id", async (req, res) => {
  try {
    const destroyGame = await Games.findByIdAndDelete(req.params.id);
    const destroyReviews = await Reviews.deleteMany({ game: req.params.id });
    res.status(200).json({ games: destroyGame, reviews: destroyReviews });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;