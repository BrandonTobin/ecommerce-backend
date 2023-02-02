const express = require('express')
const router = express.Router()

const { Game } = require('../models')

router.use(express.json())
console.log(Game)

router.get('/', async (req, res) => {
  try {
    const allGame = await Game.find({})
    res.status(200).json(allGame)
  } catch (err) {
    res.status(400).json({ error: err })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const foundGame = await Game.findById(req.params.id)
    res.status(200).json(foundGame)
  } catch (err) {
    res.status(400).json({ error: err })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const createdGame = await Game.create(req.body)
    console.log(createdGame)
    res.status(201).json(createdGame)
  } catch (error) {
    console.error(error)
    return next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true })
    console.log(updatedGame)
    return res.status(200).json(updatedGame)
  } catch (error) {
    console.error(error)
    return next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id)
    console.log(deletedGame)
    res.redirect('/game')
  } catch (error) {
    console.error(error)
    return next(error)
  }
})

module.exports = router