const express = require('express');
const router = express.Router();

const { GameReview } = require('../models');
const { Game } = require('../models');
const { handleValidateOwnership, requireToken } = require("../middleware/auth");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get('/', async (req, res) => {
  try {
    const allReviews = await GameReview.find({}).populate('owner', 'username -_id').exec()
    res.status(200).json(allGames)
  } catch (err) {
    res.status(400).json({ error: err })
  }
});

router.get('/:id', async (req, res) => {
  try {
    const foundGame = await Game.findById(req.params.id)
    console.log(foundGame)
    const allReviews = await GameReview.find({ title: req.params.id });
    res.status(200).json({ title: foundGame, reviews: allReviews })
  } catch (err) {
    res.status(400).json({ error: err })
  }
})
router.get('/:id', async (req, res) => {
  try {
    const foundGame = await Game.findById(req.params.id).populate("owner").exec()
    const allReviews = await GameReview.find({ title: req.params.id });
    res.status(200).json(allReviews)
  } catch (err) {
    res.status(400).json({ error: err })
  }
})

router.get('/edit/:id', async (req, res) => {
  try {
    const oneReview = await GameReview.findById(req.params.id);
    const allReviews = await GameReview.find({ title: req.params.id });
    res.status(200).json(oneReview)
  } catch (err) {
    res.status(400).json({ error: err })
  }
})

router.post('/:id', requireToken, async (req, res) => {
  try {
    const owner = req.user._id
    console.log(req.user)
    req.body.owner = owner
    const newReview = await GameReview.create(req.body)
    res.status(200).json(newReview)
  } catch (err) {
    res.status(400).json({ error: err })
  }
})

router.put('/edit/:id', requireToken, async (req, res) => {
  try {
    handleValidateOwnership(req, await GameReview.findById(req.params.id))
    const gameReview = await GameReview.findByIdAndUpdate(req.params.id, req.body, { new: true })
    console.log(gameReview)
    res.status(200).json(gameReview)
  } catch (err) {
    res.status(400).json({ error: err })
  }
})

router.delete('/edit/:id', requireToken, async (req, res) => {
  try {
    handleValidateOwnership(req, await GameReview.findById(req.params.id))
    const deletedReview = await GameReview.findByIdAndDelete(req.params.id);
    const deletedReviews = await GameReview.deleteMany({ title: req.params.id });
    res.redirect(200, '/review')

  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deletedReview = await GameReview.findByIdAndDelete(req.params.id);
    const deletedReviews = await GameReview.deleteMany({ title: req.params.id });
    res.redirect(200, '/game')

  } catch (err) {
    res.status(400).json({ error: err })
  }
})
module.exports = router