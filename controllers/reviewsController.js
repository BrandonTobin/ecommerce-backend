const express = require("express");
const router = express.Router();
const Reviews = require("../models/Review");
const Games = require("../models/Game");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//index
router.get("/", async (req, res, next) => {
  try {
    const allReviews = await Reviews.find({}).populate("post");
    res.status(200).json(allReviews);
  } catch (err) {
    res.status(400).json({ error: err });
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const foundGame = await Games.findById(req.params.id);
    const postReviews = await Reviews.find({ user: req.params.id });
    res.status(200).json({ post: foundGame, review: postReviews });
  } catch (err) {
    res.status(400).json({ error: err });
    next(err);
  }
});
//create
router.post("/", async (req, res) => {
  try {
    const newReview = await Reviews.create(req.body);
    res.status(201).json(newReview);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});
//update
router.put("/:id", async (req, res) => {
  try {
    const updateReviews = await Reviews.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(201).json(updateReviews);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
//destroy
router.delete("/:id", async (req, res) => {
  try {
    const destroyReviews = await Reviews.findByIdAndDelete(req.params.id);
    res.status(201).json(destroyReviews);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;