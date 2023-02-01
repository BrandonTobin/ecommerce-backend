const express = require("express");
const router = express.Router();
const Games = require("../models/Games");
const Reviews = require("../models/Reviews");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//index
router.get("/", async (req, res, next) => {
  try {
    const allGames = await Posts.find({}).populate("user");
    res.status(200).json(allPosts);
  } catch (err) {
    res.status(400).json({ error: err });
    next(err);
  }
});
//show
router.get("/:id", async (req, res, next) => {
  try {
    const foundGame = await Games.findById(req.params.id);
    const postReviews = await Reviews.find({ game: req.params.id });
    res.status(200).json({ post: foundGame, reviews: postReviews });
  } catch (err) {
    res.status(400).json({ error: err });
    next(err);
  }
});
//create
router.post("/", async (req, res) => {
  try {
    const newGame = await Games.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});
//update
router.put("/:id", async (req, res) => {
  try {
    const updateGame = await Posts.findByIdAndUpdate(req.params.id, req.body, {
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
    const destroyGame = await Posts.findByIdAndDelete(req.params.id);
    const destroyReviews = await Comments.deleteMany({ post: req.params.id });
    res.status(200).json({ post: destroyPost, comment: destroyComments });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;